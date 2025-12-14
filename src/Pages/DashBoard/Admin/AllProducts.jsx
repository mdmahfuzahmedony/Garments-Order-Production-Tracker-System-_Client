import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router'; // react-router-dom হবে
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure'; // ১. হুক ইমপোর্ট

const All_Products = () => {
    const axiosSecure = useAxiosSecure(); // ২. হুক কল

    // ১. ডাটা লোড করা (এখানে সাধারণ axios ব্যবহার করতে পারো যদি GET পাবলিক থাকে, 
    // তবে axiosSecure ব্যবহার করা ভালো)
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            // axiosSecure ব্যবহার করা হলো
            const res = await axiosSecure.get('/garments-products');
            return res.data;
        }
    });

    // ২. ডিলিট ফাংশন (Secure Call)
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Product?',
            text: "Are you sure you want to delete this?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // axiosSecure.delete ব্যবহার করা হলো
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

    // ৩. টগল ফাংশন (Secure Call - এটাই তোমার আসল সমস্যা ছিল)
    const handleHomeStatus = (id, currentStatus) => {
        
        // axiosSecure.patch ব্যবহার করা হলো (URL থেকে বেস পাথ বাদ দেওয়া হলো)
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
                refetch(); // আগের অবস্থায় ফেরত নেওয়া
                Swal.fire('Access Denied', 'Please Login as Admin to change this.', 'error');
            });
    };

    if (isLoading) {
        return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full p-6 bg-base-200 min-h-screen text-base-content">
            <h2 className="text-3xl font-bold mb-6">All Products ({products.length})</h2>
            
            <div className="overflow-x-auto shadow-xl rounded-xl bg-base-100">
                <table className="table w-full">
                    <thead className="bg-neutral text-neutral-content uppercase text-sm">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Show on Home</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item._id} className="hover">
                                <th>{index + 1}</th>
                                
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="font-bold">{item.name}</td>
                                <td>${item.price}</td>
                                <td><div className="badge badge-outline">{item.category}</div></td>
                                <td className="text-xs">{item.managerEmail || 'Admin/System'}</td>
                                
                                {/* Toggle Button - এখন এটা কাজ করবে */}
                                <td>
                                    <label className="cursor-pointer label justify-start gap-2">
                                        <input 
                                            type="checkbox" 
                                            className="toggle toggle-success toggle-sm" 
                                            checked={item.showOnHome === true} 
                                            onChange={() => handleHomeStatus(item._id, item.showOnHome)}
                                        />
                                    </label>
                                </td>

                                <td className="flex items-center gap-3 mt-2">
                                    <Link to={`/dashboard/update-product/${item._id}`}>
                                        <button className="btn btn-sm btn-info text-white" title="Update">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                    
                                    <button 
                                        onClick={() => handleDelete(item._id)} 
                                        className="btn btn-sm btn-error text-white"
                                        title="Delete"
                                    >
                                        <FaTrashAlt />
                                    </button>
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