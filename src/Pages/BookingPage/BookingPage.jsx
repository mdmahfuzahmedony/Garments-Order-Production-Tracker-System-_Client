import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // react-router-dom ব্যবহার করুন
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 1. Fetch Product Data (GET রিকোয়েস্টেও ক্রেডেনশিয়াল দেওয়া ভালো, যদি ব্যাকএন্ডে verifyToken থাকে)
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking-product", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://garments-order-production-tracker-s-nu.vercel.app/garments-products/${id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  // State
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Safe Data Variables
  const safeName = product?.productName || product?.name || "Unnamed Product";
  const safePrice = product?.price || 0;
  const safeStock = product?.availableQuantity ?? product?.quantity ?? 0;
  const safeMinOrder = product?.minOrderQuantity || product?.moq || 1;

  // 2. Initialize Default Values
  useEffect(() => {
    if (product) {
      setQuantity(safeMinOrder);
      setTotalPrice(safeMinOrder * safePrice);
    }
  }, [product, safeMinOrder, safePrice]);

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-error">Product not found!</div>
    );

  // 3. Handle Quantity Change
  const handleQuantityChange = (e) => {
    const inputQty = parseInt(e.target.value);
    if (isNaN(inputQty)) {
      setQuantity("");
      setTotalPrice(0);
      return;
    }
    setQuantity(inputQty);
    setTotalPrice(inputQty * safePrice);
  };

  // 4. Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 5. Handle Submit (Save Order)
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (quantity > safeStock) {
      Swal.fire("Error", `Sorry! Only ${safeStock} items in stock.`, "error");
      return;
    }
    if (quantity < safeMinOrder) {
      Swal.fire("Error", `Minimum order is ${safeMinOrder}.`, "warning");
      return;
    }

    // Prepare Data
    const orderData = {
      productId: product._id,
      productName: safeName,
      productImage:
        product.image || (product.images && product.images[0]) || "",
      userEmail: user?.email, // ইউজার লগইন থাকা বাধ্যতামূলক
      userName: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: formData.address,
      notes: formData.notes,
      quantity: parseInt(quantity),
      totalPrice: parseFloat(totalPrice),
      orderDate: new Date(),
      status: "Pending",
      paymentMethod:
        product.paymentMethod || product.paymentOption || "Cash on Delivery",
      paymentStatus: "Unpaid",
    };

    try {
      // 🔥 FIX: { withCredentials: true } যোগ করা হয়েছে 🔥
      const res = await axios.post(
        "https://garments-order-production-tracker-s-nu.vercel.app/bookings",
        orderData,
        {
          withCredentials: true,
        }
      );

      if (res.data.insertedId) {
        Swal.fire({
          title: "Order Placed!",
          text: "Your order has been placed successfully. Please check My Orders page.",
          icon: "success",
        });
        navigate("/dashboard/my-orders");
      }
    } catch (err) {
      console.error("Order Error:", err);
      // এরর মেসেজ চেক করা
      if (err.response && err.response.status === 401) {
        Swal.fire(
          "Unauthorized",
          "Please login again to place an order.",
          "error"
        );
      } else {
        Swal.fire("Error", "Could not place order. Please try again.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Confirm Your Order
        </h2>

        <form
          onSubmit={handleBookingSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Read Only Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">Product Info</h3>
            <div className="form-control">
              <label className="label font-semibold">Product Name</label>
              <input
                value={safeName}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">Total Price</label>
              <input
                value={`$${totalPrice} (for ${quantity} items)`}
                readOnly
                className="input input-bordered bg-gray-100 font-bold text-green-600"
              />
            </div>

            {/* Quantity Input */}
            <div className="form-control">
              <label className="label font-bold text-primary">
                Quantity (Stock: {safeStock})
              </label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={safeMinOrder}
                max={safeStock}
                className="input input-bordered input-primary"
                required
              />
            </div>
          </div>

          {/* User Info Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">
              Shipping Details
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                name="firstName"
                onChange={handleInputChange}
                placeholder="First Name"
                className="input input-bordered"
                required
              />
              <input
                name="lastName"
                onChange={handleInputChange}
                placeholder="Last Name"
                className="input input-bordered"
                required
              />
            </div>
            <input
              name="phone"
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="input input-bordered"
              required
            />
            <textarea
              name="address"
              onChange={handleInputChange}
              placeholder="Shipping Address"
              className="textarea textarea-bordered h-24"
              required
            ></textarea>
            <input
              name="notes"
              onChange={handleInputChange}
              placeholder="Additional Notes (Optional)"
              className="input input-bordered"
            />

            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-white font-bold text-lg hover:scale-105 transition-transform"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
