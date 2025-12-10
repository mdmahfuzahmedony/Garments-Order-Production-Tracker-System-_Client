import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router'; 
import useAuth from "../../../Hooks/useAuth/useAuth";

const Manage_Products = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState(''); // ১. সার্চ এর জন্য স্টেট

    const { data: products = [], refetch } = useQuery({
        queryKey: ['my-products', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axios.get(`http://localhost:2001/garments-products/manager/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
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

    // ২. প্রোডাক্ট ফিল্টার করার লজিক (নাম দিয়ে খোঁজার জন্য)
    const filteredProducts = products.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full p-6 bg-base-100 shadow-md rounded-lg my-5">
            
            {/* হেডার এবং সার্চ বার সেকশন */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold">
                    My Added Products: <span className="text-primary">{products.length}</span>
                </h2>

                {/* ৩. সার্চ ইনপুট ফিল্ড */}
                <div className="join">
                    <input 
                        type="text" 
                        placeholder="Search by name..." 
                        className="input input-bordered join-item w-full max-w-xs border-primary" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-primary join-item text-white">
                        <FaSearch />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* টেবিল হেডার */}
                    <thead className="bg-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    {/* টেবিল বডি */}
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 font-bold text-gray-500">
                                    No products found matching "{search}"
                                </td>
                            </tr>
                        ) : (
                            // এখানে products.map এর বদলে filteredProducts.map ব্যবহার করা হয়েছে
                            filteredProducts.map((item, index) => (
                                <tr key={item._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Product" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">{item.paymentOption}</span>
                                    </td>
                                    <td className="flex gap-2">
                                        <Link to={`/dashboard/update-product/${item._id}`}>
                                            <button className="btn btn-sm btn-square btn-outline btn-info">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-square btn-outline btn-error">
                                            <FaTrashAlt />
                                        </button>
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