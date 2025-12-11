import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Production Manager, Apex Textiles",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment:
        "We used to struggle with manual counting. After switching to GarmentsTracker, our daily production efficiency increased by 25%. Highly recommended!",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Owner, Fashion Line Export",
      image:
        "https://images.unsplash.com/photo-1573496359-7013ac2bebb5?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment:
        "The dashboard is incredibly user-friendly. Even my non-tech supervisors can operate it easily via tablets. It changed how we manage shipments.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Merchandiser, Global Knitwear",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      rating: 4,
      comment:
        "Transparency is key for buyers. This software allows us to generate real-time reports that we can share directly with our clients.",
    },
  ];

  return (
    // Main Section: Light Mode = Light Gray, Dark Mode = Very Dark Navy
    <section className="py-24 transition-colors duration-300 bg-gray-50 dark:bg-[#020d14] font-sans">
      <div className="max-w-[1500px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#8CD6B3] font-bold tracking-widest uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 transition-colors duration-300 text-[#03131E] dark:text-white">
            Trusted by <span className="text-[#8CD6B3]">Industry Leaders</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto transition-colors duration-300 text-gray-500 dark:text-gray-400">
            See what factory owners and production managers are saying about our
            automation system.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              // ১. 'relative' এবং 'overflow-hidden' দেওয়া হয়েছে বর্ডার এনিমেশনের জন্য
              className="relative p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden
                            bg-white shadow-xl shadow-gray-200/50 
                            dark:bg-[#0E2A3B] dark:shadow-none dark:border dark:border-gray-800"
            >
              {/* --- TOP ACCENT LINE ANIMATION (Added here) --- */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#03131E] to-[#8CD6B3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-4xl opacity-20 text-[#03131E] dark:text-[#8CD6B3]">
                <FaQuoteLeft />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating
                        ? "fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>

              {/* Comment Text */}
              <p className="mb-8 leading-relaxed italic text-lg transition-colors duration-300 text-gray-600 dark:text-gray-300">
                "{review.comment}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 border-t pt-6 transition-colors duration-300 border-gray-100 dark:border-gray-700">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#8CD6B3]"
                />
                <div>
                  <h4 className="font-bold text-base transition-colors duration-300 text-[#03131E] dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-xs transition-colors duration-300 text-gray-500 dark:text-gray-400">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;