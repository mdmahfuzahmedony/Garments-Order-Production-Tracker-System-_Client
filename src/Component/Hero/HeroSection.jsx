import React from "react";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#020d14] transition-colors duration-300">
      {/* Added px-5 for mobile spacing */}
      <div className="flex justify-start items-center max-w-[1500px] mx-auto py-[70px] px-5">
        <div className="flex flex-col gap-3">
          
          {/* Top Label */}
          <div className="inline-block">
            {/* Change: text-white -> text-gray-800 dark:text-white */}
            <span className="text-gray-800 dark:text-white text-sm font-medium uppercase tracking-wide border-b-[3px] border-[#8CD6B3] pb-1">
              Since 2023
            </span>
          </div>

          {/* Headline */}
          {/* Change: text-white -> text-gray-900 dark:text-white */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Textilery Creating The <br />
            Best <span className="text-[#8CD6B3]">Textile</span> Solutions
          </h1>

          {/* Description */}
          {/* Change: text-gray-300 -> text-gray-600 dark:text-gray-300 */}
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          {/* Watch Video Button */}
          <button className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-full bg-[#8CD6B3] flex items-center justify-center pl-1 group-hover:scale-110 transition duration-300 shadow-lg shadow-[#8CD6B3]/30">
              <FaPlay className="text-white text-lg" />
            </div>
            {/* Change: text-white -> text-gray-900 dark:text-white */}
            <span className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider group-hover:text-[#8CD6B3] transition">
              Watch Video
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;