import React from "react";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 font-sans">
      {/* 1. Background Image */}
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524233267590-332e75e927c7?q=80&w=1920&auto=format&fit=crop')", // Sewing Machine Image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 2. Dark Blue Overlay (Opacity controlled) */}
      <div className="absolute inset-0 z-10 bg-[#0E2A3B] opacity-85"></div>

      {/* 3. Content Container */}
      <div className="relative z-20 max-w-[1500px] mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Do You Want Custom Project With <br className="hidden md:block" />
            Textilery? Contact Us Now
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-base mb-10 leading-relaxed max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Button */}
          <Link
            to="/contact"
            className="inline-block bg-[#8CD6B3] text-white font-bold text-sm px-10 py-4 uppercase tracking-wide hover:bg-white hover:text-[#0E2A3B] transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
