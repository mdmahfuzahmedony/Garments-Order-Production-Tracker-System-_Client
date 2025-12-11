import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi"; // মেডেল আইকনের জন্য

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
    <section className="py-20 bg-white font-sans overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ---------------- LEFT SIDE: OVERLAPPING IMAGES ---------------- */}
          <div className="relative">
            {/* Background Image (The Man) */}
            <div className="w-4/5">
              <img
                src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=600&auto=format&fit=crop"
                alt="Worker"
                className="w-full h-[500px] object-cover rounded shadow-lg"
              />
            </div>

            {/* Foreground Image (Sewing Machine - Overlapping) */}
            <div className="absolute bottom-10 right-0 w-3/5 border-[10px] border-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1512106374988-c97f427f63b6?q=80&w=600&auto=format&fit=crop"
                alt="Machine"
                className="w-full h-[350px] object-cover"
              />
            </div>
          </div>

          {/* ---------------- RIGHT SIDE: CONTENT ---------------- */}
          <div>
            {/* Header */}
            <span className="text-[#0e2a3b] font-medium border-b-2 border-[#8CD6B3] pb-1 inline-block mb-4">
              About Textilery
            </span>
            <h2 className="text-4xl font-bold text-[#03131E] mb-6 leading-tight">
              We Provide The Best Textile Industry Since 2005
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam quis nostrud.
            </p>

            {/* Experience Box & List Container */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Blue Box (Experience) */}
              <div className="bg-[#03131E] text-white p-8 flex flex-col items-center justify-center text-center min-w-[200px] rounded-sm">
                <GiRibbonMedal className="text-[#8CD6B3] text-5xl mb-2" />
                <div className="text-4xl font-bold mb-1">
                  16 <span className="text-[#8CD6B3]">+</span>
                </div>
                <p className="text-sm text-gray-300">Years Of Experiences</p>
              </div>

              {/* Check List */}
              <ul className="space-y-3">
                {features.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-600 font-medium"
                  >
                    <FaCheckCircle className="text-[#8CD6B3] text-lg flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer: Founder & Button */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 border-t border-gray-100 pt-6">
              {/* Founder Info */}
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
                  alt="Founder"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <h4 className="text-[#03131E] font-bold text-lg">
                    Miya Draper
                  </h4>
                  <p className="text-gray-500 text-sm">Founder Textilery</p>
                </div>
              </div>

              {/* Button */}
              <button className="bg-[#8CD6B3] text-white px-8 py-3 font-bold text-sm uppercase hover:bg-[#03131E] transition duration-300 w-full sm:w-auto">
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
