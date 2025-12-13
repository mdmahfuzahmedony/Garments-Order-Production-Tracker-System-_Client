import React from "react";
import { useParams, useNavigate } from "react-router"; // react-router-dom ব্যবহার করুন
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { 
    FaBoxOpen, 
    FaShippingFast, 
    FaMapMarkerAlt, 
    FaArrowLeft, 
    FaClipboardCheck,
    FaClock
} from "react-icons/fa";

const TrackOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    // 1. Fetch Order Details
    const { data: order, isLoading } = useQuery({
        queryKey: ["track-order", orderId],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:2001/bookings/${orderId}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // 2. Prepare Timeline Data
    // রিকোয়ারমেন্ট অনুযায়ী ক্রোনোলজিক্যাল অর্ডারে সাজানো (Start to End)
    // ডিফল্ট হিসেবে "Order Placed" সবার আগে থাকবে
    const baseStep = {
        status: "Order Placed",
        date: order.orderDate,
        note: "Your order has been received successfully.",
        location: "System"
    };

    // যদি ট্র্যাকিং হিস্ট্রি থাকে তবে সেটা নিবে, নাহলে বেস স্টেপ দেখাবে
    const timeline = order.trackingHistory && order.trackingHistory.length > 0 
        ? [baseStep, ...order.trackingHistory] 
        : [baseStep, { 
            status: order.status, 
            date: order.updatedAt || order.orderDate, 
            note: "Current Status", 
            location: "Warehouse" 
          }];

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-10">
            <div className="max-w-6xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn btn-circle btn-ghost hover:bg-base-300"
                    >
                        <FaArrowLeft className="text-xl text-base-content" />
                    </button>
                    <div>
                        <h2 className="text-3xl font-bold text-base-content">Track Order</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-base-content/70">Order ID:</span>
                            <span className="badge badge-primary font-mono p-3">#{order._id.slice(-6).toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- Left Side: Timeline View --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-base-100 p-6 md:p-8 rounded-2xl shadow-xl border border-base-300">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-base-content border-b border-base-200 pb-4">
                                <FaShippingFast className="text-primary" /> Production & Shipment Timeline
                            </h3>
                            
                            <ul className="steps steps-vertical w-full">
                                {timeline.map((step, index) => {
                                    // লেটেস্ট স্টেপ কিনা চেক করা (হাইলাইটের জন্য)
                                    const isLatest = index === timeline.length - 1;

                                    return (
                                        <li 
                                            key={index} 
                                            className={`step ${isLatest ? 'step-primary' : 'step-neutral'} w-full`}
                                            data-content={isLatest ? "●" : "✓"}
                                        >
                                            <div className={`flex flex-col items-start text-left ml-4 mb-8 w-full p-4 rounded-xl border ${
                                                isLatest 
                                                ? 'bg-primary/10 border-primary shadow-md' 
                                                : 'bg-base-200/50 border-base-200'
                                            }`}>
                                                {/* Header: Status & Time */}
                                                <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-2">
                                                    <h4 className={`font-bold text-lg ${isLatest ? 'text-primary' : 'text-base-content'}`}>
                                                        {step.status}
                                                        {isLatest && <span className="ml-2 badge badge-xs badge-error animate-pulse">Live</span>}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-xs font-mono text-base-content/60 mt-1 md:mt-0">
                                                        <FaClock /> {new Date(step.date).toLocaleString()}
                                                    </div>
                                                </div>

                                                {/* Note / Description */}
                                                <p className="text-sm text-base-content/80 bg-base-100 p-3 rounded-lg w-full border border-base-200">
                                                    {step.note || "Processing..."}
                                                </p>

                                                {/* Location */}
                                                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-secondary">
                                                    <FaMapMarkerAlt /> 
                                                    <span>{step.location || "Production Unit"}</span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* --- Right Side: Order Summary & Map --- */}
                    <div className="space-y-8">
                        
                        {/* 1. Order Summary Card */}
                        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-300">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
                                <FaBoxOpen className="text-secondary" /> Order Summary
                            </h3>
                            
                            <div className="flex gap-4 mb-4 bg-base-200 p-3 rounded-xl">
                                <img 
                                    src={order.productImage || "https://via.placeholder.com/80"} 
                                    alt="Product" 
                                    className="w-20 h-20 rounded-lg object-cover border border-base-300" 
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-base-content line-clamp-1" title={order.productName}>
                                        {order.productName}
                                    </h4>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-base-content/60">Qty: {order.quantity}</span>
                                        <span className="text-primary font-bold">${order.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="divider my-2"></div>
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-base-content/70">Payment:</span>
                                    <span className="badge badge-ghost font-bold">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-base-content/70">Current Status:</span>
                                    <span className={`badge font-bold text-white ${
                                        order.status === 'Delivered' ? 'badge-success' : 'badge-info'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Interactive Map (Visual Representation) */}
                        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-300">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
                                <FaMapMarkerAlt className="text-red-500" /> Live Location
                            </h3>
                            
                            <div className="relative w-full h-56 rounded-xl overflow-hidden group border border-base-300">
                                {/* Map Image (Placeholder with Dark Mode Support logic needed visually) */}
                                <img 
                                    src="https://i.imgur.com/8Qj8XlU.png" 
                                    alt="Map" 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                
                                {/* Overlay Marker */}
                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                                        <div className="bg-base-100 text-base-content px-4 py-2 rounded-full font-bold shadow-lg text-xs flex items-center gap-2 z-10 relative">
                                            <FaMapMarkerAlt className="text-red-500" />
                                            {timeline[timeline.length - 1]?.location || "Processing Center"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 flex gap-3">
                                <FaClipboardCheck className="text-success text-xl" />
                                <p className="text-xs text-base-content/60">
                                    Map updates automatically when the product reaches a new checkpoint (Cutting, Sewing, QC, etc.).
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;