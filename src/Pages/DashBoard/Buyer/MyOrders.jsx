import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaEye, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router'; // 1. Link import করা হলো
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; // পাথ ঠিক করে নিও

const My_Orders = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); 

    const { data: orders = [],  isLoading } = useQuery({
        queryKey: ['my-orders', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    // --- পেমেন্ট লজিক ---
    const handlePay = async (order) => {
        try {
            const res = await axiosSecure.post('/create-checkout-session', {
                productName: order.productName,
                price: order.totalPrice, 
                orderId: order._id,
                image: order.productImage
            });
            if (res.data.url) window.location.replace(res.data.url);
        } catch (error) {
            console.error("Payment Error", error);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center mt-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="w-full p-6 bg-base-200 min-h-screen text-base-content">
            <h2 className="text-3xl font-bold mb-6 text-primary">My Orders ({orders.length})</h2>

            <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="table w-full bg-base-100">
                    <thead className="bg-gray-800 text-white uppercase text-sm">
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-base-200 border-b">
                                    <td className="font-mono text-xs font-bold">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img src={order.productImage} alt="Product" />
                                                </div>
                                            </div>
                                            <div className="font-bold text-sm">{order.productName}</div>
                                        </div>
                                    </td>
                                    <td className="font-bold text-center">{order.quantity}</td>
                                    <td>
                                        <span className={`badge text-white font-bold text-xs p-3 ${
                                            order.status === 'Approved' ? 'badge-success' :
                                            order.status === 'Rejected' ? 'badge-error' :
                                            order.status === 'Shipped' ? 'badge-info' : 'badge-warning'
                                        }`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        {order.paymentStatus === 'Paid' ? (
                                            <div className="badge badge-success text-white font-bold">Paid</div>
                                        ) : (
                                            order.paymentMethod === 'Cash on Delivery' ? 
                                            <span className="text-xs font-bold text-orange-500">COD</span> : 
                                            <button onClick={() => handlePay(order)} className="btn btn-xs btn-success text-white gap-1"><FaCreditCard /> Pay</button>
                                        )}
                                    </td>
                                    
                                    {/* Action Column Update */}
                                    <td className="flex items-center gap-2 mt-2">
                                        {/* 
                                            2. এখানে মডালের বদলে Link ব্যবহার করা হয়েছে।
                                            এটি এখন /dashboard/track-order/:id পেজে নিয়ে যাবে 
                                        */}
                                        <Link 
                                            to={`/dashboard/track-order/${order._id}`}
                                            className="btn btn-sm btn-square btn-ghost text-info tooltip"
                                            data-tip="Track Details"
                                        >
                                            <FaEye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="text-center py-10 opacity-50">No orders placed yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* মডাল কোডটি সম্পূর্ণ মুছে ফেলা হয়েছে কারণ এখন আমরা আলাদা পেজ ব্যবহার করছি */}
        </div>
    );
};

export default My_Orders;