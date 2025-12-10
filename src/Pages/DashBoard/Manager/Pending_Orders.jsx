import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth/useAuth'; 

const Pending_Orders = () => {
    const { user } = useAuth(); 
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['my-pending-orders', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axios.get(`http://localhost:2001/bookings/manager/pending/${user.email}`);
            return res.data;
        }
    });

    const handleAction = (id, status) => {
        Swal.fire({
            title: `Are you sure you want to ${status}?`,
            icon: status === 'Approved' ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: status === 'Approved' ? '#22c55e' : '#d33',
            confirmButtonText: `Yes, ${status} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:2001/bookings/status/${id}`, { status: status })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire('Success', `Order has been ${status}.`, 'success');
                        }
                    });
            }
        });
    };

    // ==========================================
    // FIXED DATE FORMATTER FUNCTION
    // ==========================================
    const formatDate = (dateString) => {
        // যদি তারিখ না থাকে (পুরানো ডাটা)
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        
        // যদি তারিখটি ইনভ্যালিড হয়
        if (isNaN(date.getTime())) return 'Invalid Date';

        // সুন্দর ফরম্যাট: 12 Oct 2023, 10:30 PM
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (isLoading) return <div className="text-center mt-20 text-white">Loading...</div>;

    return (
        <div className="w-full p-6 min-h-screen bg-gray-900 text-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Pending Orders Management</h2>
            
            <div className="overflow-x-auto bg-gray-800 shadow-xl rounded-xl border border-gray-700">
                <table className="table w-full">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th>Order ID</th>
                            <th>User Info</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Order Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 font-bold text-gray-500">
                                    No Pending orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-700 border-b border-gray-600">
                                    <td className="text-xs font-mono opacity-70">
                                        {order._id.slice(-6)}...
                                    </td>
                                    <td className="text-sm">
                                        <div className="font-bold text-white">{order.userEmail}</div>
                                        <div className="text-xs opacity-70">{order.userName}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10 bg-white">
                                                    <img src={order.productImage} alt="Product" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{order.productName}</div>
                                                <div className="text-xs text-green-400 font-bold">${order.price}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold text-white">{order.quantity} pcs</td>
                                    
                                    {/* এখানে সঠিক তারিখ দেখানো হবে */}
                                    <td className="text-xs font-mono text-yellow-300 font-semibold">
                                        {formatDate(order.date)}
                                    </td>
                                    
                                    <td className="flex justify-center gap-2">
                                        <button 
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                document.getElementById('order_modal').showModal();
                                            }} 
                                            className="btn btn-xs btn-info text-white"
                                        >
                                            <FaEye />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(order._id, 'Approved')} 
                                            className="btn btn-xs btn-success text-white"
                                        >
                                            <FaCheck />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(order._id, 'Rejected')} 
                                            className="btn btn-xs btn-error text-white"
                                        >
                                            <FaTimes />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <dialog id="order_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl bg-gray-800 text-white border border-gray-600">
                    <h3 className="font-bold text-2xl text-center mb-4 text-purple-400">Order Details</h3>
                    {selectedOrder && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex justify-center items-center bg-gray-700 p-4 rounded-lg">
                                <img src={selectedOrder.productImage} alt="Product" className="rounded-xl shadow-lg w-full max-h-60 object-contain" />
                            </div>
                            <div className="space-y-3 text-sm">
                                <p className="border-b border-gray-600 pb-2"><strong>Order ID:</strong> <span className="font-mono text-gray-400">{selectedOrder._id}</span></p>
                                <p><strong>Customer:</strong> {selectedOrder.userName}</p>
                                <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                                <p><strong>Product:</strong> {selectedOrder.productName}</p>
                                <p><strong>Quantity:</strong> <span className="text-yellow-400 font-bold">{selectedOrder.quantity}</span></p>
                                <p><strong>Total Amount:</strong> <span className="text-green-400 font-bold">${selectedOrder.price * selectedOrder.quantity}</span></p>
                                <p><strong>Address:</strong> {selectedOrder.address || 'Not Provided'}</p>
                                <p><strong>Phone:</strong> {selectedOrder.phone || 'Not Provided'}</p>
                                <p><strong>Order Date:</strong> {formatDate(selectedOrder.date)}</p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-neutral text-white">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Pending_Orders;