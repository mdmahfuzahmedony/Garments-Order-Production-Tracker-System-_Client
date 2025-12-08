import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { AuthContext } from '../../Provider/Authprovider';
import { FaShoppingCart, FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const menuItems = <>
        {/* User Home */}
        <li>
            <NavLink to="/dashboard/user-home" className={({ isActive }) => isActive ? "active font-bold" : ""}>
                <FaHome /> User Home
            </NavLink>
        </li>

        {/* My Orders */}
        <li>
            <NavLink to="/dashboard/my-orders" className={({ isActive }) => isActive ? "active font-bold" : ""}>
                <FaShoppingCart /> My Orders
            </NavLink>
        </li>

        {/* My Profile */}
        <li>
            <NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? "active font-bold" : ""}>
                <FaUser /> My Profile
            </NavLink>
        </li>

        <div className="divider"></div>

        {/* Back to Home */}
        <li>
            <NavLink to="/">
                <FaHome /> Main Home
            </NavLink>
        </li>
        
        {/* Logout */}
        <li>
            <button onClick={handleLogOut} className="text-error">
                <FaSignOutAlt /> Logout
            </button>
        </li>
    </>;

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            {/* --- RIGHT SIDE CONTENT --- */}
            <div className="drawer-content flex flex-col p-5 bg-base-100">
                {/* Mobile Menu Button */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
                    Open Menu
                </label>
                
                {/* Child Pages Load Here */}
                <Outlet />
            </div> 
            
            {/* --- LEFT SIDEBAR --- */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
                    {/* User Info Header */}
                    <div className="flex flex-col items-center mb-6 pt-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/T0x2y5t/user.png"} alt="User" />
                            </div>
                        </div>
                        <h3 className="font-bold mt-2">{user?.displayName}</h3>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;