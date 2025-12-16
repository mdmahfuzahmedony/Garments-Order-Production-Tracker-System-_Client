import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit, FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router'; 
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure'; 

const All_Products = () => {
    const axiosSecure = useAxiosSecure(); 

    // ১. ডাটা লোড - লজিক অপরিবর্তিত
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/garments-products');
            return res.data;
        }
    });

    // ২. ডিলিট ফাংশন - লজিক অপরিবর্তিত
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Product?',
            text: "Are you sure you want to delete this?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#14b8a6', // Teal Color for Cancel
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/garments-products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire('Deleted!', 'Product has been removed.', 'success');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Error', 'You are not authorized to delete.', 'error');
                    });
            }
        });
    };

    // ৩. টগল ফাংশন - লজিক অপরিবর্তিত
    const handleHomeStatus = (id, currentStatus) => {
        axiosSecure.patch(`/garments-products/home-status/${id}`, { showOnHome: !currentStatus })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: !currentStatus ? 'Shown on Home Page' : 'Removed from Home Page',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error(err);
                refetch();
                Swal.fire('Access Denied', 'Please Login as Admin to change this.', 'error');
            });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
                <span className="loading loading-bars loading-lg text-teal-500"></span>
            </div>
        );
    }

    return (
        // 1. Background: Matched with All_Orders (Gradient & Texture)
        <div className="w-full min-h-screen p-6 font-sans transition-colors duration-300 relative
            bg-gradient-to-br from-gray-50 to-teal-50/30 
            dark:from-[#03131E] dark:to-[#0b1120]">
            
            {/* Background Texture (Dots) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">Inventory</p>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        All Products <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">({products.length})</span>
                    </h2>
                </div>
                
                {/* Table Section */}
                <div className="overflow-x-auto">
                    {/* border-separate এবং border-spacing-y-4 ব্যবহার করে রো এর মাঝে ফাঁকা রাখা হয়েছে */}
                    <table className="table w-full border-separate border-spacing-y-4">
                        <thead className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="bg-transparent border-0 pl-6">#</th>
                                <th className="bg-transparent border-0">Image</th>
                                <th className="bg-transparent border-0">Product Name</th>
                                <th className="bg-transparent border-0">Price</th>
                                <th className="bg-transparent border-0">Category</th>
                                <th className="bg-transparent border-0">Created By</th>
                                <th className="bg-transparent border-0 text-center">Home Status</th>
                                <th className="bg-transparent border-0 text-center pr-6">Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-16">
                                        <div className="flex flex-col items-center opacity-50 text-gray-500 dark:text-gray-400">
                                            <FaBoxOpen className="text-6xl mb-4 text-teal-200 dark:text-teal-900" />
                                            <p className="text-lg">No products found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((item, index) => (
                                    <tr 
                                        key={item._id} 
                                        // Row Styling: Card look, hover shadow, transition
                                        className="group bg-white dark:bg-[#151f32] shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 rounded-xl"
                                    >
                                        <th className="rounded-l-xl border-y border-l border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30 pl-6 text-gray-400">
                                            {index + 1}
                                        </th>
                                        
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12 ring-1 ring-gray-100 dark:ring-gray-700">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="font-bold text-gray-800 dark:text-white border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            {item.name}
                                        </td>
                                        
                                        <td className="font-mono font-bold text-teal-600 dark:text-teal-400 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            ${item.price}
                                        </td>
                                        
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            <div className="badge border-0 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
                                                {item.category}
                                            </div>
                                        </td>
                                        
                                        <td className="text-xs text-gray-400 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                                            {item.managerEmail || 'Admin/System'}
                                        </td>
                                        
                                        {/* Toggle Button */}
                                        <td className="border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30 text-center">
                                            <div className="flex justify-center">
                                                <input 
                                                    type="checkbox" 
                                                    className="toggle toggle-sm hover:toggle-accent checked:bg-teal-500 checked:border-teal-500" 
                                                    checked={item.showOnHome === true} 
                                                    onChange={() => handleHomeStatus(item._id, item.showOnHome)}
                                                />
                                            </div>
                                        </td>

                                        <td className="rounded-r-xl border-y border-r border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30 pr-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link to={`/dashboard/update-product/${item._id}`}>
                                                    <button className="btn btn-sm btn-square btn-ghost text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 tooltip" data-tip="Update">
                                                        <FaEdit size={16} />
                                                    </button>
                                                </Link>
                                                
                                                <button 
                                                    onClick={() => handleDelete(item._id)} 
                                                    className="btn btn-sm btn-square btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 tooltip"
                                                    data-tip="Delete"
                                                >
                                                    <FaTrashAlt size={16} />
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

export default All_Products;