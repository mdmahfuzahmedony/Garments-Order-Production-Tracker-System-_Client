import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTruck, FaHistory, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth/useAuth';

const Approve_Orders = () => {
    const { user } = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null); // ট্র্যাকিং আপডেটের জন্য
    const [timelineOrder, setTimelineOrder] = useState(null); // টাইমলাইন দেখার জন্য

    // ১. ম্যানেজারের অ্যাপ্রুভ করা অর্ডার লোড করা
    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['approved-orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:2001/bookings/manager/approved/${user.email}`);
            return res.data;
        }
    });

    // ২. ট্র্যাকিং আপডেট সাবমিট ফাংশন
    const handleAddTracking = async (event) => {
        event.preventDefault();
        const form = event.target;
        const status = form.status.value;
        const location = form.location.value;
        const note = form.note.value;

        const trackingData = { status, location, note };

        try {
            const res = await axios.put(`http://localhost:2001/bookings/tracking/${selectedOrder._id}`, trackingData);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Tracking Updated',
                    text: `Status changed to ${status}`,
                    background: '#1f2937', color: '#fff'
                });
                document.getElementById('tracking_modal').close();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ডেট ফরম্যাট
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    if (isLoading) return <div className="text-center mt-20 text-white">Loading...</div>;

    return (
        <div className="w-full p-6 min-h-screen bg-gray-900 text-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Approved Orders & Tracking</h2>
            
            <div className="overflow-x-auto bg-gray-800 shadow-xl rounded-xl border border-gray-700">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th>Order ID</th>
                            <th>User Info</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Approved Date</th>
                            <th className="text-center">Current Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 font-bold text-gray-500">
                                    No Approved orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-700 border-b border-gray-600">
                                    <td className="text-xs font-mono opacity-70">{order._id.slice(-6)}...</td>
                                    <td>
                                        <div className="font-bold text-white text-xs">{order.userEmail}</div>
                                        <div className="text-xs opacity-70">{order.userName}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-8 h-8">
                                                    <img src={order.productImage} alt="Product" />
                                                </div>
                                            </div>
                                            <span className="font-bold text-xs">{order.productName?.slice(0, 15)}...</span>
                                        </div>
                                    </td>
                                    <td className="font-bold text-center">{order.quantity}</td>
                                    <td className="text-xs text-yellow-300">{formatDate(order.approvedAt)}</td>
                                    
                                    <td className="text-center">
                                        <span className={`badge ${order.status === 'Shipped' ? 'badge-primary' : 'badge-success'} badge-sm text-white`}>
                                            {order.status || 'Approved'}
                                        </span>
                                    </td>
                                    
                                    <td className="flex justify-center gap-2">
                                        {/* Add Tracking Button */}
                                        <button 
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                document.getElementById('tracking_modal').showModal();
                                            }} 
                                            className="btn btn-xs btn-warning text-black"
                                            title="Add Tracking Info"
                                        >
                                            <FaTruck /> Add Status
                                        </button>

                                        {/* View Timeline Button */}
                                        <button 
                                            onClick={() => {
                                                setTimelineOrder(order);
                                                document.getElementById('timeline_modal').showModal();
                                            }} 
                                            className="btn btn-xs btn-info text-white"
                                            title="View Timeline"
                                        >
                                            <FaHistory /> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 1. Modal: Add Tracking Info */}
            <dialog id="tracking_modal" className="modal">
                <div className="modal-box bg-gray-800 text-white border border-gray-600">
                    <h3 className="font-bold text-lg text-yellow-400 mb-4">Update Tracking Status</h3>
                    {selectedOrder && (
                        <form onSubmit={handleAddTracking}>
                            {/* Status Select */}
                            <div className="form-control mb-3">
                                <label className="label"><span className="label-text text-gray-300">New Status</span></label>
                                <select name="status" className="select select-bordered w-full bg-gray-700" required defaultValue={selectedOrder.status}>
                                    <option value="Cutting Completed">Cutting Completed</option>
                                    <option value="Sewing Started">Sewing Started</option>
                                    <option value="Finishing">Finishing</option>
                                    <option value="QC Checked">QC Checked</option>
                                    <option value="Packed">Packed</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                </select>
                            </div>

                            {/* Location Input */}
                            <div className="form-control mb-3">
                                <label className="label"><span className="label-text text-gray-300">Location (Factory/Hub)</span></label>
                                <div className="join w-full">
                                    <div className="join-item btn btn-square bg-gray-600 border-none"><FaMapMarkerAlt /></div>
                                    <input type="text" name="location" placeholder="e.g. Dhaka Hub" className="input input-bordered join-item w-full bg-gray-700" required />
                                </div>
                            </div>

                            {/* Note Input */}
                            <div className="form-control mb-4">
                                <label className="label"><span className="label-text text-gray-300">Note (Optional)</span></label>
                                <textarea name="note" className="textarea textarea-bordered bg-gray-700" placeholder="Any special note..."></textarea>
                            </div>

                            <button className="btn btn-warning w-full">Update Status</button>
                        </form>
                    )}
                    <div className="modal-action">
                        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
                    </div>
                </div>
            </dialog>

            {/* 2. Modal: View Timeline */}
            <dialog id="timeline_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl bg-gray-800 text-white border border-gray-600">
                    <h3 className="font-bold text-2xl text-center mb-6 text-blue-400">Order Tracking History</h3>
                    
                    {timelineOrder && (!timelineOrder.trackingHistory || timelineOrder.trackingHistory.length === 0) ? (
                        <div className="text-center py-10 text-gray-400">No tracking history available yet.</div>
                    ) : (
                        <ul className="steps steps-vertical w-full">
                            {/* Initial Approved Step */}
                            <li className="step step-primary" data-content="✓">
                                <div className="text-left ml-4 mb-4">
                                    <div className="font-bold text-green-400">Order Approved</div>
                                    <div className="text-xs text-gray-400">{formatDate(timelineOrder?.approvedAt)}</div>
                                </div>
                            </li>

                            {/* Dynamic Steps from History */}
                            {timelineOrder?.trackingHistory?.map((track, index) => (
                                <li key={index} className="step step-primary" data-content="●">
                                    <div className="text-left ml-4 mb-4 p-3 bg-gray-700 rounded-lg w-full">
                                        <div className="font-bold text-yellow-400 text-lg">{track.status}</div>
                                        <div className="text-sm flex items-center gap-2"><FaMapMarkerAlt className="text-red-400"/> {track.location}</div>
                                        {track.note && <div className="text-xs italic text-gray-300 mt-1">Note: "{track.note}"</div>}
                                        <div className="text-xs text-right mt-2 text-blue-300">{formatDate(track.date)}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="modal-action">
                        <form method="dialog"><button className="btn btn-neutral">Close</button></form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Approve_Orders;