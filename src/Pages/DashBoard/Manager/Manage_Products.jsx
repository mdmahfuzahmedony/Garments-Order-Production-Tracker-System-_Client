import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit, FaSearch, FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router'; // Link fixed
import useAuth from "../../../Hooks/useAuth/useAuth";

const Manage_Products = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['my-products', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axios.get(`http://localhost:2001/garments-products/manager/${user.email}`);
            return res.data;
        }
    });

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
                axios.delete(`http://localhost:2001/garments-products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                        }
                    });
            }
        });
    };

    // Filter Logic: Name or Category
    const filteredProducts = products.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.category?.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 min-h-screen bg-base-200">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-base-content">Manage Products</h2>
                    <p className="text-base-content/60 text-sm mt-1">Total Products: {products.length}</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search by name or category..." 
                        className="input input-bordered w-full md:w-80 pl-10 bg-base-100 text-base-content focus:border-primary" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                </div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto shadow-xl rounded-xl border border-base-300 bg-base-100">
                <table className="table bg-base-100 align-middle w-full">
                    {/* --- Table Head (Requirement Met) --- */}
                    <thead className="bg-primary text-white text-sm uppercase font-bold">
                        <tr>
                            <th className="py-4 pl-6">Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th className="text-center pr-6">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* --- Table Body --- */}
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
                                    
                                    {/* 1. Image */}
                                    <td className="pl-6 py-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-14 h-14 bg-base-300">
                                                <img src={item.image || "https://via.placeholder.com/50"} alt="Product" />
                                            </div>
                                        </div>
                                    </td>

                                    {/* 2. Name & Category */}
                                    <td>
                                        <div className="font-bold text-base-content">{item.name}</div>
                                        <div className="text-xs opacity-60 bg-base-300 px-2 py-0.5 rounded w-fit mt-1">
                                            {item.category || "General"}
                                        </div>
                                    </td>

                                    {/* 3. Price */}
                                    <td className="font-semibold text-primary">
                                        ${item.price}
                                    </td>

                                    {/* 4. Payment Mode */}
                                    <td>
                                        <span className={`badge border-0 font-bold text-xs p-3 ${
                                            item.paymentOption === 'Cash on Delivery' 
                                            ? 'bg-secondary/10 text-secondary' 
                                            : 'bg-accent/10 text-accent'
                                        }`}>
                                            {item.paymentOption}
                                        </span>
                                    </td>

                                    {/* 5. Actions */}
                                    <td className="pr-6 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Update Button */}
                                            <Link to={`/dashboard/update-product/${item._id}`}>
                                                <button className="btn btn-sm btn-square btn-ghost text-info tooltip" data-tip="Update">
                                                    <FaEdit className="text-lg" />
                                                </button>
                                            </Link>
                                            
                                            {/* Delete Button */}
                                            <button 
                                                onClick={() => handleDelete(item._id)} 
                                                className="btn btn-sm btn-square btn-ghost text-error tooltip" 
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
    );
};

export default Manage_Products;