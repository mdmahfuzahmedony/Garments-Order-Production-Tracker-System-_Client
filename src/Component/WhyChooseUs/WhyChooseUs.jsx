import React from "react";
import {
  FaCheck,
  FaChartLine,
  FaStopwatch,
  FaSearchDollar,
} from "react-icons/fa";

const WhyChooseUs = () => {
  // বেনিফিট লিস্ট
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
    // 1. Main Background: Light = White, Dark = Deep Navy (#020d14)
    <section className="py-24 font-sans overflow-hidden transition-colors duration-300 bg-white dark:bg-[#020d14]">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* ---------------- LEFT SIDE: IMAGE COMPOSITION ---------------- */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                alt="Factory Manager with Tablet"
                className="w-full h-[600px] object-cover hover:scale-105 transition duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03131E]/60 to-transparent"></div>
            </div>

            {/* Floating Stats Card (Animation Effect) */}
            <div className="absolute bottom-10 -right-6 md:-right-10 p-6 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-xs border-l-4 border-[#8CD6B3] animate-bounce-slow transition-colors duration-300
            bg-white dark:bg-[#0E2A3B] dark:shadow-none dark:border-t dark:border-r dark:border-b dark:border-gray-700">
              
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors duration-300
                bg-[#E5F7EF] text-[#8CD6B3] dark:bg-gray-700 dark:text-[#8CD6B3]">
                  <FaChartLine />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase transition-colors duration-300 text-gray-500 dark:text-gray-400">
                    Productivity
                  </p>
                  <h4 className="text-2xl font-bold transition-colors duration-300 text-[#03131E] dark:text-white">
                    + 35%
                  </h4>
                </div>
              </div>
              <p className="text-xs leading-relaxed transition-colors duration-300 text-gray-400 dark:text-gray-300">
                Factories using GarmentsTracker see a significant rise in daily
                output within 30 days.
              </p>
            </div>

            {/* Decoration Circle behind image */}
            <div className="absolute -z-10 top-10 -left-10 w-40 h-40 bg-[#8CD6B3]/20 rounded-full blur-3xl"></div>
          </div>

          {/* ---------------- RIGHT SIDE: CONTENT ---------------- */}
          <div>
            <span className="text-[#8CD6B3] font-bold tracking-widest uppercase text-sm mb-2 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight transition-colors duration-300 text-[#03131E] dark:text-white">
              Replace Chaos With <br />
              <span className="relative inline-block">
                Control
                {/* Underline svg */}
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-[#8CD6B3]"
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

            <p className="text-lg mb-10 transition-colors duration-300 text-gray-500 dark:text-gray-400">
              Traditional Excel sheets and manual ledgers are slowing you down.
              Upgrade to a system that understands the complexity of apparel
              manufacturing.
            </p>

            {/* Benefit Items */}
            <div className="space-y-8">
              {benefits.map((item) => (
                <div key={item.id} className="flex items-start gap-5 group">
                  {/* Icon Box */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg mt-1 transition-colors duration-300
                  bg-[#03131E] text-[#8CD6B3]
                  dark:bg-white dark:text-[#03131E]">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-xl font-bold mb-2 transition-colors duration-300 text-[#03131E] dark:text-white">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-sm md:text-base transition-colors duration-300 text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12">
              <button className="px-8 py-3 rounded font-bold transition duration-300 shadow-lg shadow-[#8CD6B3]/30
              bg-[#8CD6B3] text-[#03131E] 
              hover:bg-[#03131E] hover:text-white
              dark:hover:bg-white dark:hover:text-[#03131E]">
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