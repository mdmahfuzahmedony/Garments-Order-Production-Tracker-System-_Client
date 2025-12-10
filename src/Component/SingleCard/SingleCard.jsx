import React from 'react';
import { Link } from 'react-router'; // Link import fix (react-router -> react-router-dom)

const ProductCard = ({ product }) => {
    // যদি কোনো কারণে product ডাটা না আসে, তাহলে কিছুই রেন্ডার করবে না (সেফটি)
    if (!product) {
        return null; 
    }

    // ডাটাবেজের ফিল্ডের নাম এবং কার্ডের নামের অমিল ঠিক করা হলো
    // ডাটাবেসে আছে 'name', 'image', 'quantity'
    // কার্ডে চাইছেন 'productName', 'images', 'availableQuantity'
    const { _id, name, productName, image, images, price, category, quantity, availableQuantity } = product;

    // ১. নাম ঠিক করা (productName না থাকলে name নিবে, সেটাও না থাকলে 'No Name')
    const displayName = productName || name || "Unnamed Product";

    // ২. ছবি ঠিক করা (images অ্যারে না থাকলে single image স্ট্রিং নিবে)
    const displayImage = (images && images.length > 0) ? images[0] : (image || 'https://via.placeholder.com/300');

    // ৩. স্টক ঠিক করা
    const currentStock = availableQuantity || quantity || 0;

    return (
        <div className="rounded-3xl card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden">

            {/* Image Section */}
            <figure className="h-[250px] w-full overflow-hidden relative">
                <img
                    src={displayImage}
                    alt={displayName}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-3 right-3 badge badge-secondary shadow-md font-semibold">
                    {category || 'N/A'}
                </div>
            </figure>

            {/* Body Section */}
            <div className="card-body">
                {/* Product Title (Safe Check) */}
                <h2 className="card-title text-lg font-bold text-gray-800" title={displayName}>
                    {displayName.length > 25 ? displayName.slice(0, 25) + '...' : displayName}
                </h2>

                {/* Price and Stock Info */}
                <div className="flex justify-between items-center my-1">
                    <p className="text-xl font-bold text-primary">
                        ${price}
                    </p>
                    <div className={`badge badge-outline ${currentStock > 0 ? 'badge-success' : 'badge-error'}`}>
                        {currentStock > 0 ? `Stock: ${currentStock}` : 'Out of Stock'}
                    </div>
                </div>

                {/* View Details Button */}
                <div className="card-actions justify-end mt-3">
                    <Link
                        to={`/product-details/${_id}`}
                        className="btn btn-sm btn-primary rounded-2xl font-bold text-white"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;