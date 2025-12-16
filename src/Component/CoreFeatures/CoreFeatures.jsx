import React from "react";
import {
  FaClipboardList,
  FaIndustry,
  FaBoxOpen,
  FaChartLine,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const CoreFeatures = () => {
  const features = [
    {
      id: "01",
      title: "Inventory Control",
      desc: "Track raw materials like fabric, buttons, and threads in real-time. Never run out of stock.",
      icon: <FaBoxOpen />,
    },
    {
      id: "02",
      title: "Live Production",
      desc: "Monitor every step from cutting to finishing. Spot bottlenecks instantly on the dashboard.",
      icon: <FaIndustry />,
    },
    {
      id: "03",
      title: "Order Tracking",
      desc: "Give buyers real-time updates. Generate unique tracking IDs for every single order.",
      icon: <FaClipboardList />,
    },
    {
      id: "04",
      title: "Smart Reporting",
      desc: "Auto-generate efficiency reports, worker performance, and monthly shipment analytics.",
      icon: <FaChartLine />,
    },
  ];

  return (
    // 1. Main Background: Matched with other sections (gray-50 / #0b1120)
    <section className="py-24 font-sans relative overflow-hidden transition-colors duration-300 bg-gray-50 dark:bg-[#0b1120]">
      
      {/* 2. Background Decoration: Dots */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none text-gray-900 dark:text-white transition-colors duration-300"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">
            Powerful Features
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4 transition-colors duration-300 text-gray-900 dark:text-white">
            Everything You Need to Run a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              Modern Factory
            </span>
          </h2>
          <p className="transition-colors duration-300 text-gray-600 dark:text-gray-400 text-lg">
            Stop using pen and paper. Switch to a fully automated system
            designed for garment industries.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="group relative p-8 rounded-2xl border transition-all duration-300 overflow-hidden
              bg-white border-gray-100 
              dark:bg-[#151f32] dark:border-gray-800
              shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2"
            >
              {/* Top Accent Line (Teal Gradient) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Background Big Number (Watermark effect) */}
              <div className="absolute -right-4 -top-4 text-9xl font-bold opacity-50 select-none transition-colors duration-300
              text-gray-50 group-hover:text-teal-500/5
              dark:text-gray-800 dark:group-hover:text-teal-500/5">
                {item.id}
              </div>

              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 relative z-10 shadow-lg transition-all duration-300
              bg-gray-900 text-white 
              group-hover:bg-teal-500 group-hover:scale-110
              dark:bg-white dark:text-gray-900 dark:group-hover:bg-teal-500 dark:group-hover:text-white">
                {item.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 transition-colors duration-300 text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>

                {/* Learn More Link */}
                <a
                  href="#"
                  className="inline-flex items-center font-bold text-sm transition-colors duration-300
                  text-gray-900 group-hover:text-teal-500
                  dark:text-white dark:group-hover:text-teal-400"
                >
                  Learn more{" "}
                  <BsArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform text-teal-500" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;