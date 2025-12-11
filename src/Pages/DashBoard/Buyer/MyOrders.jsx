import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaHistory, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [selectedOrder, setSelectedOrder] = useState(null); // মোডাল দেখার জন্য

  // ১. নিজের অর্ডারগুলো লোড করা
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:2001/bookings?email=${user.email}`
      );
      return res.data;
    },
  });

  // ২. অর্ডার ক্যান্সেল করার ফাংশন
  const handleCancelOrder = (id) => {
    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:2001/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire(
              "Cancelled!",
              "Your order has been cancelled.",
              "success"
            );
          }
        });
      }
    });
  };

  // ডেট ফরম্যাট ফাংশন
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading)
    return (
      <div className="text-center mt-20 text-primary">
        Loading your orders...
      </div>
    );

  return (
    <div className="w-full p-6 min-h-screen bg-base-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        My Orders History
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-gray-700 text-white">
            <tr>
              <th>Order ID</th>
              <th>Product Info</th>
              <th>Qty & Price</th>
              <th>Status</th>
              <th>Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover">
                <td className="text-xs font-mono font-bold opacity-70">
                  {order._id.slice(-6)}...
                </td>

                {/* Product Info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={order.productImage || order.image}
                          alt="Product"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{order.productName}</div>
                      <div className="text-xs opacity-50">
                        {formatDate(order.date)}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Qty & Price */}
                <td>
                  <div className="font-bold text-sm">Qty: {order.quantity}</div>
                  <div className="text-sm text-success font-bold">
                    ${order.price * order.quantity}
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge badge-sm text-white font-bold
                                        ${
                                          order.status === "Shipped"
                                            ? "badge-success"
                                            : order.status === "Approved"
                                            ? "badge-info"
                                            : order.status === "Rejected"
                                            ? "badge-error"
                                            : "badge-warning"
                                        }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>

                {/* Payment Mode */}
                <td>
                  <div className="badge badge-ghost badge-sm">
                    {order.paymentMethod || "Cash on Delivery"}
                  </div>
                </td>

                {/* Actions */}
                <td className="flex justify-center gap-2">
                  {/* View / Track Button */}
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      document.getElementById("details_modal").showModal();
                    }}
                    className="btn btn-xs btn-info text-white tooltip"
                    data-tip="View Details & Track"
                  >
                    <FaEye /> View
                  </button>

                  {/* Cancel Button (Only if Pending) */}
                  {(!order.status || order.status === "Pending") && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="btn btn-xs btn-error text-white tooltip"
                      data-tip="Cancel Order"
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500 font-semibold text-lg">
            You have not placed any orders yet.
          </div>
        )}
      </div>

      {/* Order Details & Tracking Timeline Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl bg-white text-gray-800">
          <h3 className="font-bold text-2xl text-center mb-6 text-primary">
            Order Details & Timeline
          </h3>

          {selectedOrder && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side: Order Info */}
              <div className="bg-gray-100 p-5 rounded-xl shadow-inner">
                <h4 className="font-bold text-lg mb-3 border-b pb-2">
                  Order Information
                </h4>
                <img
                  src={selectedOrder.productImage || selectedOrder.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <p>
                  <strong>Product:</strong> {selectedOrder.productName}
                </p>
                <p>
                  <strong>Order ID:</strong>{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    {selectedOrder._id}
                  </span>
                </p>
                <p>
                  <strong>Amount:</strong> $
                  {selectedOrder.price * selectedOrder.quantity}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {selectedOrder.paymentMethod || "Cash on Delivery"}
                </p>
                <p>
                  <strong>Placed On:</strong> {formatDate(selectedOrder.date)}
                </p>
              </div>

              {/* Right Side: Tracking Timeline */}
              <div>
                <h4 className="font-bold text-lg mb-3 border-b pb-2 flex items-center gap-2">
                  <FaHistory /> Tracking History
                </h4>

                <ul className="steps steps-vertical w-full">
                  {/* Initial Step */}
                  <li
                    className={`step ${
                      selectedOrder.status ? "step-primary" : "step-neutral"
                    }`}
                    data-content="●"
                  >
                    <div className="text-left ml-2">
                      <div className="font-bold">Order Placed</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(selectedOrder.date)}
                      </div>
                    </div>
                  </li>

                  {/* Approval Step */}
                  {selectedOrder.approvedAt && (
                    <li className="step step-primary" data-content="✓">
                      <div className="text-left ml-2">
                        <div className="font-bold">Order Approved</div>
                        <div className="text-xs text-gray-500">
                          {formatDate(selectedOrder.approvedAt)}
                        </div>
                      </div>
                    </li>
                  )}

                  {/* Dynamic Tracking History */}
                  {selectedOrder.trackingHistory &&
                    selectedOrder.trackingHistory.map((track, idx) => (
                      <li
                        key={idx}
                        className="step step-primary"
                        data-content="✈"
                      >
                        <div className="text-left ml-2 bg-blue-50 p-2 rounded-lg w-full mb-2">
                          <div className="font-bold text-blue-700">
                            {track.status}
                          </div>
                          <div className="text-xs flex items-center gap-1">
                            <FaMapMarkerAlt /> {track.location}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formatDate(track.date)}
                          </div>
                        </div>
                      </li>
                    ))}

                  {/* Current Status if no history yet */}
                  {(!selectedOrder.trackingHistory ||
                    selectedOrder.trackingHistory.length === 0) &&
                    selectedOrder.status &&
                    selectedOrder.status !== "Pending" &&
                    selectedOrder.status !== "Approved" && (
                      <li className="step step-primary" data-content="★">
                        <div className="text-left ml-2">
                          <div className="font-bold text-primary">
                            {selectedOrder.status}
                          </div>
                        </div>
                      </li>
                    )}
                </ul>
              </div>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyOrders;
