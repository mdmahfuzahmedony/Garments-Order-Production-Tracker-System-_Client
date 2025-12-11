import React from 'react';
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";

const BlogSection = () => {
    const blogPosts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop",
            title: "Can Textiles Lead The Way During The Pandemic?",
            date: "February 4, 2025",
            author: "Admin",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1605218427368-354955aa6b25?q=80&w=600&auto=format&fit=crop",
            title: "Role of Fashion Merchandising in Apparel Industry",
            date: "February 4, 2025",
            author: "Admin",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
            title: "One Stop Solution for Textiles Fabrics Materials",
            date: "February 4, 2025",
            author: "Admin",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        }, {
            id: 3,
            image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
            title: "One Stop Solution for Textiles Fabrics Materials",
            date: "February 4, 2025",
            author: "Admin",
            desc: "Lorem ipsum dolor sit consectetuer adipiscing amet elit. Aenean commodo ligula eget dolor. Pretium massa cum natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        }
    ];

    return (
        <section className="bg-white py-16 px-4 font-sans">
            <div className="max-w-[1500px] mx-auto">
                
                {/* Header Text */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[#0e2a3b] font-medium border-b-2 border-[#8CD6B3] pb-1">
                        Our Blog
                    </span>
                    <h2 className="text-4xl font-bold text-[#03131E]">
                        Latest Blog & Articles
                    </h2>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="group bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-lg transition duration-300">
                            
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
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                        <div className="flex items-center gap-1">
                                            <FaCalendarAlt className="text-[#8CD6B3]" /> {post.date}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-[#03131E] leading-tight mb-3 group-hover:text-[#8CD6B3] transition-colors cursor-pointer">
                                        {post.title}
                                    </h3>

                                    {/* Read More Link (Placed here as per 'other section' logic) */}
                                    <a href="#" className="inline-flex items-center text-[#8CD6B3] font-bold text-sm hover:underline gap-1 mt-auto">
                                        Read More <FaArrowRight />
                                    </a>
                                </div>
                            </div>

                            {/* BOTTOM SECTION: Description */}
                            {/* 3. DESCRIPTION (Full Width Below) */}
                            <div className="w-full border-t border-gray-200 pt-4">
                                <p className="text-gray-600 text-sm leading-relaxed">
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