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
        <section className="my-20 py-16 font-sans ">
            <div className="max-w-[1500px] mx-auto px-6">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x ">
                    
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex bg-gray-800 py-5 rounded-3xl border flex-col items-center group">
                            
                            {/* Icon Wrapper */}
                            <div className="mb-4 text-[#8CD6B3] text-5xl transform group-hover:scale-110 transition duration-300">
                                {stat.icon}
                            </div>
                            
                            {/* Number Count */}
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {stat.count}
                            </h3>
                            
                            {/* Label/Title */}
                            <p className="text-gray-400 text-sm md:text-base font-medium uppercase tracking-wide">
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