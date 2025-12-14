import React from 'react';
import { FaTshirt, FaShippingFast, FaCheckCircle, FaGlobe, FaUsers, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router';
import Testimonials from '../../Component/Testimonials/Testimonials';
import ServicesSection from '../../Component/Service/ServicesSection';
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs';

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen font-sans">
      
      {/* --- HERO SECTION --- */}
      <div 
        className="hero min-h-[60vh]" 
        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop)'}}
      >
        <div className="hero-overlay bg-opacity-70 bg-black"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-4xl md:text-6xl font-bold text-white">Redefining Garments Production</h1>
            <p className="mb-5 text-lg text-gray-200">
              We bridge the gap between quality manufacturing and efficient delivery. 
              Experience real-time tracking from cutting to shipping with our state-of-the-art management system.
            </p>
            <Link to="/all-products" className="btn btn-primary text-white border-0 px-8">Browse Products</Link>
          </div>
        </div>
      </div>

      {/* --- OUR STORY SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1542272617-08f086302542?q=80&w=2070&auto=format&fit=crop" 
              alt="Factory Work" 
              className="rounded-2xl shadow-2xl border-4 border-base-200"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h4 className="text-primary font-bold tracking-widest uppercase">Who We Are</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
              Leading the Way in <br /> Textile Innovation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Founded with a vision to streamline the apparel supply chain, we provide a transparent platform for buyers and managers. Unlike traditional factories, we believe in complete visibility.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              From the first fabric cut to the final quality check, our clients can track every step. We are committed to ethical manufacturing, premium quality materials, and timely delivery.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
               <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> <span>100% Cotton</span>
               </div>
               <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> <span>Eco-Friendly</span>
               </div>
               <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> <span>QC Passed</span>
               </div>
               <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> <span>Fast Shipping</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      <ServicesSection></ServicesSection>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>


    </div>
  );
};

export default About;