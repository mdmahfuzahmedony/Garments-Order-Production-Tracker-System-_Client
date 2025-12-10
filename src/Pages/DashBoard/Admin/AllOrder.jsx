import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaEye, FaSearch } from 'react-icons/fa';

const All_Orders = () => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // ১. সব অর্ডার লোড
    const { data: orders = [] } = useQuery({
        queryKey: ['all-orders-admin'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/all-orders');
            return res.data;
        }
    });

    // ২. ফিল্টার এবং সার্চ লজিক
    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'All' ? true : order.status === filter;
        const matchesSearch = 
            (order._id && order._id.toLowerCase().includes(search.toLowerCase())) ||
            (order.userEmail && order.userEmail.toLowerCase().includes(search.toLowerCase()));
        
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="w-full p-6 bg-base-200 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-primary">All Orders Management</h2>
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <select 
                    className="select select-bordered w-full md:w-xs"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Shipped">Shipped</option>
                </select>

                <div className="join w-full md:w-auto">
                    <input 
                        className="input input-bordered join-item w-full" 
                        placeholder="Search ID or Email..." 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn join-item"><FaSearch /></button>
                </div>
            </div>

            <div className="overflow-x-auto  shadow-xl rounded-xl">
                <table className="table w-full">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order._id}>
                                <td className="font-mono text-xs">{order._id}</td>
                                <td>
                                    <div className="font-bold">{order.userName || 'Unknown'}</div>
                                    <div className="text-xs opacity-50">{order.userEmail}</div>
                                </td>
                                <td>{order.productName}</td>
                                <td className="font-bold">{order.quantity}</td>
                                <td>
                                    <span className={`badge text-white ${
                                        order.status === 'Approved' ? 'badge-success' :
                                        order.status === 'Rejected' ? 'badge-error' :
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
                                        className="btn btn-xs btn-primary text-white"
                                    >
                                        <FaEye /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Details Modal */}
            <dialog id="details_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-2xl mb-4 text-center">Order Full Details</h3>
                    {selectedOrder && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <img src={selectedOrder.productImage} className="w-full h-48 object-cover rounded-lg" alt=""/>
                             <div className="space-y-2">
                                <p><strong>ID:</strong> {selectedOrder._id}</p>
                                <p><strong>User:</strong> {selectedOrder.userEmail}</p>
                                <p><strong>Product:</strong> {selectedOrder.productName}</p>
                                <p><strong>Price:</strong> ${selectedOrder.price}</p>
                                <p><strong>Total:</strong> ${selectedOrder.price * selectedOrder.quantity}</p>
                                <p><strong>Address:</strong> {selectedOrder.address}</p>
                                <p><strong>Status:</strong> {selectedOrder.status}</p>
                             </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog"><button className="btn">Close</button></form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default All_Orders;