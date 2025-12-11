import React from 'react';
import { FaTshirt, FaUsers, FaShippingFast } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";

const StatsCounter = () => {
    
    // ডাটা লিস্ট
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
        // 1. Main Background: Light = Gray-50, Dark = Deep Navy (#020d14)
        <section className="py-20 font-sans transition-colors duration-300 bg-gray-50 dark:bg-[#020d14]">
            <div className="max-w-[1500px] mx-auto px-6">
                
                {/* 2. Grid Layout instead of divide-x for better card animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            // 3. Card Styling:
                            // - Light: White bg, Shadow
                            // - Dark: Blue bg (#0E2A3B), No Shadow, Border
                            // - Animation: Hover Lift (-translate-y-2)
                            className="relative group p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 overflow-hidden
                            bg-white shadow-lg shadow-gray-200/50 
                            dark:bg-[#0E2A3B] dark:shadow-none dark:border dark:border-gray-800"
                        >
                            
                            {/* --- TOP ACCENT LINE ANIMATION --- */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#03131E] to-[#8CD6B3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            {/* Icon Wrapper */}
                            <div className="mb-4 text-5xl transform group-hover:scale-110 transition duration-300 text-[#8CD6B3]">
                                {stat.icon}
                            </div>
                            
                            {/* Number Count */}
                            <h3 className="text-4xl md:text-5xl font-bold mb-2 transition-colors duration-300 text-[#03131E] dark:text-white">
                                {stat.count}
                            </h3>
                            
                            {/* Label/Title */}
                            <p className="text-sm md:text-base font-medium uppercase tracking-wide transition-colors duration-300 text-gray-500 dark:text-gray-400">
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