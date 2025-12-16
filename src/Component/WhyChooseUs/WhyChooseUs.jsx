import React from "react";
import {
  FaChartLine,
  FaStopwatch,
  FaSearchDollar,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const benefits = [
    {
      id: 1,
      title: "Reduce Production Wastage",
      desc: "Stop material theft and wastage. Our inventory tracking reduces fabric loss by up to 20%.",
      icon: <FaSearchDollar />,
    },
    {
      id: 2,
      title: "Boost Workforce Efficiency",
      desc: "Automated line balancing helps you utilize 100% of your manpower capacity.",
      icon: <FaChartLine />,
    },
    {
      id: 3,
      title: "Real-time Decision Making",
      desc: "Don't wait for end-of-day reports. See bottlenecks instantly and fix them on the spot.",
      icon: <FaStopwatch />,
    },
  ];

  return (
    // 1. Background: Matched with other sections (Gradient)
    <section className="py-24 font-sans overflow-hidden transition-colors duration-300 relative
      bg-gradient-to-br from-gray-50 to-teal-50/30 
      dark:from-[#03131E] dark:to-[#0b1120]">
      
      {/* Background Texture (Teal Dots) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* ---------------- LEFT SIDE: IMAGE COMPOSITION ---------------- */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#151f32]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                alt="Factory Manager with Tablet"
                className="w-full h-[600px] object-cover hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03131E]/60 to-transparent"></div>
            </div>

            {/* Floating Stats Card (Updated Colors) */}
            <div className="absolute bottom-10 -right-6 md:-right-10 p-6 rounded-2xl shadow-2xl max-w-xs animate-bounce-slow transition-colors duration-300 border border-gray-100 dark:border-gray-800
              bg-white dark:bg-[#151f32]">
              
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors duration-300
                bg-teal-50 text-teal-500 dark:bg-gray-800 dark:text-teal-400">
                  <FaChartLine />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase transition-colors duration-300 text-gray-500 dark:text-gray-400">
                    Productivity
                  </p>
                  <h4 className="text-2xl font-bold transition-colors duration-300 text-gray-900 dark:text-white">
                    + 35%
                  </h4>
                </div>
              </div>
              <p className="text-xs leading-relaxed transition-colors duration-300 text-gray-500 dark:text-gray-400">
                Factories using GarmentsTracker see a significant rise in daily
                output within 30 days.
              </p>
            </div>

            {/* Decoration Circle behind image (Teal Glow) */}
            <div className="absolute -z-10 top-10 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* ---------------- RIGHT SIDE: CONTENT ---------------- */}
          <div>
            <span className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight transition-colors duration-300 text-gray-900 dark:text-white">
              Replace Chaos With <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                Control
                {/* Underline svg (Teal color) */}
                <svg
                  className="absolute w-full h-3 -bottom-2 left-0 text-teal-400"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00025 6.99997C25.7501 2.49994 132.5 -6.00003 198 4.49997"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-lg mb-10 transition-colors duration-300 text-gray-600 dark:text-gray-400">
              Traditional Excel sheets and manual ledgers are slowing you down.
              Upgrade to a system that understands the complexity of apparel
              manufacturing.
            </p>

            {/* Benefit Items */}
            <div className="space-y-8">
              {benefits.map((item) => (
                <div key={item.id} className="flex items-start gap-5 group">
                  {/* Icon Box (Gradient & Circle) */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg mt-1 transition-all duration-300
                  bg-white text-teal-500 border border-teal-100
                  dark:bg-[#151f32] dark:text-teal-400 dark:border-gray-800
                  group-hover:bg-teal-500 group-hover:text-white dark:group-hover:bg-teal-500 dark:group-hover:text-white">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-xl font-bold mb-2 transition-colors duration-300 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-sm md:text-base transition-colors duration-300 text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Button (Gradient) */}
            <div className="mt-12">
              <button className="px-8 py-3 rounded-full font-bold text-white uppercase tracking-wider shadow-lg bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 hover:shadow-teal-500/30 transition-all transform hover:-translate-y-1">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;