import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router"; // react-router-dom ব্যবহার করুন
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useManager from "../../Hooks/useManager/useManager";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaShoppingCart,
  FaUser,
  FaPlusCircle,
  FaTasks,
  FaSpinner,
  FaCheckDouble,
  FaSignOutAlt,
  FaShippingFast,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);

  // ১. হুক ব্যবহার করে রোল বের করা
  const [isAdmin] = useAdmin();
  const [isManager] = useManager();

  // লগআউট হ্যান্ডলার
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // --- ACTIVE LINK STYLE (Green Background) ---
  // এই ফাংশনটি চেক করবে রুট অ্যাক্টিভ কিনা। অ্যাক্টিভ হলে সবুজ ব্যাকগ্রাউন্ড দিবে।
  const navStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500 text-white font-bold shadow-md transition-all duration-300" // Active Style
      : "flex items-center gap-3 px-4 py-3 rounded-lg text-base-content hover:bg-base-300 hover:text-green-600 transition-all duration-300 font-medium"; // Inactive Style

  let menuItems;

  // ২. কন্ডিশনাল মেনু লজিক
  if (isAdmin) {
    // --- ADMIN MENU ---
    menuItems = (
      <>
        <li>
          <NavLink to="/dashboard/manage-users" className={navStyle}>
            <FaUsers /> Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-products" className={navStyle}>
            <FaBoxOpen /> All Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-orders" className={navStyle}>
            <FaClipboardList /> All Orders
          </NavLink>
        </li>
      </>
    );
  } else if (isManager) {
    // --- MANAGER MENU ---
    menuItems = (
      <>
        <li>
          <NavLink to="/dashboard/add-product" className={navStyle}>
            <FaPlusCircle /> Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manage-products" className={navStyle}>
            <FaTasks /> Manage Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/pending-orders" className={navStyle}>
            <FaSpinner /> Pending Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/approved-orders" className={navStyle}>
            <FaCheckDouble /> Approved Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" className={navStyle}>
            <FaUser /> My Profile
          </NavLink>
        </li>
      </>
    );
  } else {
    // --- USER (BUYER) MENU ---
    menuItems = (
      <>
        <li>
          <NavLink to="/dashboard/my-profile" className={navStyle}>
            <FaUser /> My Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/my-orders" className={navStyle}>
            <FaShoppingCart /> My Orders
          </NavLink>
        </li>

      </>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* --- Main Content Area --- */}
      <div className="drawer-content flex flex-col items-center justify-start bg-base-100 min-h-screen">
        {/* Mobile Menu Button */}
        <div className="w-full lg:hidden p-4 bg-base-200 flex justify-between items-center sticky top-0 z-50 shadow-md">
            <h2 className="font-bold text-lg">Dashboard</h2>
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
        </div>
        
        {/* Outlet Content */}
        <div className="w-full p-5">
           <Outlet />
        </div>
      </div>

      {/* --- Sidebar Area --- */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content flex flex-col justify-between shadow-2xl border-r border-base-300">
          
          {/* Top Section */}
          <div>
            {/* User Profile Info */}
            <div className="flex flex-col items-center justify-center mb-8 mt-4">
               <div className="avatar online mb-3">
                  <div className="w-20 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="User" />
                  </div>
               </div>
               
               <h2 className="font-bold text-xl text-base-content text-center">
                 {user?.displayName || "User"}
               </h2>
               
               <span className="badge badge-outline mt-2 font-bold uppercase text-xs">
                 {isAdmin ? "Admin" : isManager ? "Manager" : "Buyer"}
               </span>
            </div>

            <div className="divider">MENU</div>

            {/* Menu Items */}
            <div className="space-y-2">
                {menuItems}
            </div>
          </div>

          {/* Bottom Section (Home & Logout) */}
          <div className="mt-10">
            <div className="divider"></div>
            <ul className="space-y-2">
                <li>
                <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-base-content hover:bg-base-300 font-medium">
                    <FaHome /> Go Home
                </NavLink>
                </li>
                <li>
                <button
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-700 font-bold transition-all"
                >
                    <FaSignOutAlt /> Logout
                </button>
                </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;