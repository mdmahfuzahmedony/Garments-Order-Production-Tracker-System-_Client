import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router';

const All_Products = () => {
    // ১. সব প্রোডাক্ট লোড
    const { data: products = [], refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/garments-products');
            return res.data;
        }
    });

    // ২. ডিলিট ফাংশন
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Product?',
            text: "This action cannot be undone!",
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
                            Swal.fire('Deleted!', 'Product removed.', 'success');
                        }
                    });
            }
        });
    };

    // ৩. Show on Home টগল ফাংশন
    const handleHomeStatus = (id, currentStatus) => {
        axios.patch(`http://localhost:2001/garments-products/home-status/${id}`, { showOnHome: !currentStatus })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    const msg = !currentStatus ? 'Added to Home Page' : 'Removed from Home Page';
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: msg,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className="w-full p-6 bg-base-200 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-primary">All Products ({products.length})</h2>
            <div className="overflow-x-auto  shadow-xl rounded-xl">
                <table className="table w-full">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Show on Home</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Product" />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{item.name}</td>
                                <td>${item.price}</td>
                                <td><div className="badge badge-outline">{item.category || 'N/A'}</div></td>
                                <td className="text-xs">{item.managerEmail || 'Admin'}</td>
                                
                                {/* Toggle Checkbox */}
                                <td>
                                    <label className="cursor-pointer label">
                                        <input 
                                            type="checkbox" 
                                            className="toggle toggle-primary" 
                                            checked={item.showOnHome || false}
                                            onChange={() => handleHomeStatus(item._id, item.showOnHome)}
                                        />
                                    </label>
                                </td>

                                <td className="flex gap-2 items-center mt-2">
                                    <Link to={`/dashboard/update-product/${item._id}`}>
                                        <button className="btn btn-sm btn-ghost bg-blue-500 text-white"><FaEdit /></button>
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-ghost bg-red-500 text-white"><FaTrashAlt /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default All_Products;