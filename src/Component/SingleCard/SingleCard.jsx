import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    // তোমার ডাটাবেজের ফিল্ডগুলো এখানে ডিস্ট্রাকচার করলাম
    const { _id, productName, images, price, category, availableQuantity } = product;

    return (
        <div className=" rounded-3xl card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden">

            {/* Image Section */}
            <figure className="h-[250px] w-full overflow-hidden relative">
                <img
                    // images অ্যারের প্রথম ছবিটা দেখাবে, না থাকলে প্লেসহোল্ডার
                    src={images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300'}
                    alt={productName}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Badge on top of image */}
                <div className="absolute top-3 right-3 badge badge-secondary shadow-md font-semibold">
                    {category}
                </div>
            </figure>

            {/* Body Section */}
            <div className="card-body">
                {/* Product Title */}
                <h2 className="card-title text-lg font-bold text-gray-800" title={productName}>
                    {productName.length > 25 ? productName.slice(0, 25) + '...' : productName}
                </h2>

                {/* Price and Stock Info */}
                <div className="flex justify-between items-center my-1">
                    <p className="text-xl font-bold text-primary">
                        ${price}
                    </p>
                    <div className={`badge badge-outline ${availableQuantity > 0 ? 'badge-success' : 'badge-error'}`}>
                        {availableQuantity > 0 ? `Stock: ${availableQuantity}` : 'Out of Stock'}
                    </div>
                </div>

                {/* View Details Button */}
                <div className="card-actions justify-end mt-3">
                    <Link
                        to={`/product-details/${_id}`}
                        className="rounded-2xl font-bold"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;