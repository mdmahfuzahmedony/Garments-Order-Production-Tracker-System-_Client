import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2"; 
import { AuthContext } from "../../Provider/AuthProvider";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 1. Fetch Product Data
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["booking-product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:2001/garments-products/${id}`);
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

  // Safe Data Variables (যাতে এরর না হয়)
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

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="text-center mt-20 text-error">Something went wrong!</div>;

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

  // 5. Handle Submit (Save Order as Unpaid)
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

    // --- Prepare Data (FIXED HERE) ---
    const orderData = {
      productId: product._id,
      productName: safeName,
      productImage: product.image || (product.images && product.images[0]) || "",
      userEmail: user?.email,
      userName: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: formData.address,
      notes: formData.notes,
      quantity: parseInt(quantity),
      totalPrice: parseFloat(totalPrice),
      orderDate: new Date(),
      status: "Pending", // অর্ডার স্ট্যাটাস
      
      // Payment Info (অবজেক্টের ভেতরে ঢোকানো হয়েছে)
      paymentMethod: product.paymentMethod || product.paymentOption || "Cash on Delivery", 
      paymentStatus: "Unpaid" 
    };

    try {
      // Save to Database
      const res = await axios.post("http://localhost:2001/bookings", orderData);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Order Placed!",
          text: "Your order has been placed successfully. Please check My Orders page.",
          icon: "success",
        });
        // সরাসরি My Orders পেজে পাঠিয়ে দেওয়া হবে
        navigate("/dashboard/my-orders");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not place order. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Confirm Your Order</h2>
        
        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Read Only Info */}
          <div className="space-y-4">
             <h3 className="text-xl font-bold">Product Info</h3>
             <div className="form-control">
                <label className="label">Product Name</label>
                <input value={safeName} readOnly className="input input-bordered bg-gray-100" />
             </div>
             <div className="form-control">
                <label className="label">Price (Total: ${totalPrice})</label>
                <input value={`$${safePrice} x ${quantity}`} readOnly className="input input-bordered bg-gray-100" />
             </div>

             {/* Quantity Input */}
             <div className="form-control">
                <label className="label font-bold text-primary">Quantity</label>
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
            <h3 className="text-xl font-bold">Shipping Info</h3>
            <div className="grid grid-cols-2 gap-2">
                <input name="firstName" onChange={handleInputChange} placeholder="First Name" className="input input-bordered" required />
                <input name="lastName" onChange={handleInputChange} placeholder="Last Name" className="input input-bordered" required />
            </div>
            <input name="phone" onChange={handleInputChange} placeholder="Phone Number" className="input input-bordered" required />
            <textarea name="address" onChange={handleInputChange} placeholder="Address" className="textarea textarea-bordered" required></textarea>
            
            <button type="submit" className="btn btn-primary w-full mt-4 text-white font-bold text-lg">
                Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;