import React from 'react';
import { Link } from 'react-router'; 

const CTASection = () => {
    return (
        // 1. Background: Gradient applied (Light: Gray->Teal Fade | Dark: #0b1120 -> #020d14)
        <section className="py-24 relative overflow-hidden font-sans transition-colors duration-300 
            bg-gradient-to-br from-gray-50 to-teal-50/30 
            dark:from-[#0b1120] dark:to-[#020d14]">
            
            {/* Background Pattern (Teal Dots) */}
            <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{ 
                    backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", 
                    backgroundSize: '30px 30px' 
                }}
            ></div>

            {/* Optional: Central Glow Effect for Dark Mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1500px] mx-auto px-6 relative z-10">
                
                {/* Centered Content Container */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight transition-colors duration-300 text-gray-900 dark:text-white">
                        Do You Want Custom Project With <br className="hidden md:block"/> 
                        {/* Gradient Text for Brand Name */}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                            Textilery?
                        </span>{" "}
                        Contact Us Now
                    </h2>
                    
                    {/* Description */}
                    <p className="mb-10 text-base md:text-lg leading-relaxed transition-colors duration-300 text-gray-600 dark:text-gray-400 max-w-2xl">
                        From concept to bulk production, we deliver high-quality garments tailored to your brand’s needs. Let's discuss your requirements today.
.
                    </p>

                    {/* Button - Gradient Style */}
                    <Link 
                        to="/contact" 
                        className="inline-block px-12 py-4 font-bold text-sm uppercase tracking-widest rounded-full shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1
                        bg-gradient-to-r from-teal-400 to-emerald-500 text-white
                        hover:from-emerald-500 hover:to-teal-400"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;