import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit, FaSearch, FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const Manage_Products = () => {
    const { user, loading } = useAuth(); // loading স্টেট চেক করা জরুরি
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');

    // ডিবাগিং লগ (Browser Console এ চেক করো)
    useEffect(() => {
        console.log("--- DEBUGGING MANAGE PRODUCTS ---");
        console.log("User State:", user);
        console.log("User Email:", user?.email);
        console.log("Is Loading:", loading);
    }, [user, loading]);

    const { data: products = [], refetch, isLoading: isQueryLoading, error } = useQuery({
        queryKey: ['my-products', user?.email],
        // ইউজার না থাকলে বা লোডিং অবস্থায় থাকলে কল যাবে না
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            console.log("Fetching Data for:", user.email); // এই লগটা আসলে বুঝবে কল যাচ্ছে
            const res = await axiosSecure.get(`/garments-products/manager/${user.email}`);
            console.log("Data Received:", res.data);
            return res.data;
        }
    });

    // Error থাকলে দেখাবে
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
            cancelButtonColor: '#3085d6',
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

    // Auth Loading অথবা Data Loading হলে স্পিনার দেখাবে
    if (loading || isQueryLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-2">Loading User Data...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 min-h-screen bg-base-200">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-base-content">Manage Products</h2>
                    <p className="text-base-content/60 text-sm mt-1">Total Products: {products.length}</p>
                    {/* ডিবাগ করার জন্য ইমেইল প্রিন্ট */}
                    <p className="text-xs text-red-500 mt-1">Logged in as: {user?.email}</p>
                </div>

                <div className="relative w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="input input-bordered w-full md:w-80 pl-10" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                </div>
            </div>

            <div className="overflow-x-auto shadow-xl rounded-xl border border-base-300 bg-base-100">
                <table className="table bg-base-100 align-middle w-full">
                    <thead className="bg-primary text-white text-sm uppercase font-bold">
                        <tr>
                            <th className="py-4 pl-6">Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th className="text-center pr-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200 text-base-content">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10">
                                    <div className="flex flex-col items-center justify-center text-base-content/50">
                                        <FaBoxOpen className="text-4xl mb-2" />
                                        <p>No products found matching "{search}"</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((item) => (
                                <tr key={item._id} className="hover:bg-base-200/50 transition duration-200">
                                    <td className="pl-6 py-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-14 h-14 bg-base-300">
                                                <img src={item.image || "https://via.placeholder.com/50"} alt="Product" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-base-content">{item.name}</div>
                                        <div className="text-xs opacity-60 bg-base-300 px-2 py-0.5 rounded w-fit mt-1">
                                            {item.category || "General"}
                                        </div>
                                    </td>
                                    <td className="font-semibold text-primary">${item.price}</td>
                                    <td>
                                        <span className={`badge border-0 font-bold text-xs p-3 ${
                                            item.paymentOption === 'Cash on Delivery' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                                        }`}>
                                            {item.paymentOption}
                                        </span>
                                    </td>
                                    <td className="pr-6 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link to={`/dashboard/update-product/${item._id}`}>
                                                <button className="btn btn-sm btn-square btn-ghost text-info tooltip" data-tip="Update">
                                                    <FaEdit className="text-lg" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-square btn-ghost text-error tooltip" data-tip="Delete">
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
    );
};

export default Manage_Products;