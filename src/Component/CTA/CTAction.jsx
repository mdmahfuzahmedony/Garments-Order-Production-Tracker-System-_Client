import React from 'react';
import { Link } from 'react-router'; 

const CTASection = () => {
    return (
        // 1. Background: Light = Light Grayish Blue, Dark = Very Dark Navy
        <section className="py-24 relative overflow-hidden transition-colors duration-300 bg-[#F0F4F8] dark:bg-[#020d14] font-sans">
            
            {/* Background Pattern (Optional - for texture) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none dark:opacity-10 dark:invert" 
                 style={{ 
                     backgroundImage: "url('https://www.transparenttextures.com/patterns/seigaiha.png')", 
                     backgroundSize: 'cover' 
                 }}>
            </div>

            <div className="max-w-[1500px] mx-auto px-6 relative z-10">
                
                {/* Centered Content Container */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight transition-colors duration-300 text-[#03131E] dark:text-white">
                        Do You Want Custom Project With <br className="hidden md:block"/> 
                        <span className="text-[#8CD6B3]">Textilery?</span> Contact Us Now
                    </h2>
                    
                    {/* Description */}
                    <p className="mb-10 text-base md:text-lg leading-relaxed transition-colors duration-300 text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    {/* Button */}
                    <Link 
                        to="/contact" 
                        className="inline-block px-10 py-4 font-bold text-sm uppercase tracking-wide rounded shadow-lg transition-all duration-300
                        bg-[#8CD6B3] text-[#03131E] 
                        hover:bg-[#03131E] hover:text-white 
                        dark:hover:bg-white dark:hover:text-[#03131E]"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;