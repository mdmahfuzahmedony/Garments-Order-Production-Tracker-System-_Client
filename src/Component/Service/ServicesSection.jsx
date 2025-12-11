import React from "react";
import { FaArrowRight } from "react-icons/fa";
// ফিক্স: GiBallOfWool বাদ দিয়ে GiRolledCloth দেওয়া হয়েছে যা নিশ্চিত কাজ করবে
import { GiSewingMachine, GiPoloShirt, GiRolledCloth } from "react-icons/gi";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Fabric Dyeing",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <GiSewingMachine size={50} />,
      variant: "light",
    },
    {
      id: 2,
      title: "Satin Weaving",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      // ফিক্স: এখানে নতুন আইকন বসানো হয়েছে
      icon: <GiRolledCloth size={50} />, 
      variant: "light",
    },
    {
      id: 3,
      title: "Digital Fabric Printing",
      desc: "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <GiPoloShirt size={50} />,
      variant: "dark",
    },
  ];

  return (
    // Main Background
    <section className="py-20 relative font-sans overflow-hidden transition-colors duration-300 bg-[#F0F4F8] dark:bg-[#020d14]">
      
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none transition-opacity duration-300 dark:opacity-10 dark:invert"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/seigaiha.png')",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="lg:w-1/2">
            <span className="font-medium border-b-2 border-[#8CD6B3] pb-1 inline-block mb-4 transition-colors duration-300 text-[#0e2a3b] dark:text-[#8CD6B3]">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight transition-colors duration-300 text-[#03131E] dark:text-white">
              Delivering The Highest Quality Fabrics
            </h2>
          </div>

          <div className="lg:w-1/2 flex flex-col items-start lg:pl-10">
            <p className="mb-8 leading-relaxed transition-colors duration-300 text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <button className="bg-[#8CD6B3] text-white px-8 py-3 font-bold text-sm uppercase transition duration-300 hover:bg-[#03131E] dark:hover:bg-white dark:hover:text-black">
              All Services
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-10 transition-all duration-300 group rounded-lg relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl
                  ${
                    service.variant === "dark"
                      ? "bg-[#03131E] text-white dark:bg-black dark:border dark:border-gray-800"
                      : "bg-white text-[#03131E] dark:bg-[#0E2A3B] dark:text-white"
                  }
              `}
            >
              {/* --- TOP ACCENT LINE ANIMATION --- */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#03131E] to-[#8CD6B3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Icon */}
              <div className="mb-6 text-[#8CD6B3]">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>

              {/* Description */}
              <p
                className={`mb-8 leading-relaxed text-sm transition-colors duration-300
                  ${
                    service.variant === "dark"
                      ? "text-gray-400 dark:text-gray-400"
                      : "text-gray-500 dark:text-gray-300"
                  }
                `}
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