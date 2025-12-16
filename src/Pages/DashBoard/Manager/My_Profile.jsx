import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaCrown,
  FaBriefcase,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  // ১. ডাটাবেস থেকে ইউজারের বিস্তারিত তথ্য আনা
  const {
    data: dbUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://garments-order-production-tracker-s-nu.vercel.app/users/${user?.email}`
      );
      return res.data;
    },
  });

  // ২. ম্যানেজার হওয়ার রিকোয়েস্ট হ্যান্ডলার
  const handleRequestManager = () => {
    Swal.fire({
      title: "Become a Seller?",
      text: "Do you want to apply for a Manager account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6", // Teal Color
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://garments-order-production-tracker-s-nu.vercel.app/users/request-manager/${dbUser._id}`
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Applied!",
                "Your request has been sent to Admin.",
                "success"
              );
            }
          });
      }
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
    // 1. Background: Matched with other pages (Gradient & Texture)
    <div className="w-full min-h-screen p-6 font-sans transition-colors duration-300 relative
        bg-gradient-to-br from-gray-50 to-teal-50/30 
        dark:from-[#03131E] dark:to-[#0b1120]">
        
        {/* Background Texture (Dots) */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
            
            {/* Header Text */}
            <div className="mb-8">
                <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">My Account</p>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Profile <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Overview</span>
                </h2>
            </div>

            {/* --- Profile Header Card --- */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-[#151f32] border border-gray-100 dark:border-gray-800 transition-all duration-300 mb-8">
                {/* Banner / Gradient Background */}
                <div className="h-48 bg-gradient-to-r from-teal-400 to-emerald-500 w-full object-cover"></div>

                {/* Profile Info Wrapper */}
                <div className="px-6 pb-6 relative flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-12 gap-6">
                    {/* Avatar Image */}
                    <div className="avatar online">
                        <div className="w-32 md:w-40 rounded-full ring-4 ring-white dark:ring-[#151f32] bg-base-100 shadow-lg">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                                alt="Profile"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
                            {user?.displayName}
                            {dbUser?.role === "manager" && (
                                <FaCrown className="text-yellow-400 text-2xl drop-shadow-sm" title="Manager" />
                            )}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 justify-center md:justify-start mt-1">
                            <FaEnvelope className="text-teal-500" /> {user?.email}
                        </p>
                    </div>

                    {/* Role Badge */}
                    <div className="mt-4 md:mt-0">
                        <span className={`badge border-0 p-4 font-bold uppercase shadow-sm tracking-wider ${
                            dbUser?.role === "manager" ? "bg-teal-500 text-white" :
                            dbUser?.role === "admin" ? "bg-purple-500 text-white" :
                            "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400"
                        }`}>
                            {dbUser?.role || "Buyer"}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- Details Grid Section (Two Columns) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Card: Account Details */}
                <div className="card bg-white dark:bg-[#151f32] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="card-body">
                        <h3 className="card-title text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3 mb-2 text-lg">
                            <FaIdBadge className="text-teal-500" /> Account Details
                        </h3>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                            <div className="flex justify-between items-center bg-gray-50 dark:bg-[#0b1120] p-3 rounded-lg">
                                <span className="font-semibold">User ID:</span>
                                <span className="font-mono text-xs opacity-70">
                                    {dbUser?._id}
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 dark:bg-[#0b1120] p-3 rounded-lg">
                                <span className="font-semibold">Status:</span>
                                <span className="badge bg-emerald-500 border-0 text-white font-bold text-xs">Active</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 dark:bg-[#0b1120] p-3 rounded-lg">
                                <span className="font-semibold">Member Since:</span>
                                <span className="font-medium">
                                    {user?.metadata?.creationTime
                                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                                        : "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Card: Personal Information */}
                <div className="card bg-white dark:bg-[#151f32] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="card-body">
                        <h3 className="card-title text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3 mb-2 text-lg">
                            <FaUser className="text-teal-500" /> Personal Information
                        </h3>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                            <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#0b1120] p-3 rounded-lg">
                                <FaUser className="text-purple-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="font-semibold">{user?.displayName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#0b1120] p-3 rounded-lg">
                                <FaPhone className="text-green-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                                    <p className="font-semibold">{dbUser?.phone || "Not Set"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#0b1120] p-3 rounded-lg">
                                <FaMapMarkerAlt className="text-red-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                                    <p className="font-semibold italic opacity-70">Not set yet</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#0b1120] p-3 rounded-lg">
                                <FaCalendarAlt className="text-orange-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Last Login</p>
                                    <p className="font-semibold">
                                        {user?.metadata?.lastSignInTime
                                            ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                                            : "Today"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Action Section (Only for Buyers/Users) --- */}
            {(!dbUser.role || dbUser.role === "user" || dbUser.role === "buyer") && (
                <div className="mt-10 mb-10">
                    {!dbUser.requestedRole ? (
                        <div className="card bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-[#151f32] dark:to-[#0b1120] border border-teal-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                            <div className="card-body flex-row items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
                                        <FaBriefcase size={24} />
                                    </div>
                                    <div>
                                        <h2 className="card-title text-gray-800 dark:text-white">
                                            Interested in Selling?
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Upgrade your account to Manager to start your business.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleRequestManager}
                                    className="btn border-0 text-white font-bold bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg hover:shadow-teal-500/30 transition-all px-8"
                                >
                                    Apply for Manager
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="alert bg-orange-50 border border-orange-200 dark:bg-orange-900/10 dark:border-orange-900/30 shadow-sm mt-6 flex items-start">
                            <span className="loading loading-ring loading-md text-orange-500"></span>
                            <div>
                                <h3 className="font-bold text-orange-700 dark:text-orange-400">Application Pending</h3>
                                <div className="text-xs text-orange-600 dark:text-orange-300/70">
                                    Your request to become a Manager is under review by Admin.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default MyProfile;