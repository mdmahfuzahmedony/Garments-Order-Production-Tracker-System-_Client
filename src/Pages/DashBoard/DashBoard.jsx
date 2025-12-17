import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router"; 
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

  // --- ACTIVE LINK STYLE (Matching your Screenshot) ---
  const navStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/20 transition-all duration-300 transform scale-105" // Active: Bright Green
      : "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#151f32] hover:text-emerald-400 transition-all duration-300 font-medium"; // Inactive: Gray text, dark hover

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
      
      {/* --- Main Content Area (Background matched to #03131E) --- */}
      <div className="drawer-content flex flex-col items-center justify-start bg-[#03131E] min-h-screen">
        
        {/* Mobile Menu Button */}
        <div className="w-full lg:hidden p-4 bg-[#0b1120] border-b border-gray-800 flex justify-between items-center sticky top-0 z-50 shadow-md">
          
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
        </div>
        
        {/* Outlet Content */}
        <div className="w-full p-0"> {/* Padding 0 to let child components handle spacing */}
           <Outlet />
        </div>
      </div>

      {/* --- Sidebar Area (Darker Shade #0b1120) --- */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        
        <ul className="menu p-4 w-72 min-h-full bg-[#0b1120] text-gray-300 flex flex-col justify-between shadow-2xl border-r border-gray-800">
          
          {/* Top Section */}
          <div>
            {/* Logo Area */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-extrabold text-white tracking-wide">Tex<span className="text-emerald-500">Track</span></h1>
            </div>

            {/* User Profile Info */}
            <div className="flex flex-col items-center justify-center mb-8 p-4 bg-[#151f32] rounded-xl border border-gray-800">
               <div className="avatar online mb-3">
                  <div className="w-16 rounded-full ring ring-emerald-500 ring-offset-[#0b1120] ring-offset-2">
                    <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="User" />
                  </div>
               </div>
               
               <h2 className="font-bold text-lg text-white text-center">
                 {user?.displayName || "User"}
               </h2>
               
               <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">
                 {isAdmin ? "Admin" : isManager ? "Manager" : "Buyer"}
               </span>
            </div>

            <div className="divider divider-success opacity-20 my-4">MENU</div>

            {/* Menu Items */}
            <div className="space-y-2">
                {menuItems}
            </div>
          </div>

          {/* Bottom Section (Home & Logout) */}
          <div className="mt-10">
            <div className="divider divider-success opacity-20"></div>
            <ul className="space-y-2">
                <li>
                <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#151f32] hover:text-white font-medium transition-all">
                    <FaHome /> Go Home
                </NavLink>
                </li>
                <li>
                <button
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 font-bold transition-all"
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