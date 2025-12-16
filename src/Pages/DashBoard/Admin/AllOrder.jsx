import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaSearch, FaBoxOpen } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure'; 

const All_Orders = () => {
    const axiosSecure = useAxiosSecure(); 
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // ৩. সব অর্ডার লোড (Secure Call) - লজিক অপরিবর্তিত
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['all-orders-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-orders');
            return res.data;
        }
    });

    // ৪. ফিল্টার এবং সার্চ লজিক - লজিক অপরিবর্তিত
    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'All' ? true : order.status === filter;
        const matchesSearch = 
            (order._id && order._id.toLowerCase().includes(search.toLowerCase())) ||
            (order.userEmail && order.userEmail.toLowerCase().includes(search.toLowerCase()));
        
        return matchesFilter && matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
                <span className="loading loading-bars loading-lg text-teal-500"></span>
            </div>
        );
    }

    return (
        // 1. Main Background: Gradient & Texture matched with your site theme
        <div className="w-full min-h-screen p-6 font-sans transition-colors duration-300 relative
            bg-gradient-to-br from-gray-50 to-teal-50/30 
            dark:from-[#03131E] dark:to-[#0b1120]">
            
            {/* Background Texture (Dots) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">Admin Panel</p>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            All Orders <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Management</span>
                        </h2>
                    </div>
                </div>
                
                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 bg-white dark:bg-[#151f32] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <select 
                        className="select bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 w-full md:w-xs focus:outline-none focus:border-teal-500 text-gray-700 dark:text-gray-300"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>

                    <div className="relative w-full md:w-auto">
                        <input 
                            className="input bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 w-full md:w-80 pl-4 pr-12 focus:outline-none focus:border-teal-500 text-gray-700 dark:text-gray-300" 
                            placeholder="Search ID or Email..." 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="absolute right-2 top-2 btn btn-sm btn-circle border-0 bg-gradient-to-r from-teal-400 to-emerald-500 text-white hover:scale-105">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    {/* border-separate এবং border-spacing-y-4 ব্যবহারের কারণে রো গুলোর মাঝে ফাঁকা তৈরি হবে */}
                    <table className="table w-full border-separate border-spacing-y-4">
                        <thead className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="bg-transparent border-0">Order ID</th>
                                <th className="bg-transparent border-0">User Info</th>
                                <th className="bg-transparent border-0">Product</th>
                                <th className="bg-transparent border-0 text-center">Qty</th>
                                <th className="bg-transparent border-0 text-center">Status</th>
                                <th className="bg-transparent border-0 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-16">
                                        <div className="flex flex-col items-center opacity-50 text-gray-500 dark:text-gray-400">
                                            <FaBoxOpen className="text-6xl mb-4 text-teal-200 dark:text-teal-900" />
                                            <p className="text-lg">No orders found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr 
                                        key={order._id} 
                                        // Row Styling: Card look, hover shadow, transition
                                        className="group bg-white dark:bg-[#151f32] shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 rounded-xl"
                                    >
                                        <td className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400 rounded-l-xl border-y border-l border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="font-bold text-sm text-gray-800 dark:text-white">{order.userName || 'Unknown'}</div>
                                            <div className="text-xs text-gray-400">{order.userEmail}</div>
                                        </td>
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 h-10 rounded-lg ring-1 ring-gray-100 dark:ring-gray-700">
                                                        <img src={order.productImage} alt="product" className="object-cover"/>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-semibold max-w-[150px] truncate text-gray-700 dark:text-gray-300">
                                                    {order.productName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="font-bold text-center text-gray-700 dark:text-gray-300 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            {order.quantity}
                                        </td>
                                        <td className="text-center border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <span className={`badge border-0 font-bold text-[10px] py-3 px-3 uppercase tracking-wide text-white shadow-md ${
                                                order.status === 'Approved' ? 'bg-emerald-500' :
                                                order.status === 'Rejected' ? 'bg-red-500' :
                                                order.status === 'Delivered' ? 'bg-blue-600' :
                                                order.status === 'Shipped' ? 'bg-cyan-500' : 'bg-orange-400'
                                            }`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="text-center rounded-r-xl border-y border-r border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <button 
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    document.getElementById('details_modal').showModal();
                                                }}
                                                className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 tooltip"
                                                data-tip="View Details"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* View Details Modal (Styled) */}
                <dialog id="details_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                    <div className="modal-box w-11/12 max-w-2xl bg-white dark:bg-[#151f32] text-gray-800 dark:text-gray-200 p-0 overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white z-20 bg-black/20 hover:bg-black/40 border-0">✕</button>
                        </form>
                        
                        {selectedOrder && (
                            <div>
                                {/* Modal Header with Image */}
                                <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                                    <img src={selectedOrder.productImage} className="w-full h-full object-cover opacity-90" alt="Product"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151f32] to-transparent"></div>
                                    <div className="absolute bottom-4 left-6 text-white">
                                        <h3 className="font-bold text-2xl drop-shadow-md">{selectedOrder.productName}</h3>
                                        <span className={`badge mt-2 border-0 font-bold ${
                                            selectedOrder.status === 'Approved' ? 'bg-emerald-500' : 'bg-orange-400'
                                        }`}>
                                            {selectedOrder.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b1120] border border-gray-100 dark:border-gray-700">
                                            <p className="text-teal-500 text-xs font-bold uppercase tracking-widest mb-3">Customer Info</p>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="text-gray-400">Name:</span> <span className="font-semibold">{selectedOrder.userName}</span></p>
                                                <p><span className="text-gray-400">Email:</span> <span className="font-semibold">{selectedOrder.userEmail}</span></p>
                                                <p><span className="text-gray-400">Phone:</span> <span className="font-semibold">{selectedOrder.phone || 'N/A'}</span></p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b1120] border border-gray-100 dark:border-gray-700">
                                            <p className="text-teal-500 text-xs font-bold uppercase tracking-widest mb-3">Delivery Info</p>
                                            <p className="text-sm font-semibold">{selectedOrder.address}</p>
                                        </div>
                                     </div>

                                     <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b1120] border border-gray-100 dark:border-gray-700 h-fit">
                                        <p className="text-teal-500 text-xs font-bold uppercase tracking-widest mb-3">Order Summary</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                                <span className="text-gray-400">Order ID</span>
                                                <span className="font-mono">{selectedOrder._id.slice(-6).toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                                <span className="text-gray-400">Date</span>
                                                <span>{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                                <span className="text-gray-400">Quantity</span>
                                                <span className="font-bold">{selectedOrder.quantity} pcs</span>
                                            </div>
                                            <div className="flex justify-between pt-1">
                                                <span className="text-gray-400">Total Price</span>
                                                <span className="font-extrabold text-teal-500 text-lg">
                                                    ${selectedOrder.totalPrice || (selectedOrder.price * selectedOrder.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default All_Orders;