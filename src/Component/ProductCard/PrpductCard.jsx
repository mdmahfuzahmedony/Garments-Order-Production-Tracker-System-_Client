import React from 'react';
import { Link } from 'react-router';
import { FaArrowRight, FaEye } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    // ১. প্রোডাক্ট ভ্যালিডেশন
    if (!product || typeof product !== "object") {
        return null;
    }

    const {
        _id,
        name,
        productName,
        image,
        images,
        price,
        category,
        quantity,
        availableQuantity,
        description,
        moq
    } = product;

    // ২. নাম ফিক্স
    const displayTitle = productName || name || "Unnamed Product";

    // ৩. ইমেজ ফিক্স
    const imageList = Array.isArray(images) ? images : [];
    const displayImage = imageList.length > 0 
        ? imageList[0] 
        : (image || "https://via.placeholder.com/300");

    // ৪. স্টক ফিক্স
    const currentStock = availableQuantity ?? quantity ?? 0;

    return (
        <div className="group relative bg-white dark:bg-[#151f32] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col h-full">
            
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img 
                    src={displayImage} 
                    alt={displayTitle} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Buttons on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link 
                        to={`/product-details/${_id}`}
                        className="btn btn-circle btn-white text-gray-900 hover:bg-teal-400 hover:text-white border-0 shadow-lg"
                        title="View Details"
                    >
                        <FaEye className="text-lg" />
                    </Link>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {category || "N/A"}
                </div>
                
                {/* Stock Badge (Optional) */}
                <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                    currentStock > 0 ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}>
                    {currentStock > 0 ? 'In Stock' : 'Sold Out'}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors line-clamp-1" title={displayTitle}>
                            {displayTitle}
                        </h3>
                        <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                            ${price}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                        {description || "No description available for this product. Click details to know more."}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    <div className="text-xs font-mono text-gray-400">
                        MOQ: <span className="text-gray-600 dark:text-gray-300 font-bold">{moq || 1}</span>
                    </div>
                    
                    <Link 
                        to={`/product-details/${_id}`}
                        className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 hover:gap-3 transition-all group-hover:text-teal-500"
                    >
                    View Details <FaArrowRight className="text-teal-500" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;