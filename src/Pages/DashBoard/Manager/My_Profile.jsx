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
  FaShoppingBag,
  FaPhone,
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
        `https://garments-order-production-tracker-s-hazel.vercel.app/users/${user?.email}`
      );
      return res.data;
    },
  });

  // ২. ম্যানেজার হওয়ার রিকোয়েস্ট হ্যান্ডলার (শুধুমাত্র বায়ারদের জন্য)
  const handleRequestManager = () => {
    Swal.fire({
      title: "Become a Seller?",
      text: "Do you want to apply for a Manager account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://garments-order-production-tracker-s-hazel.vercel.app/users/request-manager/${dbUser._id}`
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
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // রোল অনুযায়ী ব্যাজ কালার
  const roleBadgeColor =
    dbUser?.role === "manager"
      ? "badge-secondary"
      : dbUser?.role === "admin"
      ? "badge-error"
      : "badge-warning";

  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-8">
      {/* --- Header Section (সেই নীল ব্যানার ডিজাইন) --- */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-400 rounded-b-none rounded-t-2xl h-48 mb-20 shadow-lg">
        {/* Role Badge (Top Right) */}
        <div className="absolute top-4 right-4">
          <div
            className={`badge ${roleBadgeColor} badge-lg font-bold uppercase shadow-md p-4 text-white tracking-wider`}
          >
            {dbUser?.role || "Buyer"}
          </div>
        </div>

        {/* Profile Info Area */}
        <div className="absolute -bottom-16 left-6 md:left-10 flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
          {/* Avatar */}
          <div className="avatar online">
            <div className="w-32 md:w-40 rounded-full ring-4 ring-white ring-offset-2 bg-base-100 shadow-2xl">
              <img
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="Profile"
                className="object-cover"
              />
            </div>
          </div>

          {/* Name & Email */}
          <div className="mb-2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mt-2 md:mt-0">
              {user?.displayName}
            </h1>
            <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 text-lg">
              <FaEnvelope className="text-blue-500" /> {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* --- Details Grid Section (Two Columns) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Left Card: Account Details */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h3 className="text-xl font-bold border-b border-gray-400 pb-2 mb-4 flex items-center gap-2 text-gray-700">
              <FaIdBadge className="text-blue-600" /> Account Details
            </h3>
            <div className="space-y-4 text-sm lg:text-base">
              <div className="flex justify-between items-center bg-base-100 p-3 rounded-lg">
                <span className="font-semibold text-gray-500">User ID</span>
                <span className="font-mono text-xs md:text-sm">
                  {dbUser?._id}
                </span>
              </div>
              <div className="flex justify-between items-center bg-base-100 p-3 rounded-lg">
                <span className="font-semibold text-gray-500">Status</span>
                <span className="badge badge-success badge-outline font-bold">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center bg-base-100 p-3 rounded-lg">
                <span className="font-semibold text-gray-500">
                  Member Since
                </span>
                <span>
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Personal Information */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h3 className="text-xl font-bold border-b border-gray-400 pb-2 mb-4 flex items-center gap-2 text-gray-700">
              <FaUser className="text-blue-600" /> Personal Information
            </h3>
            <div className="space-y-4 text-sm lg:text-base">
              <div className="flex items-center gap-3 bg-base-100 p-3 rounded-lg">
                <FaUser className="text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-semibold">{user?.displayName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-base-100 p-3 rounded-lg">
                <FaPhone className="text-green-500" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-semibold">{dbUser?.phone || "Not Set"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-base-100 p-3 rounded-lg">
                <FaMapMarkerAlt className="text-red-500" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="font-semibold italic text-gray-400">
                    Not set yet
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-base-100 p-3 rounded-lg">
                <FaCalendarAlt className="text-orange-500" />
                <div>
                  <p className="text-xs text-gray-500">Last Login</p>
                  <p className="font-semibold">
                    {user?.metadata?.lastSignInTime
                      ? new Date(
                          user.metadata.lastSignInTime
                        ).toLocaleDateString()
                      : "Today"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Actions Area (Only for Buyers/Users) --- */}
      {/* ম্যানেজার হলে এই নিচের সেকশন দেখাবে না, কারণ তাদের অ্যাপ্লাই করার দরকার নেই */}
      {(!dbUser.role || dbUser.role === "user" || dbUser.role === "buyer") && (
        <div className="mt-10">
          <div className="divider">Actions</div>

          <div className="flex justify-center">
            {!dbUser.requestedRole ? (
              <div className="w-full max-w-3xl bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <h4 className="text-lg font-bold text-blue-900">
                    Interested in Selling Products?
                  </h4>
                  <p className="text-sm text-blue-700">
                    Upgrade your account to Manager to access the seller
                    dashboard.
                  </p>
                </div>
                <button
                  onClick={handleRequestManager}
                  className="btn btn-primary px-8 shadow-lg hover:scale-105 transition-transform"
                >
                  Apply for Manager
                </button>
              </div>
            ) : (
              <div className="w-full max-w-3xl bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-center justify-center gap-3 shadow-md">
                <span className="loading loading-ring loading-md text-warning"></span>
                <div>
                  <h4 className="text-lg font-bold text-yellow-800">
                    Application Pending
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Your request to become a Manager is under review.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
