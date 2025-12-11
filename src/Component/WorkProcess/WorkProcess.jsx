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
    <section className="py-24 bg-[#03131E] font-sans relative">
      {/* Background Texture (Optional) */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#8CD6B3] font-bold tracking-widest uppercase text-sm">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Simple 4-Step <span className="text-[#8CD6B3]">Workflow</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We have simplified the complex garment manufacturing process into a
            user-friendly digital flow.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Dashed Line (Visible only on Desktop) */}
          <div className="hidden md:block absolute top-[50px] left-0 w-full h-0.5 border-t-2 border-dashed border-gray-700 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 text-center group">
                {/* Icon Container */}
                <div className="w-24 h-24 mx-auto bg-[#0E2A3B] border-4 border-[#03131E] rounded-full flex items-center justify-center text-3xl text-white mb-8 group-hover:border-[#8CD6B3] group-hover:text-[#8CD6B3] transition-all duration-300 shadow-xl relative">
                  {/* Small Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#8CD6B3] rounded-full flex items-center justify-center text-[#03131E] font-bold text-sm shadow-md">
                    {step.id}
                  </div>

                  {step.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#8CD6B3] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed px-2">
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
