import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash, FaUserShield, FaBan } from 'react-icons/fa';

const ManageUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/users');
            return res.data;
        }
    });

    const handleUpdateUser = (user, role, status) => {
        axios.patch(`http://localhost:2001/users/update/${user._id}`, { role, status })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire('Success', `User updated to ${role || status}`, 'success');
                }
            })
    };

    return (
        <div className="w-full p-5">
            <h2 className="text-3xl font-bold mb-5">Manage Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="font-bold uppercase text-primary">{user.role || 'Buyer'}</td>
                                <td>
                                    {user.status === 'suspended' ? 
                                        <span className="badge badge-error text-white">Suspended</span> : 
                                        <span className="badge badge-success text-white">Active</span>
                                    }
                                </td>
                                <td className="flex gap-2">
                                    {/* Make Admin Button */}
                                    <button onClick={() => handleUpdateUser(user, 'admin')} 
                                        className="btn btn-xs btn-primary" disabled={user.role === 'admin'}>
                                        Make Admin
                                    </button>
                                    
                                    {/* Make Manager Button */}
                                    <button onClick={() => handleUpdateUser(user, 'manager')} 
                                        className="btn btn-xs btn-info text-white" disabled={user.role === 'manager'}>
                                        Make Manager
                                    </button>

                                    {/* Suspend Toggle Button */}
                                    {user.status === 'suspended' ? (
                                         <button onClick={() => handleUpdateUser(user, null, 'active')} className="btn btn-xs btn-success text-white">Activate</button>
                                    ) : (
                                        <button onClick={() => handleUpdateUser(user, null, 'suspended')} className="btn btn-xs btn-error text-white">Suspend</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ManageUsers;