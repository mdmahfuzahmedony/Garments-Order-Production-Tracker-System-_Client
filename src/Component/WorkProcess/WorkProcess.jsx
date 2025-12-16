import React from "react";
import {
  FaFileInvoice,
  FaNetworkWired,
  FaTshirt,
  FaShippingFast,
} from "react-icons/fa";

const WorkProcess = () => {
  const steps = [
    {
      id: "01",
      title: "Input Order Details",
      desc: "Admin inputs order quantity, size ratio, and color breakdown into the system.",
      icon: <FaFileInvoice />,
    },
    {
      id: "02",
      title: "Assign Production Line",
      desc: "System allocates the order to specific lines based on capacity and worker availability.",
      icon: <FaNetworkWired />,
    },
    {
      id: "03",
      title: "Track Daily Output",
      desc: "Supervisors update hourly production data via tablets directly from the floor.",
      icon: <FaTshirt />,
    },
    {
      id: "04",
      title: "Generate Report & Ship",
      desc: "Get instant completion reports and generate shipment challans automatically.",
      icon: <FaShippingFast />,
    },
  ];

  return (
    // 1. Background: Updated to Gradient (Matched with CTASection)
    <section className="py-24 font-sans relative overflow-hidden transition-colors duration-300
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
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            Simple 4-Step{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              Workflow
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            We have simplified the complex garment manufacturing process into a
            user-friendly digital flow.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Dashed Line (Visible only on Desktop) */}
          <div className="hidden md:block absolute top-[50px] left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 dark:border-gray-700 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 text-center group">
                
                {/* Icon Container Circle */}
                {/* 
                   Note on Border: Even with gradient bg, we use solid border colors 
                   closest to the gradient start to hide the dashed line effectively.
                */}
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl mb-8 relative transition-all duration-300 shadow-lg
                bg-white dark:bg-[#151f32]
                border-4 border-gray-50 dark:border-[#0b1120]
                text-gray-400 dark:text-gray-500
                group-hover:border-teal-400 group-hover:text-teal-500 group-hover:scale-110 group-hover:shadow-teal-500/20">
                  
                  {/* Small Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md text-white
                  bg-gradient-to-r from-teal-400 to-emerald-500">
                    {step.id}
                  </div>

                  {step.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold mb-3 transition-colors text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;