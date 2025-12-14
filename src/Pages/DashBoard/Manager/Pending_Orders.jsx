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
    FaBoxOpen
} from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; // পাথ ঠিক করা হয়েছে

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
        }
    });

    // --- Approve Handler ---
    const handleApprove = async (id) => {
        try {
            // স্ট্যাটাস আপডেট করে 'Approved' করা হচ্ছে
            const res = await axiosSecure.patch(`/bookings/status/${id}`, { status: 'Approved' });
            
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Approved!',
                    text: 'User can now track this order.',
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch(); // টেবিল রিফ্রেশ
                if(selectedOrder) document.getElementById('view_order_modal').close();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to approve order", "error");
        }
    };

    // --- Reject Handler ---
    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Order?",
            text: "User will see 'Rejected' status.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
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

    // --- View Modal Handler ---
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        document.getElementById('view_order_modal').showModal();
    };

    if (isLoading || loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (pendingOrders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] bg-base-200 text-base-content/60">
                <FaBoxOpen className="text-6xl mb-4 opacity-50" />
                <h2 className="text-2xl font-bold">No Pending Approvals</h2>
                <p>All orders have been processed.</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 bg-base-200 min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-base-content">Pending Orders</h2>
                <div className="badge badge-warning badge-lg font-bold">{pendingOrders.length} Pending</div>
            </div>
            
            <div className="overflow-x-auto shadow-xl rounded-xl border border-base-300 bg-base-100">
                <table className="table bg-base-100 align-middle w-full">
                    <thead className="bg-primary text-white text-sm uppercase font-bold">
                        <tr>
                            <th className="py-4 pl-4">Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th className="text-center">Quantity</th>
                            <th>Order Date</th>
                            <th className="text-center pr-4">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-base-300 text-base-content">
                        {pendingOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-base-200 transition duration-200">
                                <td className="pl-4 font-mono font-bold text-xs opacity-70">#{order._id.slice(-6).toUpperCase()}</td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="font-bold">{order.userName}</span>
                                        <span className="text-xs opacity-60">{order.userEmail}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10 bg-base-300">
                                                <img src={order.productImage} alt="Prod" />
                                            </div>
                                        </div>
                                        <div className="font-semibold text-sm line-clamp-1 max-w-[150px]">{order.productName}</div>
                                    </div>
                                </td>
                                <td className="text-center font-bold"><span className="badge badge-ghost font-mono">{order.quantity}</span></td>
                                <td className="text-sm">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td className="pr-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => handleViewOrder(order)} className="btn btn-sm btn-square btn-ghost text-info tooltip" data-tip="View Details">
                                            <FaEye className="text-lg" />
                                        </button>
                                        <button onClick={() => handleApprove(order._id)} className="btn btn-sm btn-square btn-ghost text-success tooltip" data-tip="Approve" disabled={order.paymentMethod !== 'Cash on Delivery' && order.paymentStatus === 'Unpaid'}>
                                            <FaCheck className="text-lg" />
                                        </button>
                                        <button onClick={() => handleReject(order._id)} className="btn btn-sm btn-square btn-ghost text-error tooltip" data-tip="Reject">
                                            <FaTimes className="text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal remains same as your code */}
            <dialog id="view_order_modal" className="modal modal-bottom sm:modal-middle">
                 <div className="modal-box bg-base-100 text-base-content">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedOrder && (
                        <>
                            <h3 className="font-bold text-lg mb-4 text-primary border-b border-base-300 pb-2">Order Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                    <img src={selectedOrder.productImage} alt="" className="w-16 h-16 rounded object-cover"/>
                                    <div>
                                        <p className="font-bold">{selectedOrder.productName}</p>
                                        <p className="text-xs opacity-70">ID: #{selectedOrder._id}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><p className="font-bold flex items-center gap-1"><FaUser className="text-xs"/> Customer</p><p className="opacity-80">{selectedOrder.userName}</p></div>
                                    <div><p className="font-bold flex items-center gap-1"><FaMoneyBillWave className="text-xs"/> Payment</p><p className="opacity-80">{selectedOrder.paymentMethod}</p></div>
                                    <div className="col-span-2"><p className="font-bold flex items-center gap-1"><FaCalendarAlt className="text-xs"/> Address</p><p className="opacity-80 p-2 bg-base-200 rounded text-xs mt-1">{selectedOrder.address}</p></div>
                                </div>
                                <div className="flex justify-between items-center bg-primary/10 p-3 rounded-lg mt-4">
                                    <span className="font-bold">Total Price:</span>
                                    <span className="text-xl font-bold text-primary">${selectedOrder.totalPrice}</span>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button onClick={() => handleApprove(selectedOrder._id)} className="btn btn-success text-white" disabled={selectedOrder.paymentMethod !== 'Cash on Delivery' && selectedOrder.paymentStatus === 'Unpaid'}>Approve Now</button>
                            </div>
                        </>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default Pending_Orders;