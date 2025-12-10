import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';

const Manage_Users = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    // ১. সব ইউজার লোড করা
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/users');
            return res.data;
        }
    });

    // ২. রোল এবং স্ট্যাটাস আপডেট ফাংশন
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const form = e.target;
        const status = form.status.value;
        let role = form.role.value;

        // Frontend Logic: যদি সাসপেন্ড সিলেক্ট করা হয়, রোল অটোমেটিক 'user' হিসেবে যাবে
        if (status === 'suspended') {
            role = 'user';
        }

        try {
            const res = await axios.patch(`http://localhost:2001/users/update/${selectedUser._id}`, { role, status });
            
            if (res.data.modifiedCount > 0) {
                refetch(); // ডাটা রিফ্রেশ হবে, ফলে টেবিলে রোল 'user' দেখাবে
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: status === 'suspended' ? 'User has been suspended and demoted to User role.' : 'User info updated successfully.'
                });
                document.getElementById('user_modal').close();
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="w-full p-6 bg-base-200 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-primary">Manage Users ({users.length})</h2>
            
            <div className="overflow-x-auto shadow-xl rounded-xl ">
                <table className="table my-2 w-full">
                    <thead className="bg-gray-700 text-white">
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
                                <td className="font-bold">{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${
                                        user.role === 'admin' ? 'badge-primary' : 
                                        user.role === 'manager' ? 'badge-secondary' : 'badge-ghost'
                                    }`}>
                                        {user.role || 'user'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${user.status === 'suspended' ? 'badge-error' : 'badge-success'} text-white`}>
                                        {user.status || 'active'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => {
                                            setSelectedUser(user);
                                            document.getElementById('user_modal').showModal();
                                        }}
                                        className="btn btn-sm btn-info text-white"
                                    >
                                        <FaEdit /> Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* User Update Modal */}
            <dialog id="user_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Update User: {selectedUser?.name}</h3>
                    {selectedUser && (
                        <form onSubmit={handleUpdateUser}>
                            
                            {/* Status Selector */}
                            <div className="form-control w-full mb-4">
                                <label className="label"><span className="label-text font-bold">Account Status</span></label>
                                <select name="status" defaultValue={selectedUser.status || 'active'} className="select select-bordered select-warning">
                                    <option value="active">Active</option>
                                    <option value="suspended">Suspended (Demote to User)</option>
                                </select>
                            </div>

                            {/* Role Selector */}
                            <div className="form-control w-full mb-6">
                                <label className="label"><span className="label-text font-bold">Assign Role</span></label>
                                <select name="role" defaultValue={selectedUser.role} className="select select-bordered select-info">
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <label className="label">
                                    <span className="label-text-alt text-red-500">
                                        *If suspended, role will automatically become 'User'
                                    </span>
                                </label>
                            </div>

                            <button className="btn btn-primary w-full">Save Changes</button>
                        </form>
                    )}
                    <div className="modal-action">
                        <form method="dialog"><button className="btn">Close</button></form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Manage_Users;