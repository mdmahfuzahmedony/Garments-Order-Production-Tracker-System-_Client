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
    <section className="py-24 bg-gray-50 font-sans relative overflow-hidden">
      {/* Background Decoration (Optional Dotted Pattern) */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{
          backgroundImage: "radial-gradient(#03131E 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[#8CD6B3] font-bold tracking-widest uppercase text-sm">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#03131E] mt-3 mb-4">
            Everything You Need to Run a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03131E] to-[#8CD6B3]">
              Modern Factory
            </span>
          </h2>
          <p className="text-gray-500">
            Stop using pen and paper. Switch to a fully automated system
            designed for garment industries.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#03131E] to-[#8CD6B3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Background Big Number (Watermark effect) */}
              <div className="absolute -right-4 -top-4 text-9xl font-bold text-gray-100 opacity-50 select-none group-hover:text-[#8CD6B3]/10 transition-colors duration-300">
                {item.id}
              </div>

              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-[#03131E] text-white flex items-center justify-center text-2xl mb-6 relative z-10 shadow-lg group-hover:bg-[#8CD6B3] group-hover:text-[#03131E] transition-colors duration-300">
                {item.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#03131E] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Learn More Link */}
                <a
                  href="#"
                  className="inline-flex items-center text-[#03131E] font-semibold text-sm group-hover:text-[#8CD6B3] transition-colors"
                >
                  Learn more{" "}
                  <BsArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
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
