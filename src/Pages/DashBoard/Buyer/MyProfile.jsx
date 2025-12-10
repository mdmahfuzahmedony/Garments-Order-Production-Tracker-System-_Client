import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/Authprovider"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUser, FaEnvelope, FaIdBadge, FaCalendarAlt, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  // ১. ডাটাবেস থেকে ইউজারের বিস্তারিত তথ্য আনা
  const { data: dbUser = {}, refetch, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:2001/users/${user?.email}`);
      return res.data;
    },
  });

  // ২. ম্যানেজার হওয়ার রিকোয়েস্ট হ্যান্ডলার
  const handleRequestManager = () => {
    Swal.fire({
      title: "Become a Seller?",
      text: "Do you want to apply for a Manager account to sell products?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:2001/users/request-manager/${dbUser._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch(); // ডাটা রিফ্রেশ যাতে বাটন চেঞ্জ হয়
              Swal.fire("Applied!", "Your request has been sent to Admin.", "success");
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

  return (
    <div className="w-full max-w-5xl mx-auto p-4 lg:p-10 bg-base-100 rounded-2xl shadow-xl mt-5">
      
      {/* --- Header Section (Gradient Background) --- */}
      <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl h-40 mb-16">
        <div className="absolute -bottom-12 left-10 flex items-end gap-6">
          <div className="avatar online">
            <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2 bg-white">
              <img 
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                alt="Profile" 
              />
            </div>
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-10 lg:mt-0">
              {user?.displayName}
            </h1>
            <p className="text-gray-600 font-medium flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> {user?.email}
            </p>
          </div>
        </div>
        
        {/* Role Badge */}
        <div className="absolute top-4 right-4">
            <div className="badge badge-lg badge-warning font-bold uppercase shadow-md p-3">
                {dbUser?.role || "Buyer"}
            </div>
        </div>
      </div>

      {/* --- Details Grid Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
        
        {/* Account Info Card */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body">
                <h3 className="card-title border-b pb-2 mb-2 text-gray-700">
                    <FaIdBadge className="text-primary"/> Account Details
                </h3>
                <div className="space-y-3 text-sm lg:text-base">
                    <p className="flex justify-between">
                        <span className="font-semibold text-gray-500">User ID:</span> 
                        <span className="font-mono">{dbUser?._id?.slice(0, 10)}...</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-semibold text-gray-500">Status:</span> 
                        <span className="text-green-600 font-bold bg-green-100 px-2 rounded-md">Active</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-semibold text-gray-500">Member Since:</span> 
                        <span>{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}</span>
                    </p>
                </div>
            </div>
        </div>

        {/* Activity / Personal Info Card */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body">
                <h3 className="card-title border-b pb-2 mb-2 text-gray-700">
                    <FaUser className="text-primary"/> Personal Information
                </h3>
                <div className="space-y-3 text-sm lg:text-base">
                    <p className="flex items-center gap-3">
                        <FaShoppingBag className="text-orange-500"/>
                        <span className="font-semibold text-gray-500">Total Orders:</span> 
                        <span className="font-bold">Check My Orders</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-red-500"/>
                        <span className="font-semibold text-gray-500">Address:</span> 
                        <span className="italic text-gray-400">Not set yet</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <FaCalendarAlt className="text-purple-500"/>
                        <span className="font-semibold text-gray-500">Last Login:</span> 
                        <span>{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "Today"}</span>
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* --- Action Section (Apply for Manager) --- */}
      <div className="mt-10">
        <div className="divider">Actions</div>
        
        <div className="flex justify-center">
            {/* Condition 1: User has NOT requested yet */}
            {(!dbUser.role || dbUser.role === 'user' || dbUser.role === 'buyer') && !dbUser.requestedRole && (
                <div className="w-full max-w-2xl bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h4 className="text-lg font-bold text-blue-800">Interested in Selling?</h4>
                        <p className="text-sm text-blue-600">Upgrade your account to Manager to add and manage products.</p>
                    </div>
                    <button 
                        onClick={handleRequestManager} 
                        className="btn btn-primary px-8 shadow-lg hover:scale-105 transition-transform"
                    >
                        Apply for Manager
                    </button>
                </div>
            )}

            {/* Condition 2: User HAS requested (Pending) */}
            {dbUser.requestedRole === 'manager' && (
                <div className="w-full max-w-2xl bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-center justify-center gap-3">
                    <span className="loading loading-ring loading-md text-warning"></span>
                    <div>
                        <h4 className="text-lg font-bold text-yellow-800">Application Pending</h4>
                        <p className="text-sm text-yellow-600">Admin is reviewing your request to become a Manager.</p>
                    </div>
                </div>
            )}
        </div>
      </div>

    </div>
  );
};

export default MyProfile;