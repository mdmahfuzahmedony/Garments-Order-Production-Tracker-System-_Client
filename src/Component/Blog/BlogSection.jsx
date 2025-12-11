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
        // 1. Main Background: Light = White, Dark = Deep Navy (#020d14)
        <section className="py-20 font-sans transition-colors duration-300 bg-white dark:bg-[#020d14]">
            <div className="max-w-[1500px] mx-auto px-6">
                
                {/* Header Text */}
                <div className="text-center mb-16 space-y-4">
                    <span className="font-medium border-b-2 border-[#8CD6B3] pb-1 transition-colors duration-300 text-[#0e2a3b] dark:text-[#8CD6B3]">
                        Our Blog
                    </span>
                    <h2 className="text-4xl font-bold transition-colors duration-300 text-[#03131E] dark:text-white">
                        Latest Blog & Articles
                    </h2>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {blogPosts.map((post) => (
                        <div 
                            key={post.id} 
                            // 2. Card Styles & Animation Classes
                            className="group relative p-5 rounded-xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden
                            bg-gray-50 border-gray-100 
                            dark:bg-[#0E2A3B] dark:border-gray-800"
                        >
                            
                            {/* --- TOP ACCENT LINE ANIMATION --- */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#03131E] to-[#8CD6B3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            {/* TOP SECTION: Image (Left) + Title/Info (Right) */}
                            <div className="flex flex-row gap-5 mb-5">
                                
                                {/* 1. IMAGE BOX (Left) */}
                                <div className="w-1/2 overflow-hidden rounded-lg">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-40 object-cover transform group-hover:scale-110 transition duration-500"
                                    />
                                </div>

                                {/* 2. OTHER INFO BOX (Right) */}
                                <div className="w-1/2 flex flex-col justify-center">
                                    {/* Meta Data */}
                                    <div className="flex items-center gap-3 text-xs mb-2 transition-colors duration-300 text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <FaCalendarAlt className="text-[#8CD6B3]" /> {post.date}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold leading-tight mb-3 transition-colors duration-300 cursor-pointer text-[#03131E] dark:text-white group-hover:text-[#8CD6B3]">
                                        {post.title}
                                    </h3>

                                    {/* Read More Link */}
                                    <a href="#" className="inline-flex items-center font-bold text-sm hover:underline gap-1 mt-auto text-[#8CD6B3]">
                                        Read More <FaArrowRight />
                                    </a>
                                </div>
                            </div>

                            {/* BOTTOM SECTION: Description */}
                            <div className="w-full border-t pt-4 transition-colors duration-300 border-gray-200 dark:border-gray-700">
                                <p className="text-sm leading-relaxed transition-colors duration-300 text-gray-600 dark:text-gray-300">
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