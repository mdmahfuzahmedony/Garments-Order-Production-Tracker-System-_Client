import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { 
    FaCheck, 
    FaTimes, 
    FaEye, 
    FaUser, 
    FaCalendarAlt,
    FaMoneyBillWave,
    FaBoxOpen,
    FaCheckCircle, // আইকন ইম্পোর্ট
    FaExclamationCircle
} from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; 

const Pending_Orders = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); 
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: pendingOrders = [], refetch, isLoading } = useQuery({
        queryKey: ['manager-pending', user?.email],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/manager/pending/${user?.email}`);
            return res.data;
        },
        refetchOnMount: true 
    });

    const handleApprove = async (id) => {
        const orderToApprove = pendingOrders.find(o => o._id === id) || selectedOrder;
        
        if (orderToApprove && orderToApprove.paymentMethod !== 'Cash on Delivery' && orderToApprove.paymentStatus !== 'Paid') {
            Swal.fire({
                icon: 'warning',
                title: 'Cannot Approve!',
                text: 'Customer has not paid for this online order yet.',
            });
            return;
        }

        try {
            const res = await axiosSecure.patch(`/bookings/status/${id}`, { status: 'Approved' });
            
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Approved!',
                    text: 'User can now track this order.',
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch(); 
                document.getElementById('view_order_modal').close();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to approve order", "error");
        }
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Order?",
            text: "User will see 'Rejected' status.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#14b8a6",
            confirmButtonText: "Yes, Reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/bookings/status/${id}`, { status: 'Rejected' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Rejected!", "Order has been rejected.", "success");
                            refetch();
                        }
                    });
            }
        });
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        document.getElementById('view_order_modal').showModal();
    };

    if (isLoading || loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
                <span className="loading loading-bars loading-lg text-teal-500"></span>
            </div>
        );
    }

    if (pendingOrders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen font-sans transition-colors duration-300 relative
                bg-gradient-to-br from-gray-50 to-teal-50/30 
                dark:from-[#03131E] dark:to-[#0b1120]">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
                </div>
                <div className="relative z-10 flex flex-col items-center opacity-60">
                    <FaBoxOpen className="text-8xl mb-4 text-teal-300 dark:text-teal-900" />
                    <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">No Pending Approvals</h2>
                    <p className="text-gray-400">All orders have been processed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen p-6 font-sans transition-colors duration-300 relative
            bg-gradient-to-br from-gray-50 to-teal-50/30 
            dark:from-[#03131E] dark:to-[#0b1120]">
            
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">Order Management</p>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Pending <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Approvals</span>
                        </h2>
                    </div>
                    <div className="badge bg-orange-100 text-orange-600 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800 p-4 font-bold rounded-lg shadow-sm">
                        {pendingOrders.length} Pending
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-4">
                        <thead className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="bg-transparent border-0 pl-6">Order ID</th>
                                <th className="bg-transparent border-0">User</th>
                                <th className="bg-transparent border-0">Product</th>
                                <th className="bg-transparent border-0 text-center">Quantity</th>
                                {/* 🔥 ১. নতুন কলাম হেডার যোগ করা হলো */}
                                <th className="bg-transparent border-0 text-center">Payment Status</th>
                                <th className="bg-transparent border-0">Order Date</th>
                                <th className="bg-transparent border-0 text-center pr-6">Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {pendingOrders.map((order) => {
                                const isApprovalDisabled = order.paymentMethod !== 'Cash on Delivery' && order.paymentStatus === 'Unpaid';
                                
                                return (
                                    <tr 
                                        key={order._id} 
                                        className="group bg-white dark:bg-[#151f32] shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 rounded-xl"
                                    >
                                        <td className="pl-6 font-mono font-bold text-xs text-gray-400 rounded-l-xl border-y border-l border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </td>
                                        
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 dark:text-white">{order.userName}</span>
                                                <span className="text-xs text-gray-400">{order.userEmail}</span>
                                            </div>
                                        </td>
                                        
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-10 h-10 ring-1 ring-gray-100 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800">
                                                        <img src={order.productImage} alt="Prod" />
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-sm line-clamp-1 max-w-[150px] text-gray-700 dark:text-gray-300">{order.productName}</div>
                                            </div>
                                        </td>
                                        
                                        <td className="text-center font-bold text-gray-700 dark:text-gray-300 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <span className="badge border-0 bg-gray-100 dark:bg-gray-800 font-mono text-gray-600 dark:text-gray-400">{order.quantity}</span>
                                        </td>

                                        {/* 🔥 ২. পেমেন্ট স্ট্যাটাস ফিল্ড (লজিক সহ) */}
                                        <td className="text-center border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            {order.paymentStatus === 'Paid' ? (
                                                <span className="badge badge-success text-white font-bold gap-1 shadow-sm">
                                                    <FaCheckCircle className="text-xs" /> Paid
                                                </span>
                                            ) : order.paymentMethod === 'Cash on Delivery' ? (
                                                <span className="badge badge-warning text-white font-bold gap-1 shadow-sm">
                                                    <FaMoneyBillWave className="text-xs" /> COD
                                                </span>
                                            ) : (
                                                <span className="badge badge-error text-white font-bold gap-1 shadow-sm animate-pulse">
                                                    <FaExclamationCircle className="text-xs" /> Unpaid
                                                </span>
                                            )}
                                        </td>
                                        
                                        <td className="text-sm text-gray-500 dark:text-gray-400 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                        
                                        <td className="pr-6 text-center rounded-r-xl border-y border-r border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleViewOrder(order)} 
                                                    className="btn btn-sm btn-square btn-ghost text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 tooltip" 
                                                    data-tip="View Details"
                                                >
                                                    <FaEye className="text-lg" />
                                                </button>
                                                
                                                <button 
                                                    onClick={() => handleApprove(order._id)} 
                                                    className={`btn btn-sm btn-square btn-ghost tooltip ${isApprovalDisabled ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`} 
                                                    data-tip={isApprovalDisabled ? "Unpaid Online Order" : "Approve"}
                                                    disabled={isApprovalDisabled}
                                                >
                                                    <FaCheck className="text-lg" />
                                                </button>
                                                
                                                <button 
                                                    onClick={() => handleReject(order._id)} 
                                                    className="btn btn-sm btn-square btn-ghost text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 tooltip" 
                                                    data-tip="Reject"
                                                >
                                                    <FaTimes className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Modal (Same Logic) */}
                <dialog id="view_order_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                     <div className="modal-box bg-white dark:bg-[#151f32] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-2xl p-0 overflow-hidden">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 z-20">✕</button>
                        </form>
                        
                        {selectedOrder && (
                            <>
                                <div className="bg-gray-50 dark:bg-[#0b1120] p-6 border-b border-gray-100 dark:border-gray-700">
                                    <h3 className="font-bold text-lg text-teal-500">Order Details</h3>
                                </div>
                                
                                <div className="p-6 space-y-4">
                                    {/* Product Info */}
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#0b1120] rounded-xl border border-gray-100 dark:border-gray-700">
                                        <img src={selectedOrder.productImage} alt="" className="w-16 h-16 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"/>
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-white">{selectedOrder.productName}</p>
                                            <p className="text-xs text-gray-400 font-mono mt-1">ID: #{selectedOrder._id}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <p className="font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1"><FaUser className="text-teal-500 text-xs"/> Customer</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs">{selectedOrder.userName}</p>
                                        </div>
                                        <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <p className="font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1"><FaMoneyBillWave className="text-teal-500 text-xs"/> Payment</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-2">
                                                {selectedOrder.paymentMethod}
                                                {/* মডালেও স্ট্যাটাস দেখানো হচ্ছে */}
                                                {selectedOrder.paymentStatus === 'Paid' ? (
                                                    <span className="text-emerald-500 font-bold text-[10px] uppercase">(Paid)</span>
                                                ) : selectedOrder.paymentMethod !== 'Cash on Delivery' ? (
                                                    <span className="text-red-500 font-bold text-[10px] uppercase">(Unpaid)</span>
                                                ) : null}
                                            </p>
                                        </div>
                                        <div className="col-span-2 p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#0b1120]">
                                            <p className="font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2"><FaCalendarAlt className="text-teal-500 text-xs"/> Delivery Address</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs italic">{selectedOrder.address}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-100 dark:border-teal-900/30">
                                        <span className="font-bold text-teal-700 dark:text-teal-400">Total Price:</span>
                                        <span className="text-2xl font-extrabold text-teal-600 dark:text-teal-300">${selectedOrder.totalPrice}</span>
                                    </div>
                                </div>
                                
                                <div className="modal-action p-6 pt-0 flex justify-end">
                                    <button 
                                        onClick={() => handleApprove(selectedOrder._id)} 
                                        className={`btn bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 border-0 text-white shadow-lg w-full ${
                                            (selectedOrder.paymentMethod !== 'Cash on Delivery' && selectedOrder.paymentStatus === 'Unpaid') ? 'btn-disabled opacity-50' : ''
                                        }`}
                                        disabled={selectedOrder.paymentMethod !== 'Cash on Delivery' && selectedOrder.paymentStatus === 'Unpaid'}
                                    >
                                        Approve Now
                                    </button>
                                </div>
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

export default Pending_Orders;