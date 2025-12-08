import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';

const AllProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/garments-products');
            return res.data;
        }
    });

    // Delete Product
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:2001/garments-products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Product has been deleted.", "success");
                        }
                    })
            }
        });
    };

    // Toggle Show on Home
    const handleHomeStatus = (id, currentStatus) => {
        axios.patch(`http://localhost:2001/garments-products/home-status/${id}`, { showOnHome: !currentStatus })
            .then(res => {
                if(res.data.modifiedCount > 0) {
                    refetch();
                    // Optional: Toast notification
                }
            })
    };

    return (
        <div className="w-full p-5">
            <h2 className="text-3xl font-bold mb-5">All Products: {products.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
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
                                            <img src={item.images?.[0]} alt="Product" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.productName}</td>
                                <td>${item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    {/* Checkbox Toggle */}
                                    <input 
                                        type="checkbox" 
                                        className="toggle toggle-success" 
                                        checked={item.showOnHome || false} 
                                        onChange={() => handleHomeStatus(item._id, item.showOnHome)}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-sm text-blue-600"><FaEdit /></button>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-sm text-red-600"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AllProducts;