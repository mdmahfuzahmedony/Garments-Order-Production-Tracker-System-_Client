import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GiSewingMachine, GiPoloShirt, GiRolledCloth } from "react-icons/gi";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Fabric Dyeing",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <GiSewingMachine size={50} />,
    },
    {
      id: 2,
      title: "Satin Weaving",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <GiRolledCloth size={50} />, 
    },
    {
      id: 3,
      title: "Digital Fabric Printing",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <GiPoloShirt size={50} />,
    },
  ];

  return (
    // 1. Background: Matched with other sections (Gradient)
    <section className="py-24 relative font-sans overflow-hidden transition-colors duration-300 
      bg-gradient-to-br from-gray-50 to-teal-50/30 
      dark:from-[#03131E] dark:to-[#0b1120]">
      
      {/* Background Pattern (Teal Dots) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="lg:w-1/2">
            <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight transition-colors duration-300 text-gray-900 dark:text-white">
              Delivering The Highest <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                Quality Fabrics
              </span>
            </h2>
          </div>

          <div className="lg:w-1/2 flex flex-col items-start lg:pl-10">
            <p className="mb-8 leading-relaxed text-lg transition-colors duration-300 text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            {/* Gradient Button */}
            <button className="px-8 py-3 font-bold text-sm uppercase tracking-wider rounded-full text-white shadow-lg bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 hover:shadow-teal-500/30 transition-all transform hover:-translate-y-1">
              All Services
            </button>
          </div>
        </div>

        {/* --- CARDS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              // Card Style: Matched with HomeProduct/Blog
              className="group p-10 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-2
                  bg-white dark:bg-[#151f32]
                  border border-gray-100 dark:border-gray-800
                  shadow-sm hover:shadow-2xl hover:shadow-teal-500/10"
            >
              {/* Top Accent Line Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Icon */}
              <div className="mb-6 text-teal-500 dark:text-teal-400 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-8 leading-relaxed text-sm text-gray-500 dark:text-gray-400">
                {service.desc}
              </p>

              {/* Read More Link */}
              <a
                href="#"
                className="inline-flex items-center font-bold text-sm gap-2 hover:gap-3 transition-all duration-300 text-teal-600 dark:text-teal-400"
              >
                Read More <FaArrowRight />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;