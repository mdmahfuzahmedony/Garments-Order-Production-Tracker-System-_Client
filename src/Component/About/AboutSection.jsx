import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi"; 

const AboutSection = () => {
  // চেকলিস্ট ডাটা
  const features = [
    "Best Quality Standards",
    "100% Satisfaction Guarantee",
    "Quality Control System",
    "Commitment to Customers",
    "Highly Professional Team",
  ];

  return (
    // 1. Background: Light = White, Dark = Very Dark Navy (#020d14)
    <section className="py-20 font-sans overflow-hidden transition-colors duration-300 bg-white dark:bg-[#020d14]">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ---------------- LEFT SIDE: IMAGES ---------------- */}
          <div className="relative">
            <div className="w-4/5">
              <img
                src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=600&auto=format&fit=crop"
                alt="Worker"
                className="w-full h-[500px] object-cover rounded shadow-lg"
              />
            </div>
            
            {/* 
               2. Image Border Fix:
               ওভারল্যাপ এফেক্ট ঠিক রাখতে বর্ডারের কালার ব্যাকগ্রাউন্ডের সমান হতে হবে।
               Light: border-white, Dark: border-[#020d14]
            */}
            <div className="absolute bottom-10 right-0 w-3/5 border-[10px] shadow-xl border-white dark:border-[#020d14] transition-colors duration-300">
              <img
                src="https://images.unsplash.com/photo-1512106374988-c97f427f63b6?q=80&w=600&auto=format&fit=crop"
                alt="Machine"
                className="w-full h-[350px] object-cover"
              />
            </div>
          </div>

          {/* ---------------- RIGHT SIDE: CONTENT ---------------- */}
          <div>
            {/* Header Span */}
            <span className="font-bold text-[20px] border-b-2 border-[#8CD6B3] pb-1 inline-block mb-4 transition-colors duration-300 text-[#0e2a3b] dark:text-[#8CD6B3]">
              About TexTrack
            </span>
            
            {/* Main Heading */}
            <h2 className="text-4xl font-bold mb-6 leading-tight transition-colors duration-300 text-[#03131E] dark:text-white">
              We Provide The Best Textile Industry Since 2005
            </h2>
            
            {/* Paragraph */}
            <p className="mb-10 leading-relaxed transition-colors duration-300 text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam quis nostrud.
            </p>

            {/* Experience Box & List Container */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              
              {/* Blue Box (Experience) - Dark Mode e thik thakbe karon text white */}
              <div className="bg-[#03131E] text-white p-8 flex flex-col items-center justify-center text-center min-w-[200px] rounded-sm shadow-lg dark:shadow-none dark:border dark:border-gray-800">
                <GiRibbonMedal className="text-[#8CD6B3] text-5xl mb-2" />
                <div className="text-4xl font-bold mb-1">
                  4 <span className="text-[#8CD6B3]">+</span>
                </div>
                <p className="text-sm text-gray-300">Years Of Experiences</p>
              </div>

              {/* Check List */}
              <ul className="space-y-3">
                {features.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 font-medium transition-colors duration-300 text-gray-600 dark:text-gray-300"
                  >
                    <FaCheckCircle className="text-[#8CD6B3] text-lg flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer: Founder & Button */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 border-t pt-6 transition-colors duration-300 border-gray-100 dark:border-gray-800">
              
              {/* Founder Info */}
              <div className="flex items-center gap-4">
                <img
                  src="https://i.ibb.co.com/cStWzWHq/464557633-1807627296644434-494423384833873017-n-3.jpg"
                  alt="Founder"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
                />
                <div>
                  <h4 className="font-bold text-lg transition-colors duration-300 text-[#03131E] dark:text-white">
                    Mahfuz Ahmed
                  </h4>
                  <p className="text-sm transition-colors duration-300 text-gray-500 dark:text-gray-400">
                    Founder TexTrack
                  </p>
                </div>
              </div>

              {/* Button */}
              <button className="bg-[#8CD6B3] rounded-2xl text-white px-8 py-3 font-bold text-sm uppercase transition duration-300 w-full sm:w-auto hover:bg-[#03131E] dark:hover:bg-white dark:hover:text-[#03131E]">
                More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;