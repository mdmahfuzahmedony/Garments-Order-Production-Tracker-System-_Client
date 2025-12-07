import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/Authprovider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('User logged out successfully'))
            .catch(error => console.error(error));
    };

    // মেনু আইটেম (Home, All Products, About, Contact - এখন সবার জন্য ওপেন)
    const navOptions = <>
        <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/garments-products" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>
                All Products
            </NavLink>
        </li>
        <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>
                About Us
            </NavLink>
        </li>
        <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>
                Contact
            </NavLink>
        </li>

        {/* শুধুমাত্র লগইন করা থাকলে Dashboard দেখাবে */}
        {user && (
            <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>
                    Dashboard
                </NavLink>
            </li>
        )}
    </>;

    return (
        <div className="navbar bg-base-100 dark:bg-gray-900 shadow-md px-4 sticky top-0 z-50">
            
            {/* বাম পাশ: লোগো এবং মোবাইল মেনু */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-gray-700 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52 text-gray-700 dark:text-gray-200">
                        {navOptions}
                        
                        {/* মোবাইলের জন্য বাটন */}
                        {!user && (
                            <div className="flex flex-col gap-2 mt-2">
                                <Link to="/login" className="btn btn-sm btn-ghost">Login</Link>
                                <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                            </div>
                        )}
                        {user && (
                            <li className='mt-2'>
                                <button onClick={handleLogOut} className="btn btn-sm btn-error text-white">Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-blue-600 dark:text-blue-400">
                    Garments<span className="text-gray-700 dark:text-white">Tracker</span>
                </Link>
            </div>

            {/* মাঝখানের অংশ: ডেস্কটপ মেনু */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 text-gray-700 dark:text-gray-200">
                    {navOptions}
                </ul>
            </div>

            {/* ডান পাশ: ইউজার প্রোফাইল অথবা লগইন বাটন */}
            <div className="navbar-end gap-3">
                {user ? (
                    // লগইন অবস্থায়
                    <div className="flex items-center gap-3">
                        <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                            <div className="avatar online placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="User" />
                                    ) : (
                                        <span className="text-xl uppercase">{user.email?.charAt(0)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button onClick={handleLogOut} className="btn btn-sm btn-outline btn-error hidden lg:flex">
                            Logout
                        </button>
                    </div>
                ) : (
                    // লগইন ছাড়া অবস্থায়
                    <div className="hidden lg:flex gap-2">
                        <Link to="/login" className="btn btn-sm btn-ghost text-gray-700 dark:text-white">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;