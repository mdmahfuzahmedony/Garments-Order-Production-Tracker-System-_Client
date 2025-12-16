import React from "react";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    // 1. Background: 
    // Light Mode: Clean Gray to Teal Fade
    // Dark Mode: Starts with your Footer Color (#03131E) -> Blends to Site Dark Theme (#0b1120)
    <section className="relative py-20 lg:py-32 font-sans overflow-hidden transition-colors duration-300
      bg-gradient-to-br from-gray-50 via-white to-teal-50/30 
      dark:from-[#03131E] dark:via-[#061a28] dark:to-[#0b1120]">
      
      {/* Background Pattern (Teal Dots for texture) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", 
          backgroundSize: "25px 25px",
        }}
      ></div>

      {/* Optional: Top Glow Effect (Lighting) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex justify-start items-center max-w-[1500px] mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-5">
          
          {/* --- Top Label --- */}
          <div className="inline-block animate-fade-in-up">
            <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">
              Since 2023
            </p>
          </div>

          {/* --- Headline --- */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
            Textilery Creating The <br />
            Best{" "}
            {/* Gradient Text Effect */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              Textile
            </span>{" "}
            Solutions
          </h1>

          {/* --- Description --- */}
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          {/* --- Watch Video Button --- */}
          <button className="flex items-center gap-4 group w-fit">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center pl-1 group-hover:scale-110 transition duration-300 shadow-lg shadow-teal-500/30">
              <FaPlay className="text-white text-xl" />
            </div>
            <span className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider group-hover:text-teal-500 transition-colors">
              Watch Video
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;