import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // react-router-dom হবে
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2"; // সুন্দর অ্যালার্টের জন্য (অপশনাল)
import { AuthContext } from "../../Provider/Authprovider";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 1. Fetch Product Data again (to ensure fresh price/stock info)
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking-product", id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:2001/garments-products/${id}`
      );
      return res.data;
    },
  });

  // State for Form
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    notes: "",
  });

  // 2. Initialize Default Values when product loads
  useEffect(() => {
    if (product) {
      setQuantity(product.minOrderQuantity || 1);
      setTotalPrice((product.minOrderQuantity || 1) * product.price);
    }
  }, [product]);

  // Loading State
  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-error">Something went wrong!</div>
    );

  // 3. Handle Quantity Change & Auto Calculate Price
  const handleQuantityChange = (e) => {
    const inputQty = parseInt(e.target.value);

    // UI তে টাইপ করার সময় ফাঁকা স্ট্রিং আসলে এরর যেন না দেয়
    if (isNaN(inputQty)) {
      setQuantity("");
      setTotalPrice(0);
      return;
    }

    setQuantity(inputQty);
    setTotalPrice(inputQty * product.price);
  };

  // 4. Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 5. Handle Submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validation: Stock & Min Order
    if (quantity > product.availableQuantity) {
      Swal.fire(
        "Error",
        `Sorry! We only have ${product.availableQuantity} items in stock.`,
        "error"
      );
      return;
    }
    if (quantity < product.minOrderQuantity) {
      Swal.fire(
        "Error",
        `Minimum order quantity is ${product.minOrderQuantity}.`,
        "warning"
      );
      return;
    }

    // Prepare Data to Save
    const orderData = {
      productId: product._id,
      productName: product.productName,
      userEmail: user?.email,
      userName: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: formData.address,
      notes: formData.notes,
      quantity: parseInt(quantity),
      totalPrice: parseFloat(totalPrice),
      orderDate: new Date(),
      status: "Pending", // Initial status
      paymentStatus: "Unpaid",
    };

    // --- Backend Logic Simulation ---
    try {
      // A. Save Order to Database
      const res = await axios.post("http://localhost:2001/bookings", orderData);

      if (res.data.insertedId) {
        // B. Check Payment Method Requirement
        // যদি পেমেন্ট দরকার হয় (Stripe/PayFast)
        if (product.paymentMethod === "Online Payment") {
          // Redirect to Payment Page (সাথে অর্ডার আইডি নিয়ে যাবে)
          navigate(`/payment/${res.data.insertedId}`);
        }
        // যদি Cash On Delivery হয়
        else {
          Swal.fire({
            title: "Success!",
            text: "Order Placed Successfully via Cash on Delivery!",
            icon: "success",
          });
          // Redirect to Dashboard My Orders
          navigate("/dashboard/my-orders");
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not place order. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Confirm Your Order
          </h2>

          <form
            onSubmit={handleBookingSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* --- Left Side: Product & User Info (Read Only) --- */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">
                Order Summary
              </h3>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  value={product.productName}
                  readOnly
                  className="input input-bordered bg-gray-100 text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Unit Price</span>
                  </label>
                  <input
                    type="text"
                    value={`$${product.price}`}
                    readOnly
                    className="input input-bordered bg-gray-100 text-gray-600"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Stock Available
                    </span>
                  </label>
                  <input
                    type="text"
                    value={product.availableQuantity}
                    readOnly
                    className="input input-bordered bg-gray-100 text-gray-600"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Your Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered bg-gray-100 text-gray-600"
                />
              </div>

              {/* --- Dynamic Calculation Section --- */}
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-4">
                <div className="form-control mb-2">
                  <label className="label">
                    <span className="label-text font-bold text-primary">
                      Quantity
                    </span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={product.minOrderQuantity}
                    max={product.availableQuantity}
                    className="input input-bordered input-primary w-full font-bold"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-error">
                      Min: {product.minOrderQuantity}
                    </span>
                    <span className="label-text-alt text-success">
                      Max: {product.availableQuantity}
                    </span>
                  </label>
                </div>

                <div className="flex justify-between items-center mt-2 text-lg">
                  <span className="font-bold text-gray-700">
                    Total Payable:
                  </span>
                  <span className="font-extrabold text-2xl text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* --- Right Side: Shipping Details --- */}
            <div className="space-y-5">
              <h3 className="text-xl font-semibold border-b pb-2">
                Shipping Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name *</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name *</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Number *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleInputChange}
                  placeholder="+880..."
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Delivery Address *</span>
                </label>
                <textarea
                  name="address"
                  onChange={handleInputChange}
                  className="textarea textarea-bordered h-24"
                  placeholder="Full address..."
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Additional Notes</span>
                </label>
                <textarea
                  name="notes"
                  onChange={handleInputChange}
                  className="textarea textarea-bordered"
                  placeholder="Any special instructions..."
                ></textarea>
              </div>

              <div className="form-control mt-6">
                {/* ভুল: <link> ব্যবহার করা যাবে না */}
                {/* সঠিক: <button> ব্যবহার করতে হবে যাতে form submit হয় */}

                <button
                  type="submit"
                  className="btn btn-primary w-full text-white text-lg"
                >
                  {product.paymentMethod === "Online Payment"
                    ? "Proceed to Payment"
                    : "Place Order (COD)"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
