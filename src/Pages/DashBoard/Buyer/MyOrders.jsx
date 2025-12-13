import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router"; // Link fixed
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaEye, FaTrashAlt, FaBoxOpen } from "react-icons/fa";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  // Fetch Orders
  const { data: orders = [], refetch, isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:2001/bookings?email=${user?.email}`);
      return res.data;
    },
  });

  // Payment Handler
  const handlePayment = async (order) => {
    try {
      const res = await axios.post('http://localhost:2001/create-checkout-session', {
        productName: order.productName,
        price: order.totalPrice,
        orderId: order._id,
        image: order.productImage
      });

      if (res.data.url) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire("Error", "Could not initiate payment.", "error");
    }
  };

  // Cancel Handler
  const handleCancelOrder = (id) => {
    Swal.fire({
        title: "Cancel Order?",
        text: "Are you sure you want to cancel this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:2001/bookings/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
                        refetch();
                    }
                })
                .catch(err => Swal.fire("Error", "Failed to cancel order", "error"));
        }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-base-100">
            <FaBoxOpen className="text-6xl text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-base-content">No Orders Yet</h3>
            <p className="text-base-content/60">You haven't placed any orders yet.</p>
            <Link to="/garments-products" className="btn btn-primary mt-4">Browse Products</Link>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-10 min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-primary">My Orders</h2>
            <div className="badge badge-outline font-bold">{orders.length} Orders</div>
        </div>
      
        <div className="overflow-x-auto shadow-xl rounded-xl border border-base-200 bg-base-100">
            <table className="table bg-base-100 align-middle w-full">
            
            {/* --- REQUIREMENT अनुযায়ী কলাম নাম --- */}
            <thead className="bg-primary text-white text-sm uppercase font-bold">
                <tr>
                    <th className="py-4 pl-4">Order ID</th>
                    <th>Product</th>
                    <th className="text-center">Quantity</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th className="text-center pr-4">Actions</th>
                </tr>
            </thead>
            
            <tbody className="divide-y divide-base-200">
                {orders.map((order) => (
                <tr key={order._id} className="hover:bg-base-200/50 transition duration-200">
                    
                    {/* 1. Order ID */}
                    <td className="pl-4 font-mono text-xs text-base-content/70">
                        #{order._id.slice(-6).toUpperCase()}
                    </td>

                    {/* 2. Product */}
                    <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12 bg-base-300">
                                    <img src={order.productImage || "https://via.placeholder.com/50"} alt="Product" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-sm text-base-content">{order.productName}</div>
                                <div className="text-xs text-primary font-semibold">
                                    Total: ${order.totalPrice}
                                </div>
                            </div>
                        </div>
                    </td>

                    {/* 3. Quantity (আলাদা কলাম) */}
                    <td className="text-center font-bold text-base-content">
                        {order.quantity}
                    </td>

                    {/* 4. Status */}
                    <td>
                        <span className={`badge border-0 font-bold text-xs p-2 ${
                            order.status === 'Pending' ? 'bg-warning/20 text-warning' : 
                            order.status === 'Approved' ? 'bg-info/20 text-info' :
                            order.status === 'Shipped' ? 'bg-primary/20 text-primary' :
                            order.status === 'Delivered' ? 'bg-success/20 text-success' : 
                            'badge-ghost'
                        }`}>
                            {order.status}
                        </span>
                    </td>

                    {/* 5. Payment */}
                    <td>
                        {order.paymentStatus === "Paid" ? (
                            <span className="badge badge-success text-white font-bold text-xs">PAID</span>
                        ) : (
                            <>
                                {order.paymentMethod === "Cash on Delivery" ? (
                                    <span className="badge badge-outline badge-info font-bold text-xs">
                                        COD
                                    </span>
                                ) : (
                                    <button 
                                        onClick={() => handlePayment(order)}
                                        className="btn btn-xs btn-primary text-white"
                                    >
                                        Pay Now
                                    </button>
                                )}
                            </>
                        )}
                    </td>

                    {/* 6. Actions (View & Cancel) */}
                    <td className="pr-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                            {/* View Button (Track Order) */}
                            <Link to={`/dashboard/track-order/${order._id}`}>
                                <button className="btn btn-sm btn-square btn-ghost text-info tooltip" data-tip="View / Track">
                                    <FaEye className="text-lg" />
                                </button>
                            </Link>

                            {/* Cancel Button (Only if Pending) */}
                            {order.status === 'Pending' ? (
                                <button 
                                    onClick={() => handleCancelOrder(order._id)}
                                    className="btn btn-sm btn-square btn-ghost text-error tooltip"
                                    data-tip="Cancel Order"
                                >
                                    <FaTrashAlt className="text-lg" />
                                </button>
                            ) : (
                                // স্পেস বজায় রাখার জন্য একটি ডিজেবলড বাটন বা খালি ডিভ
                                <div className="w-8"></div>
                            )}
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;