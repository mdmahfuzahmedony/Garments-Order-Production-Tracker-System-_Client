import React from "react";
// Swiper React Components
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper Modules
import { Autoplay, Pagination } from "swiper/modules";
// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

import { FaStar, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Production Manager",
      company: "Apex Textiles",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "We used to struggle with manual counting. After switching to GarmentsTracker, our daily production efficiency increased by 25%. The system is absolutely flawless for large factories.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Factory Owner",
      company: "Fashion Line Export",
      image: "https://images.unsplash.com/photo-1573496359-7013ac2bebb5?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "The dashboard is incredibly user-friendly. Even my non-tech supervisors can operate it easily via tablets. It changed how we manage shipments and inventory tracking.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Merchandiser",
      company: "Global Knitwear",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      rating: 4,
      comment: "Transparency is key for buyers. This software allows us to generate real-time reports that we can share directly with our clients. Highly recommended for compliance.",
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Quality Controller",
      company: "Urban Fabrics",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "Quality control became so much easier. We can now track defects in real-time and reduce wastage significantly. Great support team as well.",
    },
  ];

  return (
    // 1. Background: Matched with HomeProduct & CTA (Gradient)
    <section className="py-24 font-sans relative overflow-hidden transition-colors duration-300
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
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm">
            Client Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold transition-colors duration-300 text-gray-900 dark:text-white">
            What People{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              Say
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Finding a manufacturer who understands complex designs is difficult. Textilery not only matched our fabric requirements perfectly but also delivered the samples faster than we expected. Their finishing quality is world-class.
          </p>
        </div>

        {/* --- SWIPER SLIDER --- */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            // Custom Styling for pagination dots is usually handled in CSS, 
            // but Tailwind classes work on the wrapper.
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className="pb-16" // Extra padding bottom for pagination dots
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div
                // Card Styling: Matched with HomeProduct & Blog Cards
                className="group h-full p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 overflow-hidden relative
                bg-white dark:bg-[#151f32] 
                border-gray-100 dark:border-gray-800
                shadow-sm hover:shadow-2xl hover:shadow-teal-500/10"
              >
                {/* Top Accent Line Animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* --- TOP SECTION: Image (Left) + Info (Right) --- */}
                <div className="flex flex-row gap-5 mb-5 items-center">
                  
                  {/* Image Box */}
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-100 dark:border-gray-700 group-hover:border-teal-400 transition-colors duration-300">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="flex flex-col justify-center">
                    {/* Rating Stars */}
                    <div className="flex gap-1 text-yellow-400 text-xs mb-2">
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

                    {/* Name & Role */}
                    <h3 className="text-lg font-bold leading-tight mb-1 transition-colors duration-300 text-gray-900 dark:text-white group-hover:text-teal-500">
                      {review.name}
                    </h3>
                    <p className="text-sm font-medium transition-colors duration-300 text-gray-500 dark:text-gray-400">
                      {review.role}
                    </p>
                    <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide mt-1">
                      {review.company}
                    </p>
                  </div>
                </div>

                {/* --- BOTTOM SECTION: Description --- */}
                <div className="w-full border-t pt-4 transition-colors duration-300 border-gray-100 dark:border-gray-700">
                  <div className="flex gap-3">
                    <FaQuoteLeft className="text-3xl text-teal-100 dark:text-teal-900/30 flex-shrink-0" />
                    <p className="text-sm leading-relaxed italic transition-colors duration-300 text-gray-600 dark:text-gray-300">
                      "{review.comment}"
                    </p>
                  </div>
                  
                  {/* Case Study Link */}
                  <div className="mt-4 flex justify-end">
                     <a href="#" className="text-xs font-bold flex items-center gap-1 text-gray-900 dark:text-white hover:text-teal-500 transition-colors">
                        View Case Study <FaArrowRight />
                     </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Pagination Style Wrapper (Optional - if needed to color dots) */}
          <style jsx="true">{`
            .swiper-pagination-bullet-active {
              background-color: #14b8a6 !important; /* Teal-500 */
              width: 20px;
              border-radius: 5px;
            }
            .swiper-pagination-bullet {
              background-color: #cbd5e1;
              opacity: 1;
            }
            .dark .swiper-pagination-bullet {
              background-color: #334155;
            }
            .dark .swiper-pagination-bullet-active {
              background-color: #2dd4bf !important; /* Teal-400 */
            }
          `}</style>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;