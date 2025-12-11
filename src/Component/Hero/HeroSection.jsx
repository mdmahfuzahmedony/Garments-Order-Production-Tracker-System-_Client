import React from "react";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative  min-h-[700px] w-full font-sans overflow-hidden">
      {/* 1. Background Image */}
      <div
        className="absolute inset-0 w-full  bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1604535312386-778508e64c20?q=80&w=1920&auto=format&fit=crop')", // Industrial Sewing Machine
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#03131E]/70"></div>
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 py-30 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Top Label */}
          <div className="inline-block mb-6">
            <span className="text-white text-sm font-medium uppercase tracking-wide border-b-[3px] border-[#8CD6B3] pb-1">
              Since 2023
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Textilery Creating The <br />
            Best <span className="text-[#8CD6B3]">Textile</span> Solutions
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          {/* Watch Video Button */}
          <button className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-full bg-[#8CD6B3] flex items-center justify-center pl-1 group-hover:scale-110 transition duration-300 shadow-lg shadow-[#8CD6B3]/30">
              <FaPlay className="text-white text-lg" />
            </div>
            <span className="text-white font-bold text-sm uppercase tracking-wider group-hover:text-[#8CD6B3] transition">
              Watch Video
            </span>
          </button>
        </div>
      </div>

      {/* 3. Bottom Right Info Boxes */}
      {/* These are absolute positioned to the bottom right */}
    
    </section>
  );
};

export default HeroSection;
