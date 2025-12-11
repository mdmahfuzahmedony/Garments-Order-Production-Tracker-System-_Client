import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../../Provider/";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useManager from "../../Hooks/useManager/useManager"; // আপনার useManager হুকটি ইম্পোর্ট করুন
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
  const [isManager] = useManager(); // হুকটি এনাবল করা হলো

  // লগআউট হ্যান্ডলার
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  let menuItems;

  // ২. কন্ডিশনাল মেনু লজিক
  if (isAdmin) {
    // --- ADMIN MENU ---
    menuItems = (
      <>
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
    // --- MANAGER MENU (Requirement 10-15) ---
    menuItems = (
      <>
        {/* 11. Add Product Page */}
        <li>
          <NavLink to="/dashboard/add-product">
            <FaPlusCircle /> Add Product
          </NavLink>
        </li>

        {/* 12. Manage Products */}
        <li>
          <NavLink to="/dashboard/manage-products">
            <FaTasks /> Manage Products
          </NavLink>
        </li>

        {/* 13. Pending Orders */}
        <li>
          <NavLink to="/dashboard/pending-orders">
            <FaSpinner /> Pending Orders
          </NavLink>
        </li>

        {/* 14. Approved Orders */}
        <li>
          <NavLink to="/dashboard/approved-orders">
            <FaCheckDouble /> Approved Orders
          </NavLink>
        </li>

        {/* 15. My Profile */}
        <li>
          <NavLink to="/dashboard/profile">
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
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
          <div>
            {/* User Profile Info Heading */}
            <div className="text-center mb-6 mt-4 mb-2">
              <h2 className="font-bold text-xl text-primary">
                {isAdmin
                  ? "Admin Panel"
                  : isManager
                  ? "Manager Panel"
                  : "User Dashboard"}
              </h2>
              {user?.displayName && (
                <p className="text-sm bg-gray-600 py-2 mt-1">
                  {user.displayName}
                </p>
              )}
            </div>

            {/* ডায়নামিক মেনু রেন্ডার */}
            {menuItems}
          </div>

          {/* Shared Links & Logout */}
          <div>
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="text-red-500 hover:bg-red-100"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
