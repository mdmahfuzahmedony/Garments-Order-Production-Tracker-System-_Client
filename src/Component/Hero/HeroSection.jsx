import React from "react";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    // 1. Background: 
    // Light Mode: Clean Gray to Teal Fade
    // Dark Mode: Starts with your Footer Color (#03131E) -> Blends to Site Dark Theme (#0b1120)
    <section className="relative py-20 lg:py-28 font-sans overflow-hidden transition-colors duration-300
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

      {/* --- Main Container: Changed from Flex to Grid for 2 Columns --- */}
      <div className="max-w-[1500px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* --- LEFT SIDE: Text Content --- */}
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          
          {/* Top Label */}
          <div className="inline-block animate-fade-in-up">
            <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">
              Since 2023
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
            Textilery Creating The <br />
            {" "}
            {/* Gradient Text Effect */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              Best Textile
            </span>{" "}
            Solutions
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
            We deliver high-quality fabrics and garments using eco-friendly processes. Trusted by top global fashion brands for our reliability, speed, and excellence in craftsmanship.
          </p>

          {/* Watch Video Button */}
          <button className="flex items-center gap-4 group w-fit">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center pl-1 group-hover:scale-110 transition duration-300 shadow-lg shadow-teal-500/30">
              <FaPlay className="text-white text-xl" />
            </div>
            <span className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider group-hover:text-teal-500 transition-colors">
              Watch Video
            </span>
          </button>
        </div>

        {/* --- RIGHT SIDE: Images (One Up, One Down) --- */}
        <div className="order-1 lg:order-2 flex gap-6 relative">
            
            {/* Image 1: Up Position (No margin top) */}
            <div className="w-1/2 self-start">
                <img 
                    src="https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=600&auto=format&fit=crop" 
                    alt="Textile Worker" 
                    className="w-full h-[400px] object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800 hover:scale-[1.02] transition duration-500"
                />
            </div>

            {/* Image 2: Down Position (Added margin top to push it down) */}
            <div className="w-1/2 self-end mt-20 lg:mt-32">
                <img 
                    src="https://i.ibb.co.com/RpD1kcd2/image.png" 
                    alt="Textile Fabric" 
                    className="w-full h-[400px] object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800 hover:scale-[1.02] transition duration-500"
                />
                
                {/* Optional: Floating Badge on the second image */}
                <div className="absolute bottom-10 -right-5 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl animate-bounce hidden md:block">
                    <p className="text-teal-500 font-bold text-2xl">4+</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs font-semibold">Years Experience</p>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;