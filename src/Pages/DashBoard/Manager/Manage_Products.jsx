import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit, FaSearch, FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const Manage_Products = () => {
    const { user, loading } = useAuth(); // লজিক অপরিবর্তিত
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log("--- DEBUGGING MANAGE PRODUCTS ---");
        console.log("User State:", user);
        console.log("User Email:", user?.email);
        console.log("Is Loading:", loading);
    }, [user, loading]);

    // Query লজিক অপরিবর্তিত
    const { data: products = [], refetch, isLoading: isQueryLoading, error } = useQuery({
        queryKey: ['my-products', user?.email],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            console.log("Fetching Data for:", user.email); 
            const res = await axiosSecure.get(`/garments-products/manager/${user.email}`);
            console.log("Data Received:", res.data);
            return res.data;
        }
    });

    if (error) {
        console.error("Query Error:", error);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#14b8a6', // Teal Cancel Button
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/garments-products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                        }
                    });
            }
        });
    };

    const filteredProducts = products.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.category?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading || isQueryLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
                <span className="loading loading-bars loading-lg text-teal-500"></span>
                <p className="mt-2 text-gray-500">Loading Product Data...</p>
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
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">Manager Panel</p>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Products</span>
                        </h2>
                        {/* ডিবাগ ইমেইল (ছোট করে নিচে রাখা হয়েছে) */}
                        <p className="text-xs text-gray-400 mt-1">Logged in as: {user?.email}</p>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <input 
                            type="text" 
                            placeholder="Search by Name or Category..." 
                            className="input w-full md:w-80 bg-white dark:bg-[#151f32] border-gray-200 dark:border-gray-700 pl-10 focus:outline-none focus:border-teal-500 text-gray-700 dark:text-gray-300 rounded-xl shadow-sm" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    {/* border-separate এবং border-spacing-y-4 ব্যবহার করে রো গুলোর মাঝে ফাঁকা রাখা হয়েছে */}
                    <table className="table w-full border-separate border-spacing-y-4">
                        <thead className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="bg-transparent border-0 pl-6">Image</th>
                                <th className="bg-transparent border-0">Name</th>
                                <th className="bg-transparent border-0">Price</th>
                                <th className="bg-transparent border-0 text-center">Payment Mode</th>
                                <th className="bg-transparent border-0 text-center pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-16">
                                        <div className="flex flex-col items-center opacity-50 text-gray-500 dark:text-gray-400">
                                            <FaBoxOpen className="text-6xl mb-4 text-teal-200 dark:text-teal-900" />
                                            <p className="text-lg">No products found matching "{search}"</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((item) => (
                                    <tr 
                                        key={item._id} 
                                        // Row Styling: Card look, hover shadow, transition
                                        className="group bg-white dark:bg-[#151f32] shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 rounded-xl"
                                    >
                                        <td className="pl-6 py-3 rounded-l-xl border-y border-l border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-700">
                                                    <img src={item.image || "https://via.placeholder.com/50"} alt="Product" />
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="font-bold text-gray-800 dark:text-white text-base">{item.name}</div>
                                            <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded w-fit mt-1">
                                                {item.category || "General"}
                                            </div>
                                        </td>
                                        
                                        <td className="font-bold text-gray-700 dark:text-gray-300 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            ${item.price}
                                        </td>
                                        
                                        <td className="text-center border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <span className={`badge border-0 font-bold text-[10px] uppercase py-3 px-3 tracking-wide text-white shadow-sm ${
                                                item.paymentOption === 'Cash on Delivery' ? 'bg-orange-400' : 'bg-emerald-500'
                                            }`}>
                                                {item.paymentOption}
                                            </span>
                                        </td>
                                        
                                        <td className="pr-6 text-center rounded-r-xl border-y border-r border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link to={`/dashboard/update-product/${item._id}`}>
                                                    <button className="btn btn-sm btn-square btn-ghost text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 tooltip" data-tip="Update">
                                                        <FaEdit className="text-lg" />
                                                    </button>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(item._id)} 
                                                    className="btn btn-sm btn-square btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 tooltip" 
                                                    data-tip="Delete"
                                                >
                                                    <FaTrashAlt className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Manage_Products;