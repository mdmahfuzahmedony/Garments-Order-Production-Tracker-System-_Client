import React from 'react';
import { FaTshirt, FaUsers, FaShippingFast } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";

const StatsCounter = () => {
    
    const stats = [
        {
            id: 1,
            icon: <FaTshirt />,
            count: "15,000+",
            title: "Total Orders Completed"
        },
        {
            id: 2,
            icon: <GiSewingMachine />,
            count: "120+",
            title: "Active Production Lines"
        },
        {
            id: 3,
            icon: <FaUsers />,
            count: "2,500+",
            title: "Workers Managed"
        },
        {
            id: 4,
            icon: <FaShippingFast />,
            count: "99%",
            title: "On-Time Delivery Rate"
        }
    ];

    return (
        // 1. Background: Updated to Gradient (Matched with previous sections)
        <section className="py-20 font-sans transition-colors duration-300 relative overflow-hidden
            bg-gradient-to-br from-gray-50 to-teal-50/30 
            dark:from-[#0b1120] dark:to-[#020d14]">
            
            {/* Background Texture (Dots) */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", // Teal dots
                    backgroundSize: "20px 20px",
                }}
            ></div>

            <div className="max-w-[1500px] mx-auto px-6 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            // 2. Card Styling: Kept same as before to pop out from gradient
                            className="relative group p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 overflow-hidden
                            bg-white dark:bg-[#151f32] 
                            border border-gray-100 dark:border-gray-800
                            shadow-sm hover:shadow-2xl hover:shadow-teal-500/10"
                        >
                            
                            {/* --- TOP ACCENT LINE ANIMATION (Teal Gradient) --- */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            {/* Icon Wrapper */}
                            <div className="mb-5 text-5xl transform group-hover:scale-110 transition duration-300 text-teal-500 dark:text-teal-400">
                                {stat.icon}
                            </div>
                            
                            {/* Number Count */}
                            <h3 className="text-4xl md:text-5xl font-extrabold mb-2 transition-colors duration-300 text-gray-900 dark:text-white">
                                {stat.count}
                            </h3>
                            
                            {/* Label/Title */}
                            <p className="text-sm font-bold uppercase tracking-widest transition-colors duration-300 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-300">
                                {stat.title}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default StatsCounter;