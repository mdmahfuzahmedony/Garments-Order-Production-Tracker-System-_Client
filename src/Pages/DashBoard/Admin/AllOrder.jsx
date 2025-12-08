import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllOrders = () => {
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/all-orders');
            return res.data;
        }
    });

    const handleStatusChange = (id, newStatus) => {
        axios.patch(`http://localhost:2001/bookings/status/${id}`, { status: newStatus })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire('Updated', `Order status changed to ${newStatus}`, 'success');
                }
            })
    };

    return (
        <div className="w-full p-5">
            <h2 className="text-3xl font-bold mb-5">Manage All Orders: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Email</th>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td className="text-xs">{order.userEmail}</td>
                                <td>{order.productName}</td>
                                <td className="font-bold">{order.quantity}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    <span className={`badge ${
                                        order.status === 'Approved' ? 'badge-success text-white' : 
                                        order.status === 'Rejected' ? 'badge-error text-white' : 'badge-warning'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select 
                                        className="select select-bordered select-xs"
                                        defaultValue={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AllOrders;