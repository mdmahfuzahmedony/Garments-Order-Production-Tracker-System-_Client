import React, { useContext, useEffect, useState } from "react";
// ফিক্স ১: 'react-router' এর বদলে 'react-router-dom' হবে
import { Link, NavLink } from "react-router"; 
import { AuthContext } from "../../Provider/AuthProvider";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 1. Dark/Light Mode Logic
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setIsProfileOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-bold uppercase text-sm tracking-wide transition-colors duration-300 ${
              isActive
                ? "text-[#8CD6B3]"
                : "text-[#03131E] dark:text-gray-200 hover:text-[#8CD6B3]"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/garments-products"
          className={({ isActive }) =>
            `font-bold uppercase text-sm tracking-wide transition-colors duration-300 ${
              isActive
                ? "text-[#8CD6B3]"
                : "text-[#03131E] dark:text-gray-200 hover:text-[#8CD6B3]"
            }`
          }
        >
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-bold uppercase text-sm tracking-wide transition-colors duration-300 ${
              isActive
                ? "text-[#8CD6B3]"
                : "text-[#03131E] dark:text-gray-200 hover:text-[#8CD6B3]"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `font-bold uppercase text-sm tracking-wide transition-colors duration-300 ${
              isActive
                ? "text-[#8CD6B3]"
                : "text-[#03131E] dark:text-gray-200 hover:text-[#8CD6B3]"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-bold uppercase text-sm tracking-wide transition-colors duration-300 ${
                isActive
                  ? "text-[#8CD6B3]"
                  : "text-[#03131E] dark:text-gray-200 hover:text-[#8CD6B3]"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="font-sans">
      <div className="bg-[#020d14] text-white py-2.5 px-4 hidden md:block transition-colors duration-300">
        <div className="max-w-[1500px] mx-auto flex justify-between items-center text-xs lg:text-sm">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#8CD6B3]" />
              <span>Jessore, Jessore Sadar, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#8CD6B3]" />
              <span>mdmahfuzahmedony@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#8CD6B3] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#8CD6B3] transition"><FaTwitter /></a>
            <a href="#" className="hover:text-[#8CD6B3] transition"><FaInstagram /></a>
            <a href="#" className="hover:text-[#8CD6B3] transition"><FaYoutube /></a>
          </div>
        </div>
      </div>
      
      <div className="sticky top-0 z-50 bg-white dark:bg-[#020d14] border-b-2 border-gray-800 shadow-md transition-all duration-300">
        <div className="navbar max-w-[1500px] mx-auto py-3 md:py-4">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden text-[#03131E] dark:text-white pl-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white dark:bg-gray-800 rounded-box w-52 text-[#03131E] dark:text-gray-200"
              >
                {navOptions}
              </ul>
            </div>

            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-xl md:text-2xl font-bold transition-colors">
                {/* ফিক্স ২: টেক্সট কালার ঠিক করা হয়েছে যাতে লাইট মোডে দেখা যায় */}
                <p className="font-black text-[#03131E] dark:text-white">TexTrack</p>
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-6">{navOptions}</ul>
          </div>

          <div className="navbar-end gap-3 md:gap-4">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm text-[#03131E] dark:text-yellow-400 transition-transform hover:rotate-180"
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={20} />}
            </button>

            {user ? (
              <div className="relative">
                <div
                  className="avatar cursor-pointer online"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full ring ring-[#8CD6B3] ring-offset-base-100 ring-offset-2 transition-all hover:scale-105">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" />
                    ) : (
                      <span className="text-lg font-bold flex items-center justify-center h-full bg-[#03131E] text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-[#0E2A3B] rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-all duration-300 z-50 origin-top-right">
                    <div className="bg-[#03131E] p-5 text-center relative">
                      <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#8CD6B3] overflow-hidden mb-3 shadow-md">
                        <img
                          src={user.photoURL || "https://via.placeholder.com/150"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-white font-bold text-lg truncate px-2">
                        {user.displayName || "User"}
                      </h4>
                      <p className="text-gray-400 text-xs truncate px-2">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={handleLogOut}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="hidden md:inline-block font-bold text-sm text-[#03131E] dark:text-white hover:text-[#8CD6B3] transition"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="bg-[#0E2A3B] text-white px-5 py-2.5 rounded font-bold text-sm hover:bg-[#8CD6B3] hover:text-[#03131E] transition duration-300 shadow-md border border-transparent"
                >
                  GET STARTED
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;