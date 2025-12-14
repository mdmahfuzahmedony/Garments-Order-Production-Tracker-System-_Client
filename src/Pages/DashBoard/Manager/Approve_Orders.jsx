import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { 
    FaPlusCircle, 
    FaEye, 
    FaMapMarkerAlt, 
    FaClipboardList 
} from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; // 1. Hook Import

const Approve_Orders = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); // 2. Hook Initialize
    
    // মডাল এবং সিলেকশন স্টেট
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalType, setModalType] = useState(null); // 'add' or 'view'
    
    // ট্র্যাকিং ফর্ম স্টেট
    const [trackingInput, setTrackingInput] = useState({
        status: "",
        location: "",
        note: ""
    });

    const { data: approvedOrders = [], refetch, isLoading } = useQuery({
        queryKey: ['manager-approved', user?.email],
        enabled: !loading && !!user?.email, // ইউজার লোড না হওয়া পর্যন্ত কল যাবে না
        queryFn: async () => {
            // 3. axiosSecure ব্যবহার করা হয়েছে
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

    // মডাল ওপেন হ্যান্ডলার
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

    // ট্র্যাকিং আপডেট সাবমিট হ্যান্ডলার
    const handleAddTracking = async (e) => {
        e.preventDefault();
        
        const updateData = {
            status: trackingInput.status,
            note: trackingInput.note,
            location: trackingInput.location
        };

        try {
            // 4. Update এর জন্যও axiosSecure ব্যবহার করা হয়েছে
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
            <div className="flex justify-center items-center h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 bg-base-200 min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-base-content">Approved Orders</h2>
                <div className="badge badge-primary badge-lg">{approvedOrders.length} Items</div>
            </div>

            {/* --- TABLE VIEW --- */}
            <div className="overflow-x-auto shadow-xl rounded-xl border border-base-300 bg-base-100">
                <table className="table bg-base-100 align-middle w-full">
                    {/* Columns */}
                    <thead className="bg-primary text-white text-sm uppercase font-bold">
                        <tr>
                            <th className="py-4 pl-4">Order ID</th>
                            <th>User Info</th>
                            <th>Product</th>
                            <th className="text-center">Quantity</th>
                            <th>Approved Date</th>
                            <th className="text-center pr-4">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-base-300 text-base-content">
                        {approvedOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-base-200 transition duration-200">
                                
                                {/* 1. Order ID */}
                                <td className="pl-4 font-mono font-bold text-xs opacity-70">
                                    #{order._id.slice(-6).toUpperCase()}
                                </td>

                                {/* 2. User */}
                                <td>
                                    <div className="flex flex-col">
                                        <span className="font-bold">{order.userName}</span>
                                        <span className="text-xs opacity-60">{order.userEmail}</span>
                                        <span className="text-xs opacity-60">{order.phone}</span>
                                    </div>
                                </td>

                                {/* 3. Product */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10 bg-base-300">
                                                <img src={order.productImage || "https://via.placeholder.com/50"} alt="Prod" />
                                            </div>
                                        </div>
                                        <div className="font-semibold text-sm">{order.productName}</div>
                                    </div>
                                </td>

                                {/* 4. Quantity */}
                                <td className="text-center font-bold">
                                    <span className="badge badge-ghost font-mono">{order.quantity}</span>
                                </td>

                                {/* 5. Approved Date */}
                                <td className="text-sm">
                                    {order.approvedAt 
                                        ? new Date(order.approvedAt).toLocaleDateString() 
                                        : <span className="text-xs italic opacity-50">Not recorded</span>
                                    }
                                    <br/>
                                    <span className={`badge badge-xs ${order.status === 'Delivered' ? 'badge-success' : 'badge-info text-white'}`}>
                                        {order.status}
                                    </span>
                                </td>

                                {/* 6. Actions */}
                                <td className="pr-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Add Tracking Button */}
                                        <button 
                                            onClick={() => openModal(order, 'add')}
                                            className="btn btn-sm btn-primary text-white tooltip tooltip-left"
                                            data-tip="Add Tracking Update"
                                            disabled={order.status === 'Delivered'}
                                        >
                                            <FaPlusCircle /> Add
                                        </button>

                                        {/* View Tracking Button */}
                                        <button 
                                            onClick={() => openModal(order, 'view')}
                                            className="btn btn-sm btn-ghost text-info tooltip tooltip-top"
                                            data-tip="View Timeline"
                                        >
                                            <FaEye className="text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL --- */}
            <dialog id="tracking_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-base-100 text-base-content">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {selectedOrder && (
                        <>
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                {modalType === 'add' ? <FaPlusCircle className="text-primary"/> : <FaClipboardList className="text-info"/>}
                                {modalType === 'add' ? "Update Tracking Status" : "Tracking Timeline"}
                            </h3>
                            
                            <div className="text-xs mb-4 opacity-70">
                                Order ID: #{selectedOrder._id.slice(-6).toUpperCase()} | Product: {selectedOrder.productName}
                            </div>

                            {/* --- VIEW 1: ADD TRACKING FORM --- */}
                            {modalType === 'add' && (
                                <form onSubmit={handleAddTracking} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Update Status</span></label>
                                        <select 
                                            className="select select-bordered w-full"
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
                                        <label className="label"><span className="label-text font-bold">Current Location</span></label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400"/>
                                            <input 
                                                type="text" 
                                                className="input input-bordered w-full pl-10"
                                                placeholder="e.g. Cutting Department, Warehouse A"
                                                value={trackingInput.location}
                                                onChange={(e) => setTrackingInput({...trackingInput, location: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Note (Optional)</span></label>
                                        <textarea 
                                            className="textarea textarea-bordered"
                                            placeholder="Any specific details..."
                                            value={trackingInput.note}
                                            onChange={(e) => setTrackingInput({...trackingInput, note: e.target.value})}
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full mt-2 text-white">
                                        Save Update
                                    </button>
                                </form>
                            )}

                            {/* --- VIEW 2: TIMELINE VIEW --- */}
                            {modalType === 'view' && (
                                <div className="py-4">
                                    <ul className="steps steps-vertical w-full">
                                        <li className="step step-primary" data-content="✓">
                                            <div className="text-left ml-2">
                                                <div className="font-bold">Order Approved</div>
                                                <div className="text-xs opacity-60">
                                                    {new Date(selectedOrder.approvedAt || selectedOrder.updatedAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </li>

                                        {selectedOrder.trackingHistory?.map((step, index) => (
                                            <li key={index} className="step step-primary" data-content="●">
                                                <div className="text-left ml-2 mb-4 bg-base-200 p-3 rounded-lg w-full">
                                                    <div className="font-bold text-primary">{step.status}</div>
                                                    <div className="text-xs font-mono opacity-70 mb-1">
                                                        {new Date(step.date).toLocaleString()}
                                                    </div>
                                                    <div className="text-sm">{step.note}</div>
                                                    <div className="text-xs mt-1 flex items-center gap-1 text-secondary">
                                                        <FaMapMarkerAlt /> {step.location}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    {(!selectedOrder.trackingHistory || selectedOrder.trackingHistory.length === 0) && (
                                        <p className="text-center text-sm opacity-50 mt-2">No tracking updates added yet.</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default Approve_Orders;