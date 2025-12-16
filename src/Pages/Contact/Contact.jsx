import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {

  const handleSendMessage = (e) => {
    e.preventDefault();
    Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you as soon as possible.',
        confirmButtonColor: '#14b8a6', // Teal color for button
        timer: 2000
    });
    e.target.reset();
  }

  return (
    // 1. Background: Matched with other sections (Gradient & Texture)
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

        {/* --- 1. HERO SECTION (Updated Colors) --- */}
        <div 
            className="relative h-72 w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed" 
            style={{backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop)'}}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#03131E]/70 dark:bg-[#03131E]/80"></div>
            
            <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                    Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Us</span>
                </h1>
                <p className="text-gray-200 text-lg max-w-lg mx-auto">
                    We'd love to hear from you. Fill out the form below or reach us directly.
                </p>
            </div>
        </div>

        {/* --- 2. CONTACT FORM & INFO --- */}
        <div className="max-w-[1500px] mx-auto px-6 py-20 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">

                {/* Left Side: Contact Info */}
                <div className="md:w-1/3 space-y-8 mt-4">
                    <div>
                        <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">
                            Get in Touch
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Let's Chat
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Have any questions about production tracking, bulk orders, or pricing? Our team is ready to answer all your questions.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Address */}
                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#151f32] shadow-lg flex items-center justify-center text-teal-500 text-xl border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-300">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Address</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">123 Garment St, Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#151f32] shadow-lg flex items-center justify-center text-teal-500 text-xl border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-300">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Email</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">support@textrack.com</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#151f32] shadow-lg flex items-center justify-center text-teal-500 text-xl border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-300">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Phone</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+880 171 000 0000</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className="md:w-2/3">
                    <div className="relative bg-white dark:bg-[#151f32] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500"></div>

                        <div className="p-8 md:p-10">
                            <form onSubmit={handleSendMessage} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label pl-0"><span className="label-text font-bold text-gray-700 dark:text-gray-300">Name</span></label>
                                        <input 
                                            type="text" 
                                            placeholder="Your Name" 
                                            className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                                            required 
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label pl-0"><span className="label-text font-bold text-gray-700 dark:text-gray-300">Email</span></label>
                                        <input 
                                            type="email" 
                                            placeholder="Your Email" 
                                            className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pl-0"><span className="label-text font-bold text-gray-700 dark:text-gray-300">Subject</span></label>
                                    <input 
                                        type="text" 
                                        placeholder="Topic of inquiry" 
                                        className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                                        required 
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label pl-0"><span className="label-text font-bold text-gray-700 dark:text-gray-300">Message</span></label>
                                    <textarea 
                                        className="textarea h-32 w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                                        placeholder="Write your message here..." 
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-control mt-4">
                                    <button className="btn border-0 text-white font-bold text-base uppercase tracking-wider bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg hover:shadow-teal-500/30 transition-all">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Contact;