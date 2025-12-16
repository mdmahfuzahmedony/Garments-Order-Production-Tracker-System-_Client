import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { 
    FaPlusCircle, 
    FaEye, 
    FaMapMarkerAlt, 
    FaClipboardList, 
    FaBoxOpen
} from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; 

const Approve_Orders = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); 
    
    // মডাল এবং সিলেকশন স্টেট
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalType, setModalType] = useState(null); // 'add' or 'view'
    
    // ট্র্যাকিং ফর্ম স্টেট
    const [trackingInput, setTrackingInput] = useState({
        status: "",
        location: "",
        note: ""
    });

    // ১. ডাটা লোড - লজিক অপরিবর্তিত
    const { data: approvedOrders = [], refetch, isLoading } = useQuery({
        queryKey: ['manager-approved', user?.email],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/manager/approved/${user?.email}`);
            return res.data;
        }
    });

    // নির্দিষ্ট স্ট্যাটাস অপশনগুলো
    const statusOptions = [
        "Cutting Completed",
        "Sewing Started",
        "Finishing",
        "QC Checked",
        "Packed",
        "Shipped / Out for Delivery",
        "Delivered"
    ];

    // ২. মডাল হ্যান্ডলার - লজিক অপরিবর্তিত
    const openModal = (order, type) => {
        setSelectedOrder(order);
        setModalType(type);
        if (type === 'add') {
            setTrackingInput({
                status: order.status || "",
                location: "",
                note: ""
            });
        }
        document.getElementById('tracking_modal').showModal();
    };

    // ৩. ট্র্যাকিং আপডেট হ্যান্ডলার - লজিক অপরিবর্তিত
    const handleAddTracking = async (e) => {
        e.preventDefault();
        
        const updateData = {
            status: trackingInput.status,
            note: trackingInput.note,
            location: trackingInput.location
        };

        try {
            const res = await axiosSecure.put(`/bookings/tracking/${selectedOrder._id}`, updateData);

            if (res.data.modifiedCount > 0) {
                document.getElementById('tracking_modal').close();
                Swal.fire({
                    icon: "success",
                    title: "Tracking Updated",
                    text: `Status changed to ${trackingInput.status}`,
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update tracking", "error");
        }
    };

    if (isLoading || loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
                <span className="loading loading-bars loading-lg text-teal-500"></span>
            </div>
        );
    }

    return (
        // 1. Background: Matched with other pages (Gradient & Texture)
        <div className="w-full min-h-screen p-6 font-sans transition-colors duration-300 relative
            bg-gradient-to-br from-gray-50 to-teal-50/30 
            dark:from-[#03131E] dark:to-[#0b1120]">
            
            {/* Background Texture (Dots) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">Production Manager</p>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Approved <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Orders</span>
                        </h2>
                    </div>
                    <div className="badge bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 p-4 font-bold rounded-lg shadow-sm">
                        {approvedOrders.length} Items
                    </div>
                </div>

                {/* --- TABLE VIEW --- */}
                <div className="overflow-x-auto">
                    {/* border-separate এবং border-spacing-y-4 ব্যবহার করে রো গুলোর মাঝে ফাঁকা রাখা হয়েছে */}
                    <table className="table w-full border-separate border-spacing-y-4">
                        <thead className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="bg-transparent border-0 pl-6">Order ID</th>
                                <th className="bg-transparent border-0">User Info</th>
                                <th className="bg-transparent border-0">Product</th>
                                <th className="bg-transparent border-0 text-center">Quantity</th>
                                <th className="bg-transparent border-0">Approved Date</th>
                                <th className="bg-transparent border-0 text-center pr-6">Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {approvedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-16">
                                        <div className="flex flex-col items-center opacity-50 text-gray-500 dark:text-gray-400">
                                            <FaBoxOpen className="text-6xl mb-4 text-teal-200 dark:text-teal-900" />
                                            <p className="text-lg">No approved orders yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                approvedOrders.map((order) => (
                                    <tr 
                                        key={order._id} 
                                        // Row Styling: Card look, hover shadow, transition
                                        className="group bg-white dark:bg-[#151f32] shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 rounded-xl"
                                    >
                                        {/* 1. Order ID */}
                                        <td className="pl-6 font-mono font-bold text-xs text-gray-400 rounded-l-xl border-y border-l border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </td>

                                        {/* 2. User */}
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 dark:text-white">{order.userName}</span>
                                                <span className="text-xs text-gray-400">{order.userEmail}</span>
                                                <span className="text-xs text-gray-400">{order.phone}</span>
                                            </div>
                                        </td>

                                        {/* 3. Product */}
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-10 h-10 ring-1 ring-gray-100 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800">
                                                        <img src={order.productImage || "https://via.placeholder.com/50"} alt="Prod" />
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-sm text-gray-700 dark:text-gray-300">{order.productName}</div>
                                            </div>
                                        </td>

                                        {/* 4. Quantity */}
                                        <td className="text-center font-bold text-gray-700 dark:text-gray-300 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <span className="badge border-0 bg-gray-100 dark:bg-gray-800 font-mono text-gray-600 dark:text-gray-400">{order.quantity}</span>
                                        </td>

                                        {/* 5. Approved Date */}
                                        <td className="text-sm text-gray-500 dark:text-gray-400 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            {order.approvedAt 
                                                ? new Date(order.approvedAt).toLocaleDateString() 
                                                : <span className="text-xs italic opacity-50">Not recorded</span>
                                            }
                                            <br/>
                                            <span className={`badge badge-xs border-0 mt-1 ${
                                                order.status === 'Delivered' ? 'bg-emerald-500 text-white' : 'bg-cyan-500 text-white'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* 6. Actions */}
                                        <td className="pr-6 text-center rounded-r-xl border-y border-r border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* Add Tracking Button */}
                                                <button 
                                                    onClick={() => openModal(order, 'add')}
                                                    className="btn btn-sm border-0 bg-gradient-to-r from-teal-400 to-emerald-500 text-white tooltip hover:shadow-lg"
                                                    data-tip="Update Status"
                                                    disabled={order.status === 'Delivered'}
                                                >
                                                    <FaPlusCircle /> Add
                                                </button>

                                                {/* View Tracking Button */}
                                                <button 
                                                    onClick={() => openModal(order, 'view')}
                                                    className="btn btn-sm btn-square btn-ghost text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 tooltip"
                                                    data-tip="View Timeline"
                                                >
                                                    <FaEye className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- MODAL (Styled) --- */}
                <dialog id="tracking_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                    <div className="modal-box bg-white dark:bg-[#151f32] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-2xl p-6">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 z-20">✕</button>
                        </form>

                        {selectedOrder && (
                            <>
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
                                    {modalType === 'add' ? <FaPlusCircle className="text-teal-500"/> : <FaClipboardList className="text-teal-500"/>}
                                    {modalType === 'add' ? "Update Tracking Status" : "Tracking Timeline"}
                                </h3>
                                
                                <div className="text-xs mb-6 opacity-70 font-mono bg-gray-50 dark:bg-[#0b1120] p-2 rounded">
                                    ID: #{selectedOrder._id.slice(-6).toUpperCase()} | Product: {selectedOrder.productName}
                                </div>

                                {/* --- VIEW 1: ADD TRACKING FORM --- */}
                                {modalType === 'add' && (
                                    <form onSubmit={handleAddTracking} className="space-y-4">
                                        <div className="form-control">
                                            <label className="label pl-0"><span className="label-text font-bold text-gray-700 dark:text-gray-300">Update Status</span></label>
                                            <select 
                                                className="select w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 focus:outline-none focus:border-teal-500"
                                                value={trackingInput.status}
                                                onChange={(e) => setTrackingInput({...trackingInput, status: e.target.value})}
                                                required
                                            >
                                                <option disabled value="">Select Status</option>
                                                {statusOptions.map((status, idx) => (
                                                    <option key={idx} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-control">
                                            <label className="label pl-0"><span className="label-text font-bold text-gray-700 dark:text-gray-300">Current Location</span></label>
                                            <div className="relative">
                                                <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400"/>
                                                <input 
                                                    type="text" 
                                                    className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 pl-10 focus:outline-none focus:border-teal-500"
                                                    placeholder="e.g. Cutting Department, Warehouse A"
                                                    value={trackingInput.location}
                                                    onChange={(e) => setTrackingInput({...trackingInput, location: e.target.value})}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-control">
                                            <label className="label pl-0"><span className="label-text font-bold text-gray-700 dark:text-gray-300">Note (Optional)</span></label>
                                            <textarea 
                                                className="textarea w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 focus:outline-none focus:border-teal-500"
                                                placeholder="Any specific details..."
                                                value={trackingInput.note}
                                                onChange={(e) => setTrackingInput({...trackingInput, note: e.target.value})}
                                            ></textarea>
                                        </div>

                                        <button type="submit" className="btn w-full mt-4 border-0 text-white bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg">
                                            Save Update
                                        </button>
                                    </form>
                                )}

                                {/* --- VIEW 2: TIMELINE VIEW --- */}
                                {modalType === 'view' && (
                                    <div className="py-2">
                                        <ul className="steps steps-vertical w-full">
                                            <li className="step step-primary" data-content="✓">
                                                <div className="text-left ml-4 w-full">
                                                    <div className="font-bold text-gray-800 dark:text-white">Order Approved</div>
                                                    <div className="text-xs opacity-60">
                                                        {new Date(selectedOrder.approvedAt || selectedOrder.updatedAt).toLocaleString()}
                                                    </div>
                                                </div>
                                            </li>

                                            {selectedOrder.trackingHistory?.map((step, index) => (
                                                <li key={index} className="step step-primary" data-content="●">
                                                    <div className="text-left ml-4 mb-6 bg-gray-50 dark:bg-[#0b1120] p-4 rounded-xl border border-gray-100 dark:border-gray-700 w-full shadow-sm">
                                                        <div className="font-bold text-teal-600 dark:text-teal-400">{step.status}</div>
                                                        <div className="text-xs font-mono opacity-70 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1 inline-block">
                                                            {new Date(step.date).toLocaleString()}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-300 italic">"{step.note}"</div>
                                                        <div className="text-xs mt-2 flex items-center gap-1 text-gray-500 font-semibold">
                                                            <FaMapMarkerAlt className="text-red-400" /> {step.location}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        {(!selectedOrder.trackingHistory || selectedOrder.trackingHistory.length === 0) && (
                                            <div className="text-center py-8 opacity-50">
                                                <FaClipboardList className="text-4xl mx-auto mb-2 text-gray-300"/>
                                                <p className="text-sm">No tracking updates added yet.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button className="cursor-default">close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Approve_Orders;