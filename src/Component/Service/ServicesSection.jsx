import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GiSewingMachine, GiPoloShirt } from "react-icons/gi";

const ServicesSection = () => {
  // সার্ভিস ডাটা লিস্ট
  const services = [
    {
      id: 1,
      title: "Fabric Dyeing",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <GiSewingMachine size={50} />,
      variant: "light", // সাদা ব্যাকগ্রাউন্ড
    },
    {
      id: 2,
      title: "Satin Weaving",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",

      variant: "light", // সাদা ব্যাকগ্রাউন্ড
    },
    {
      id: 3,
      title: "Digital Fabric Printing",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <GiPoloShirt size={50} />,
      variant: "dark", // গাঢ় নীল ব্যাকগ্রাউন্ড
    },
  ];

  return (
    <section className="py-20 bg-[#F0F4F8] relative font-sans overflow-hidden">
      {/* Background Pattern (Optional styling to mimic the sketch bg) */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/seigaiha.png')",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        {/* 1. Header Section (Top Row) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          {/* Left Side: Title */}
          <div className="lg:w-1/2">
            <span className="text-[#0e2a3b] font-medium border-b-2 border-[#8CD6B3] pb-1 inline-block mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#03131E] leading-tight">
              Delivering The Highest Quality Fabrics
            </h2>
          </div>

          {/* Right Side: Description & Button */}
          <div className="lg:w-1/2 flex flex-col items-start lg:pl-10">
            <p className="text-gray-500 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <button className="bg-[#8CD6B3] text-white px-8 py-3 font-bold text-sm uppercase hover:bg-[#03131E] transition duration-300">
              All Services
            </button>
          </div>
        </div>

        {/* 2. Cards Section (Bottom Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-10 transition duration-300 group
                                ${
                                  service.variant === "dark"
                                    ? "bg-[#03131E] text-white"
                                    : "bg-white text-[#03131E]"
                                }
                            `}
            >
              {/* Icon */}
              <div
                className={`mb-6 ${
                  service.variant === "dark"
                    ? "text-[#8CD6B3]"
                    : "text-[#8CD6B3]"
                }`}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>

              {/* Description */}
              <p
                className={`mb-8 leading-relaxed text-sm ${
                  service.variant === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {service.desc}
              </p>

              {/* Read More Link */}
              <a
                href="#"
                className="inline-flex items-center font-bold text-sm gap-2 hover:gap-3 transition-all duration-300 text-[#8CD6B3]"
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
