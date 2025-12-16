import React from "react";
import { Link } from "react-router"; // Ensure this matches your router version (v6 uses 'react-router-dom')
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { GiBallOfWool } from "react-icons/gi"; // Using this to mimic the logo in the image

const Footer = () => {
  // Colors extracted from the image
  const themeColors = {
    bg: "bg-[#03131E]", // Deep Navy Background
    textMain: "text-[#B0B8BC]", // Light Grey Text
    textHeader: "text-white", // White Headers
    accent: "text-[#8CD6B3]", // Mint Green Text
    accentBg: "bg-[#8CD6B3]", // Mint Green Backgrounds
    darkBox: "bg-[#0E2A3B]", // Call Box Background
    border: "border-gray-800",
  };

  return (
    <footer
      className={`${themeColors.bg} ${themeColors.textMain} pt-16 font-sans`}
    >
      <div className="max-w-[1500px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 1. Brand Section */}
          <div className="space-y-6">
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-2 group">
              {/* <GiBallOfWool className={`text-5xl ${themeColors.accent}`} /> */}
              <span className="text-3xl font-bold text-white">
                Garments
                <span className="font-light text-gray-400">Tracker</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed pr-4">
              Streamlining production workflows for modern garment factories.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            {/* Social Icons - Circle Style from Image */}
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaXTwitter />, href: "#" }, // Matches the 'X' in image
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaYoutube />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-full ${themeColors.accentBg} text-[#03131E] flex items-center justify-center hover:bg-white transition duration-300`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className={`${themeColors.textHeader} text-lg font-bold mb-2`}>
              Quick Links
            </h3>
            <div className={`h-0.5 w-12 ${themeColors.accentBg} mb-6`}></div>{" "}
            {/* Underline Separator */}
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Useful Links */}
          <div>
            <h3 className={`${themeColors.textHeader} text-lg font-bold mb-2`}>
              Useful Links
            </h3>
            <div className={`h-0.5 w-12 ${themeColors.accentBg} mb-6`}></div>{" "}
            {/* Underline Separator */}
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Make Appointment / Contact */}
          <div>
            <h3 className={`${themeColors.textHeader} text-lg font-bold mb-2`}>
              Make Appointment
            </h3>
            <div className={`h-0.5 w-12 ${themeColors.accentBg} mb-6`}></div>{" "}
            {/* Underline Separator */}
            {/* Hours */}
            <div className="flex items-start gap-3 mb-6 text-sm">
              <FaClock className={`${themeColors.accent} mt-0.5`} />
              <span>9 AM - 5 PM , Monday - Saturday</span>
            </div>
            {/* Call Us Box */}
            <div
              className={`${themeColors.darkBox} p-4 flex items-center gap-4`}
            >
              <div
                className={`w-10 h-10 ${themeColors.accentBg} flex items-center justify-center text-[#03131E] text-lg`}
              >
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Call Us Today</p>
                <p
                  className={`${themeColors.textMain} text-sm font-semibold hover:text-white transition`}
                >
                  01312646505
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={`border-t ${themeColors.border} py-8`}>
        <div className="max-w-[1500px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>
            Textile & Garment Industry WordPress Theme powered by{" "}
            <span className="text-white">Gutenverse Blocks Addons</span>
          </p>
          <p>Copyright © {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
