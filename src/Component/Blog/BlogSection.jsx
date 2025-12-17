import React from 'react';
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const BlogSection = () => {
    const blogPosts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop",
            title: "Can Textiles Lead The Way During The Pandemic?",
            date: "February 4, 2025",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes.",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1605218427368-354955aa6b25?q=80&w=600&auto=format&fit=crop",
            title: "Role of Fashion Merchandising in Apparel Industry",
            date: "February 4, 2025",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes.",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
            title: "One Stop Solution for Textiles Fabrics Materials",
            date: "February 4, 2025",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes.",
        }, 
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop",
            title: "Sustainable Fashion: The Future of Garments",
            date: "February 5, 2025",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes.",
        }
    ];

    return (
        // 1. Background: 
        // - Uses 'bg-gradient-to-l' so color flows from RIGHT to LEFT.
        // - Right side is lighter/colorful, Left side matches the site theme.
        <section className="py-20 relative overflow-hidden font-sans transition-colors duration-300
            bg-gradient-to-l from-teal-50/50 via-gray-50 to-gray-50
            dark:from-[#0b1d2e] dark:via-[#06131c] dark:to-[#03131E]">
            
            {/* Background Texture (Dots) */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)",
                    backgroundSize: "25px 25px",
                }}
            ></div>

            {/* --- RIGHT SIDE COLOR GLOW (Special Request) --- */}
            {/* This adds a big soft Teal light on the right side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1500px] mx-auto px-6 relative z-10">
                
                {/* Header Text */}
                <div className="text-center mb-16 space-y-4">
                    <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm">
                        Our Blog
                    </p>
                    <h2 className="text-4xl font-extrabold transition-colors duration-300 text-gray-900 dark:text-white">
                        Latest Blog &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                            Articles
                        </span>
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Merchandising acts as the bridge between design and production.Learn how effective planning ensures the right product reaches the right market at the right time.
          </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {blogPosts.map((post) => (
                        <div 
                            key={post.id} 
                            // 2. Card Styles
                            className="group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 overflow-hidden
                            bg-white dark:bg-[#151f32]
                            border-gray-100 dark:border-gray-800
                            shadow-sm hover:shadow-2xl hover:shadow-teal-500/10"
                        >
                            
                            {/* --- TOP ACCENT LINE ANIMATION --- */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            {/* TOP SECTION: Image (Left) + Title/Info (Right) */}
                            <div className="flex flex-col sm:flex-row gap-6 mb-5">
                                
                                {/* 1. IMAGE BOX (Left) */}
                                <div className="w-full sm:w-1/2 overflow-hidden rounded-xl h-48 sm:h-auto">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                    />
                                </div>

                                {/* 2. OTHER INFO BOX (Right) */}
                                <div className="w-full sm:w-1/2 flex flex-col justify-center">
                                    {/* Meta Data */}
                                    <div className="flex items-center gap-3 text-xs mb-3 transition-colors duration-300 text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1 font-semibold">
                                            <FaCalendarAlt className="text-teal-500 text-sm" /> {post.date}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold leading-tight mb-4 transition-colors duration-300 cursor-pointer text-gray-900 dark:text-white group-hover:text-teal-500">
                                        {post.title}
                                    </h3>

                                    {/* Read More Link */}
                                    <a href="#" className="inline-flex items-center font-bold text-sm hover:gap-2 transition-all gap-1 mt-auto text-teal-600 dark:text-teal-400">
                                        Read More <FaArrowRight />
                                    </a>
                                </div>
                            </div>

                            {/* BOTTOM SECTION: Description */}
                            <div className="w-full border-t pt-4 transition-colors duration-300 border-gray-100 dark:border-gray-700">
                                <p className="text-sm leading-relaxed transition-colors duration-300 text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {post.desc}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;