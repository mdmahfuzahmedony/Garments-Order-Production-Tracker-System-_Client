import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaSearch, FaFilter } from "react-icons/fa"; // আইকন ইম্পোর্ট

const Manage_Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // সার্চ এর জন্য স্টেট
  const [roleFilter, setRoleFilter] = useState(""); // রোল ফিল্টার এর জন্য স্টেট

  // ১. সব ইউজার লোড করা (সঠিক কনফিগারেশন সহ)
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // 🔥 FIX: { withCredentials: true } যোগ করা হয়েছে যাতে কুকি পাঠানো হয়
      const res = await axios.get(
        "https://garments-order-production-tracker-s-hazel.vercel.app/users",
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  // ২. ফিল্টারিং এবং সার্চ লজিক
  const filteredUsers = users.filter((user) => {
    // রোল চেক
    const matchesRole = roleFilter
      ? roleFilter === "user"
        ? user.role === "user" || !user.role
        : user.role === roleFilter
      : true;

    // নাম অথবা ইমেইল দিয়ে সার্চ চেক
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRole && matchesSearch;
  });

  // ৩. রোল এবং স্ট্যাটাস আপডেট ফাংশন
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = form.status.value;
    let role = form.role.value;

    // যদি সাসপেন্ড করা হয়, রোল ইউজার করে দেওয়া হবে
    if (status === "suspended") {
      role = "user";
    }

    try {
      // 🔥 FIX: আপডেটের সময়ও { withCredentials: true } দিতে হবে
      const res = await axios.patch(
        `https://garments-order-production-tracker-s-hazel.vercel.app/users/update/${selectedUser._id}`,
        { role, status },
        { withCredentials: true }
      );

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text:
            status === "suspended"
              ? "User has been suspended and demoted to User role."
              : "User info updated successfully.",
        });
        document.getElementById("user_modal").close();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="w-full p-6 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Manage Users ({users.length})
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4  p-4 rounded-xl shadow-sm">
        {/* Search Bar */}
        <div className="form-control w-full md:w-1/2">
          <div className="input-group flex items-center bg-base-100 rounded-lg border pr-2">
            <input
              type="text"
              placeholder="Search by Name or Email..."
              className="input input-ghost w-full focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="text-gray-500" />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="form-control w-full md:w-1/4">
          <div className="flex items-center gap-2 border p-2 rounded-lg ">
            <FaFilter className="text-gray-500" />
            <select
              className="select select-ghost w-full max-w-xs focus:outline-none"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-base-100">
                  <th>{index + 1}</th>
                  <td className="font-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-primary"
                          : user.role === "manager"
                          ? "badge-secondary"
                          : "badge-ghost"
                      } uppercase text-xs font-bold`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "suspended"
                          ? "badge-error"
                          : "badge-success"
                      } text-white uppercase text-xs font-bold`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        document.getElementById("user_modal").showModal();
                      }}
                      className="btn btn-sm btn-info text-white flex items-center gap-2"
                    >
                      <FaEdit /> Manage
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Update Modal */}
      <dialog id="user_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 text-center border-b pb-2">
            Update User:{" "}
            <span className="text-primary">{selectedUser?.name}</span>
          </h3>
          {selectedUser && (
            <form onSubmit={handleUpdateUser}>
              {/* Status Selector */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-bold">Account Status</span>
                </label>
                <select
                  name="status"
                  defaultValue={selectedUser.status || "active"}
                  className="select select-bordered select-warning w-full"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended (Demote to User)</option>
                </select>
              </div>

              {/* Role Selector */}
              <div className="form-control w-full mb-6">
                <label className="label">
                  <span className="label-text font-bold">Assign Role</span>
                </label>
                <select
                  name="role"
                  defaultValue={selectedUser.role || "user"}
                  className="select select-bordered select-info w-full"
                >
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

              <div className="modal-action flex justify-between">
                {/* Close Button Inside Form (as type button) to not submit */}
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => document.getElementById("user_modal").close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-8">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
        {/* Background Click Close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Manage_Users;
