import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] text-gray-300 border-t border-gray-800 mt-auto">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    {/* 1. Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="text-blue-500 text-3xl">Garments</span>Tracker
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Streamlining production workflows for modern garment factories. 
                            From order placement to delivery, we track it all.
                        </p>
                    </div>

                    {/* 2. Services Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><Link to="/all-products" className="hover:text-blue-500 transition">Order Tracking</Link></li>
                            <li><Link to="/all-products" className="hover:text-blue-500 transition">Production Management</Link></li>
                            <li><Link to="/all-products" className="hover:text-blue-500 transition">Quality Control</Link></li>
                            <li><Link to="/all-products" className="hover:text-blue-500 transition">Inventory System</Link></li>
                        </ul>
                    </div>

                    {/* 3. Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-blue-500 transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-500 transition">Contact Support</Link></li>
                            <li><Link to="/register" className="hover:text-blue-500 transition">Join as Manager</Link></li>
                            <li><Link to="/register" className="hover:text-blue-500 transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* 4. Social & Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition text-white">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition text-white">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition text-white">
                                <FaYoutube size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition text-white">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-[#020617] py-6 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} GarmentsTracker. All rights reserved.</p>
                    <div className="flex gap-6 mt-2 md:mt-0">
                        <Link to="#" className="hover:text-white transition">Terms of Service</Link>
                        <Link to="#" className="hover:text-white transition">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;