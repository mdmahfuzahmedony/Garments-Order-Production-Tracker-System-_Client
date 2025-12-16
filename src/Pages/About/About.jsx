import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';
import Testimonials from '../../Component/Testimonials/Testimonials';
import ServicesSection from '../../Component/Service/ServicesSection';
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs';

const About = () => {
  return (
    // 1. Background: Matched with other pages (Gradient + Texture)
    <div className="min-h-screen font-sans transition-colors duration-300 relative
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

      {/* --- HERO SECTION --- */}
      <div 
        className="hero min-h-[60vh] relative" 
        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop)'}}
      >
        {/* Dark Overlay with Footer Color Match */}
        <div className="absolute inset-0 bg-[#03131E]/70 dark:bg-[#03131E]/80"></div>
        
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Redefining Garments <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                Production
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-200 leading-relaxed">
              We bridge the gap between quality manufacturing and efficient delivery. 
              Experience real-time tracking from cutting to shipping with our state-of-the-art management system.
            </p>
            <Link 
                to="/all-products" 
                className="btn border-0 text-white font-bold text-base uppercase tracking-wider px-8 py-3 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg hover:shadow-teal-500/30 transition-all"
            >
                Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* --- OUR STORY SECTION --- */}
      <div className="max-w-[1500px] mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Image Side */}
          <div className="md:w-1/2 relative group">
             {/* Decorative Border/Shadow Effect */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1542272617-08f086302542?q=80&w=2070&auto=format&fit=crop" 
              alt="Factory Work" 
              className="relative rounded-2xl shadow-2xl border-4 border-white dark:border-[#151f32] transform transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Text Side */}
          <div className="md:w-1/2 space-y-6">
            <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm">
               Who We Are
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Leading the Way in <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                 Textile Innovation
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Founded with a vision to streamline the apparel supply chain, we provide a transparent platform for buyers and managers. Unlike traditional factories, we believe in complete visibility.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              From the first fabric cut to the final quality check, our clients can track every step. We are committed to ethical manufacturing, premium quality materials, and timely delivery.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6">
               {[
                 "100% Cotton", 
                 "Eco-Friendly", 
                 "QC Passed", 
                 "Fast Shipping"
               ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-3 group">
                      <FaCheckCircle className="text-teal-500 text-xl group-hover:scale-110 transition-transform" /> 
                      <span className="font-bold text-gray-700 dark:text-gray-300">{item}</span>
                   </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Other Sections --- */}
      {/* Assuming these components are already styled or will inherit the page background seamlessly.
          If they have their own background colors hardcoded, you might need to update them too. 
      */}
      <ServicesSection></ServicesSection>
      <WhyChooseUs></WhyChooseUs>

    </div>
  );
};

export default About;