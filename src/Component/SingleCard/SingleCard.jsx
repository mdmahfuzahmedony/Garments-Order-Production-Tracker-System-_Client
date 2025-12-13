import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    // ১. প্রোডাক্ট না থাকলে বা অবজেক্ট না হলে রিটার্ন নাল
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
        availableQuantity
    } = product;

    // ২. নাম ফিক্স (Name Fix)
    const displayTitle = productName || name || "Unnamed Product";

    // ৩. ইমেজ ফিক্স (Image Fix) - এটাই মেইন সমস্যা ছিল
    // যদি images অ্যারে হয় তবেই সেটার লেন্থ চেক করবে, নাহলে খালি অ্যারে ধরবে
    const imageList = Array.isArray(images) ? images : [];
    
    // ডিসপ্লে ইমেজ লজিক: অ্যারেতে ইমেজ থাকলে প্রথমটা, না থাকলে সিঙ্গেল image, তাও না থাকলে প্লেসহোল্ডার
    const displayImage = imageList.length > 0 
        ? imageList[0] 
        : (image || "https://via.placeholder.com/300");

    // ৪. স্টক ফিক্স (Stock Fix)
    const currentStock = availableQuantity ?? quantity ?? 0;

    return (
        <div className="rounded-3xl card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden flex flex-col h-full">

            {/* Image Section */}
            <figure className="h-[250px] w-full overflow-hidden relative">
                <img
                    src={displayImage}
                    alt={displayTitle}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-3 right-3 badge badge-secondary shadow-md font-semibold">
                    {category || "N/A"}
                </div>
            </figure>

            {/* Body Section */}
            <div className="card-body flex flex-col justify-between">
                <div>
                    {/* Title with Length Check */}
                    <h2 className="card-title text-lg font-bold text-gray-800" title={displayTitle}>
                        {displayTitle.length > 25 ? displayTitle.slice(0, 25) + "..." : displayTitle}
                    </h2>

                    {/* Price & Stock */}
                    <div className="flex justify-between items-center my-2">
                        <p className="text-xl font-bold text-primary">${price}</p>

                        <div className={`badge badge-outline ${currentStock > 0 ? "badge-success" : "badge-error"}`}>
                            {currentStock > 0 ? `Stock: ${currentStock}` : "Out of Stock"}
                        </div>
                    </div>
                </div>

                {/* View Details */}
                <div className="card-actions justify-end mt-2">
                    <Link
                        to={`/product-details/${_id}`}
                        className="btn btn-sm btn-primary rounded-2xl font-bold text-white w-full"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;