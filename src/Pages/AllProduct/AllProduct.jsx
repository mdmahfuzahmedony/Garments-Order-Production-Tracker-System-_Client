import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';

const AllProduct = () => {
    // 1. State for Search and Sort
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState(''); 

    // 2. Fetching Data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/garments-products');
            return res.data;
        }
    });

    // 3. Loading & Error Handling
    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
    if (error) return <div className="text-center mt-20 text-red-500">Something went wrong: {error.message}</div>;

    // 4. Client-side Filter & Sort Logic (FIXED)
    let displayedProducts = products
        .filter(item => {
            // ফিক্স ১: name অথবা productName যেটা পাবে সেটা নেবে। না পেলে খালি স্ট্রিং "" ধরবে।
            const name = item.name || item.productName || "";
            return name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price; 
            if (sortOrder === 'desc') return b.price - a.price; 
            return 0;
        });

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">All Collections</h2>

            <div className="flex flex-col md:flex-row gap-6">
                
                {/* --- Sidebar (Search & Filter) --- */}
                <div className="w-full sticky md:w-1/4 bg-base-200 p-5 rounded-lg h-fit">
                    <h3 className="text-xl font-semibold mb-4">Filter Options</h3>
                    
                    {/* Search Input */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Search Product</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Type here..." 
                            className="input input-bordered w-full" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Sort by Price</span>
                        </label>
                        <select 
                            className="select select-bordered w-full"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>

                    <button 
                        className="btn btn-neutral w-full mt-6"
                        onClick={() => { setSearchTerm(''); setSortOrder(''); }}
                    >
                        Reset Filters
                    </button>
                </div>

                {/* --- Product Grid --- */}
                <div className="w-full md:w-3/4">
                    <p className="mb-4 font-semibold text-gray-500">
                        Showing {displayedProducts.length} products
                    </p>

                    {displayedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedProducts.map((product) => (
                                <div key={product._id} className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300">
                                    <figure className="px-4 pt-4 h-64 overflow-hidden bg-gray-100">
                                        {/* ফিক্স ২: ইমেজের সোর্স ঠিক করা হয়েছে */}
                                        <img 
                                            src={product.image || (product.images && product.images[0]) || "https://via.placeholder.com/150"} 
                                            alt={product.name || product.productName} 
                                            className="rounded-xl h-full w-full object-cover hover:scale-105 transition-transform" 
                                        />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        {/* ফিক্স ৩: নামের সোর্স ঠিক করা হয়েছে */}
                                        <h2 className="card-title text-lg">{product.name || product.productName}</h2>
                                        <div className="badge badge-secondary badge-outline">{product.category}</div>
                                        
                                        <div className="my-2">
                                            <p className="text-xl font-bold text-primary">${product.price}</p>
                                            <p className="text-sm text-gray-500">Available: {product.availableQuantity}</p>
                                        </div>
                                        
                                        <div className="card-actions w-full">
                                            <Link 
                                                to={`/product-details/${product._id}`} 
                                                className="btn btn-primary w-full"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-20 text-gray-500">
                            <h3 className="text-2xl">No Products Found!</h3>
                            <p>Try changing your search term.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AllProduct;