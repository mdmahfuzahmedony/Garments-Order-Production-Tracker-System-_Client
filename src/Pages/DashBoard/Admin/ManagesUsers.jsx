import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaSearch, FaFilter, FaUsers } from "react-icons/fa";

const Manage_Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // ১. সব ইউজার লোড করা - লজিক অপরিবর্তিত
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:2001/users", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // ২. ফিল্টারিং এবং সার্চ লজিক - লজিক অপরিবর্তিত
  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter
      ? roleFilter === "user"
        ? user.role === "user" || !user.role
        : user.role === roleFilter
      : true;

    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRole && matchesSearch;
  });

  // ৩. আপডেট ফাংশন - লজিক অপরিবর্তিত
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = form.status.value;
    let role = form.role.value;

    if (status === "suspended") {
      role = "user";
    }

    try {
      const res = await axios.patch(
        `http://localhost:2001/users/update/${selectedUser._id}`,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
        <span className="loading loading-bars loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    // 1. Background: Matched with All_Orders & All_Products
    <div
      className="w-full min-h-screen p-6 font-sans transition-colors duration-300 relative
        bg-gradient-to-br from-gray-50 to-teal-50/30 
        dark:from-[#03131E] dark:to-[#0b1120]"
    >
      {/* Background Texture (Dots) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">
              Administration
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Manage Users{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                ({users.length})
              </span>
            </h2>
          </div>
        </div>

        {/* Search and Filter Section (Styled) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-[#151f32] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          {/* Search Bar */}
          <div className="form-control w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name or Email..."
                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 pl-4 pr-10 focus:outline-none focus:border-teal-500 text-gray-700 dark:text-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-4 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="form-control w-full md:w-1/4">
            <div className="relative">
              <select
                className="select w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 pl-10 focus:outline-none focus:border-teal-500 text-gray-700 dark:text-gray-300"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
              <FaFilter className="absolute left-3 top-3.5 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-4">
            <thead className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="bg-transparent border-0 pl-6">#</th>
                <th className="bg-transparent border-0">Name</th>
                <th className="bg-transparent border-0">Email</th>
                <th className="bg-transparent border-0 text-center">Role</th>
                <th className="bg-transparent border-0 text-center">Status</th>
                <th className="bg-transparent border-0 text-center pr-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="group bg-white dark:bg-[#151f32] shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 rounded-xl"
                  >
                    <th className="rounded-l-xl border-y border-l border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30 pl-6 text-gray-400">
                      {index + 1}
                    </th>

                    <td className="font-bold text-gray-800 dark:text-white border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                      {user.name}
                    </td>

                    <td className="text-gray-500 dark:text-gray-400 border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                      {user.email}
                    </td>

                    <td className="text-center border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                      <span
                        className={`badge border-0 font-bold uppercase text-[10px] py-3 px-3 tracking-wide text-white ${
                          user.role === "admin"
                            ? "bg-purple-500"
                            : user.role === "manager"
                            ? "bg-teal-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    <td className="text-center border-y border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30">
                      <span
                        className={`badge border-0 font-bold uppercase text-[10px] py-3 px-3 tracking-wide text-white ${
                          user.status === "suspended"
                            ? "bg-red-500"
                            : "bg-emerald-500"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>

                    <td className="rounded-r-xl border-y border-r border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30 pr-6 text-center">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          document.getElementById("user_modal").showModal();
                        }}
                        className="btn btn-sm btn-ghost text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center gap-2 mx-auto"
                      >
                        <FaEdit /> Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-16">
                    <div className="flex flex-col items-center opacity-50 text-gray-500 dark:text-gray-400">
                      <FaUsers className="text-6xl mb-4 text-teal-200 dark:text-teal-900" />
                      <p className="text-lg">
                        No users found matching your search.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* User Update Modal (Styled) */}
        <dialog
          id="user_modal"
          className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
        >
          <div className="modal-box bg-white dark:bg-[#151f32] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-2xl">
            <h3 className="font-bold text-xl mb-6 text-center border-b border-gray-100 dark:border-gray-700 pb-4">
              Update User:{" "}
              <span className="text-teal-500">{selectedUser?.name}</span>
            </h3>

            {selectedUser && (
              <form onSubmit={handleUpdateUser} className="space-y-5">
                {/* Status Selector */}
                <div className="form-control w-full">
                  <label className="label pl-0">
                    <span className="label-text font-bold text-gray-700 dark:text-gray-300">
                      Account Status
                    </span>
                  </label>
                  <select
                    name="status"
                    defaultValue={selectedUser.status || "active"}
                    className="select w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 focus:outline-none focus:border-teal-500"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">
                      Suspended (Demote to User)
                    </option>
                  </select>
                </div>

                {/* Role Selector */}
                <div className="form-control w-full">
                  <label className="label pl-0">
                    <span className="label-text font-bold text-gray-700 dark:text-gray-300">
                      Assign Role
                    </span>
                  </label>
                  <select
                    name="role"
                    defaultValue={selectedUser.role || "user"}
                    className="select w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 focus:outline-none focus:border-teal-500"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label className="label pl-0">
                    <span className="label-text-alt text-red-400">
                      *If suspended, role will automatically become 'User'
                    </span>
                  </label>
                </div>

                <div className="modal-action flex justify-between pt-4">
                  <button
                    type="button"
                    className="btn btn-ghost hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() =>
                      document.getElementById("user_modal").close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn border-0 text-white bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 px-8"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          <form method="dialog" className="modal-backdrop">
            <button className="cursor-default">close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Manage_Users;
