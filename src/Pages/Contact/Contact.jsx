import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {

  const handleSendMessage = (e) => {
    e.preventDefault();
    // এখানে তুমি চাইলে ব্যাকএন্ডে মেইল পাঠানোর লজিক বসাতে পারো
    Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you as soon as possible.',
        showConfirmButton: false,
        timer: 1500
    });
    e.target.reset();
  }

  return (
    <div className="min-h-screen bg-base-200">
        
        {/* --- 1. SIMPLE HERO SECTION --- */}
        <div 
            className="hero h-64" 
            style={{backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop)'}}
        >
            <div className="hero-overlay bg-black bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-white">Contact Us</h1>
                    <p className="mb-5 text-gray-200">We'd love to hear from you. Fill out the form below.</p>
                </div>
            </div>
        </div>

        {/* --- 2. CONTACT FORM & INFO --- */}
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row gap-10">

                {/* Left Side: Contact Info (Simple) */}
                <div className="md:w-1/3 space-y-8 mt-4">
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-2">Get in Touch</h2>
                        <p className="text-gray-500 text-sm">Have any questions about production or tracking? Reach out to us directly.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4 className="font-bold">Address</h4>
                                <p className="text-sm text-gray-500">123 Garment St, Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <p className="text-sm text-gray-500">support@textrack.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <h4 className="font-bold">Phone</h4>
                                <p className="text-sm text-gray-500">+880 171 000 0000</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className="md:w-2/3">
                    <div className="card bg-base-100 shadow-xl border border-gray-100">
                        <div className="card-body">
                            <form onSubmit={handleSendMessage} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Name</span></label>
                                        <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Email</span></label>
                                        <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Subject</span></label>
                                    <input type="text" placeholder="Topic of inquiry" className="input input-bordered w-full" required />
                                </div>

                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Message</span></label>
                                    <textarea className="textarea textarea-bordered h-32" placeholder="Write your message here..." required></textarea>
                                </div>

                                <div className="form-control mt-4">
                                    <button className="btn btn-primary text-white font-bold">Send Message</button>
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