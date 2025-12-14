import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaSearch, FaBoxOpen } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure'; // ১. হুক ইমপোর্ট

const All_Orders = () => {
    const axiosSecure = useAxiosSecure(); // ২. হুক ইনিশিলাইজ
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // ৩. সব অর্ডার লোড (Secure Call)
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['all-orders-admin'],
        queryFn: async () => {
            // axiosSecure অটোমেটিক টোকেন পাঠাবে
            const res = await axiosSecure.get('/all-orders');
            return res.data;
        }
    });

    // ৪. ফিল্টার এবং সার্চ লজিক
    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'All' ? true : order.status === filter;
        const matchesSearch = 
            (order._id && order._id.toLowerCase().includes(search.toLowerCase())) ||
            (order.userEmail && order.userEmail.toLowerCase().includes(search.toLowerCase()));
        
        return matchesFilter && matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-full p-6 bg-base-200 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-primary">All Orders Management</h2>
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <select 
                    className="select select-bordered w-full md:w-xs "
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>

                <div className="join w-full md:w-auto">
                    <input 
                        className="input input-bordered join-item w-full md:w-80" 
                        placeholder="Search ID or Email..." 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-primary join-item text-white"><FaSearch /></button>
                </div>
            </div>

            <div className="overflow-x-auto shadow-xl rounded-xl ">
                <table className="table w-full">
                    <thead className="bg-gray-800 text-white uppercase text-sm">
                        <tr>
                            <th>Order ID</th>
                            <th>User Info</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10">
                                    <div className="flex flex-col items-center opacity-50">
                                        <FaBoxOpen className="text-4xl mb-2" />
                                        <p>No orders found.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 border-b">
                                    <td className="font-mono text-xs font-bold">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td>
                                        <div className="font-bold text-sm">{order.userName || 'Unknown'}</div>
                                        <div className="text-xs opacity-60">{order.userEmail}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-8 h-8 rounded">
                                                    <img src={order.productImage} alt="product" />
                                                </div>
                                            </div>
                                            <span className="text-xs font-semibold max-w-[150px] truncate">{order.productName}</span>
                                        </div>
                                    </td>
                                    <td className="font-bold">{order.quantity}</td>
                                    <td>
                                        <span className={`badge text-white font-bold text-xs p-3 ${
                                            order.status === 'Approved' ? 'badge-success' :
                                            order.status === 'Rejected' ? 'badge-error' :
                                            order.status === 'Delivered' ? 'badge-primary' :
                                            order.status === 'Shipped' ? 'badge-info' : 'badge-warning'
                                        }`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                document.getElementById('details_modal').showModal();
                                            }}
                                            className="btn btn-xs btn-outline btn-info"
                                        >
                                            <FaEye /> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Details Modal */}
            <dialog id="details_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-11/12 max-w-2xl bg-white text-gray-800">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    
                    <h3 className="font-bold text-2xl mb-6 text-center border-b pb-2">Order Details</h3>
                    
                    {selectedOrder && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="flex flex-col items-center">
                                <img src={selectedOrder.productImage} className="w-full h-48 object-cover rounded-xl shadow-md" alt="Product"/>
                                <div className="mt-4 text-center">
                                    <h4 className="font-bold text-lg">{selectedOrder.productName}</h4>
                                    <span className="badge badge-lg mt-2">{selectedOrder.status || 'Pending'}</span>
                                </div>
                             </div>
                             
                             <div className="space-y-3 text-sm">
                                <div className="bg-base-200 p-4 rounded-lg">
                                    <p className="font-bold text-gray-500 uppercase text-xs mb-2">Customer Info</p>
                                    <p><strong>Name:</strong> {selectedOrder.userName}</p>
                                    <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                                    <p><strong>Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
                                </div>

                                <div className="bg-base-200 p-4 rounded-lg">
                                    <p className="font-bold text-gray-500 uppercase text-xs mb-2">Order Info</p>
                                    <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                                    <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                                    <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                                    <p><strong>Total Price:</strong> ${selectedOrder.totalPrice || (selectedOrder.price * selectedOrder.quantity)}</p>
                                </div>

                                <div className="bg-base-200 p-4 rounded-lg">
                                    <p className="font-bold text-gray-500 uppercase text-xs mb-2">Delivery Info</p>
                                    <p><strong>Address:</strong> {selectedOrder.address}</p>
                                </div>
                             </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default All_Orders;