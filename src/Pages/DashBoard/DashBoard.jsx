import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../../Provider/Authprovider";
import useAdmin from "../../Hooks/useAdmin/useAdmin"; // হুক ইম্পোর্ট
// import useManager from '../../hooks/useManager'; // হুক ইম্পোর্ট
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);

  // ১. হুক ব্যবহার করে রোল বের করা
  const [isAdmin] = useAdmin();
  // const [isManager] = useManager();
  const isManager = false; // আপাতত হার্ডকোড (টেস্টিংয়ের জন্য)

  let menuItems;

  // ২. কন্ডিশনাল মেনু লজিক
  if (isAdmin) {
    // --- ADMIN MENU ---
    menuItems = (
      <>
        <li>
         
        </li>
        <li>
          <NavLink to="/dashboard/manage-users">
            <FaUsers /> Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-products">
            <FaBoxOpen /> All Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-orders">
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
          <NavLink to="/dashboard/manager-home">
            <FaHome /> Manager Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-products">
            <FaBoxOpen /> Manage Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-orders">
            <FaClipboardList /> Manage Orders
          </NavLink>
        </li>
      </>
    );
  } else {
    // --- USER (BUYER) MENU ---
    menuItems = (
      <>
        <li>
          <NavLink to="/dashboard/user-home">
            <FaHome /> User Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/my-orders">
            <FaShoppingCart /> My Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/my-profile">
            <FaUser /> My Profile
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-5 bg-base-100">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Menu
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
          {/* User Profile Info */}
          <div className="text-center mb-6">
            <h2 className="font-bold text-xl">
              {isAdmin
                ? "Admin Panel"
                : isManager
                ? "Manager Panel"
                : "User Dashboard"}
            </h2>
          </div>
          {/* মেনু রেন্ডার হবে এখানে */}
          {menuItems}
      
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
