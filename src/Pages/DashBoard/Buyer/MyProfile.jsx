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
  FaCrown,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

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
            `https://garments-order-production-tracker-s-nu.vercel.app/users/request-manager/${dbUser._id}`
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire("Applied!", "Request sent to Admin.", "success");
            }
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 lg:p-10 bg-base-100 min-h-screen">
      {/* --- Profile Header Card --- */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-base-200">
        {/* Banner / Gradient Background */}
        <div className="h-48 bg-gradient-to-r from-primary to-secondary w-full object-cover"></div>

        {/* Profile Info Wrapper */}
        <div className="px-6 pb-6 relative flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-12 gap-6">
          {/* Avatar Image */}
          <div className="avatar online">
            <div className="w-32 md:w-40 rounded-full ring-4 ring-base-100 bg-base-100 shadow-lg">
              <img
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="Profile"
              />
            </div>
          </div>

          {/* Name & Role */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-base-content flex items-center gap-2 justify-center md:justify-start">
              {user?.displayName}
              {dbUser?.role === "manager" && (
                <FaCrown className="text-yellow-500 text-2xl" title="Manager" />
              )}
            </h1>
            <p className="text-base-content/70 font-medium flex items-center gap-2 justify-center md:justify-start mt-1">
              <FaEnvelope className="text-primary" /> {user?.email}
            </p>
          </div>

          {/* Role Badge */}
          <div className="mt-4 md:mt-0">
            <span className="badge badge-primary badge-lg p-4 font-bold uppercase shadow-md tracking-wider">
              {dbUser?.role || "Buyer"}
            </span>
          </div>
        </div>
      </div>

      {/* --- Details Grid Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Account Info Card */}
        <div className="card bg-base-200 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <h3 className="card-title text-base-content border-b border-base-content/10 pb-2 mb-2">
              <FaIdBadge className="text-secondary" /> Account Details
            </h3>
            <div className="space-y-4 text-base-content/80">
              <div className="flex justify-between items-center">
                <span className="font-semibold">User ID:</span>
                <span className="font-mono bg-base-300 px-2 py-1 rounded text-xs">
                  {dbUser?._id}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Status:</span>
                <span className="badge badge-success text-white">Active</span>
              </div>
              <div className="flex justify-between items-center">
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

        {/* Personal Info / Activity Card */}
        <div className="card bg-base-200 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <h3 className="card-title text-base-content border-b border-base-content/10 pb-2 mb-2">
              <FaUser className="text-accent" /> Personal Information
            </h3>
            <div className="space-y-4 text-base-content/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/30">
                  <FaShoppingBag className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Total Orders</p>
                  <p className="text-xs opacity-70">Check My Orders page</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900/30">
                  <FaMapMarkerAlt className="text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Address</p>
                  <p className="text-xs opacity-70 italic">Not set yet</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
                  <FaCalendarAlt className="text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Last Login</p>
                  <p className="text-xs opacity-70">
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

      {/* --- Action Section (Manager Request) --- */}
      <div className="mt-10 mb-10">
        {(!dbUser.role || dbUser.role === "user" || dbUser.role === "buyer") &&
          !dbUser.requestedRole && (
            <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-base-300 dark:to-base-200 border border-blue-100 dark:border-base-content/10 shadow-lg">
              <div className="card-body flex-row items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="card-title text-primary">
                    Interested in Selling?
                  </h2>
                  <p className="text-base-content/70 text-sm">
                    Upgrade your account to Manager to start your business.
                  </p>
                </div>
                <button
                  onClick={handleRequestManager}
                  className="btn btn-primary text-white shadow-lg hover:shadow-primary/50"
                >
                  Apply for Manager
                </button>
              </div>
            </div>
          )}

        {dbUser.requestedRole === "manager" && (
          <div className="alert alert-warning shadow-lg mt-6">
            <span className="loading loading-ring loading-md"></span>
            <div>
              <h3 className="font-bold">Application Pending</h3>
              <div className="text-xs">
                Admin is reviewing your request to become a Manager.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
