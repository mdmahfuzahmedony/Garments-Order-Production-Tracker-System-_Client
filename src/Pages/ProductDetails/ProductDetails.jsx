import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../Provider/Authprovider'; // তোমার AuthContext পাথ ঠিক করো
import ProductCard from '../../Component/SingleCard/SingleCard'; // আগের তৈরি করা কার্ড ইম্পোর্ট করো

const ProductDetails = () => {
    const { id } = useParams();
    // const { user } = useContext(AuthContext); // ইউজার ইনফো লাগবে রোলের জন্য
    
    // TODO: তোমার যদি useAdmin বা useManager হুক থাকে, সেগুলো এখানে কল করবে
    // const [isAdmin] = useAdmin();
    // const [isManager] = useManager();
    // টেস্টিংয়ের জন্য আমি ধরে নিচ্ছি ইউজার বায়ার
    const isAdmin = false; 
    const isManager = false;
    const user = { email: "test@user.com" }; // ডামি ইউজার (লগইন থাকলে এটা Context থেকে আসবে)

    const [activeImage, setActiveImage] = useState('');

    // 1. Fetch Single Product Details
    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:2001/garments-products/${id}`);
            return res.data;
        }
    });

    // 2. Fetch All Products (For Related Items)
    const { data: allProducts = [] } = useQuery({
        queryKey: ['relatedProducts'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:2001/garments-products');
            return res.data;
        }
    });

    // 3. Set Default Image when product loads
    useEffect(() => {
        if (product?.images?.length > 0) {
            setActiveImage(product.images[0]);
        }
    }, [product]);

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
    if (error) return <div className="text-center mt-20 text-red-500">Error loading product!</div>;

    // 4. Filter Related Products (Same Category, excluding current product)
    const relatedProducts = allProducts
        .filter(item => item.category === product.category && item._id !== product._id)
        .slice(0, 3); // মাত্র ৩টা দেখাবো

    // Button Logic
    const isButtonDisabled = isAdmin || isManager || product.availableQuantity < 1;

    return (
        <div className="container mx-auto px-4 py-10">
            
            {/* --- Top Section: Details --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-100 p-6 rounded-xl shadow-sm border border-gray-100">
                
                {/* --- Left Side: Image Gallery --- */}
                <div className="flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="h-[400px] w-full overflow-hidden rounded-lg border bg-gray-50 relative group">
                        <img 
                            src={activeImage || 'https://via.placeholder.com/400'} 
                            alt={product.productName} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        />
                        {product.availableQuantity === 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-bold text-2xl rotate-[-15deg] border-4 p-4 rounded">OUT OF STOCK</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Thumbnails */}
                    {product.images?.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <img 
                                    key={idx}
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${activeImage === img ? 'border-primary scale-95' : 'border-transparent hover:border-gray-300'}`}
                                    onClick={() => setActiveImage(img)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* --- Right Side: Product Info --- */}
                <div className="space-y-6">
                    <div>
                        <div className="badge badge-secondary badge-outline mb-2">{product.category}</div>
                        <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-justify">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-6 p-4 bg-base-200 rounded-lg">
                        <div>
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-3xl font-bold text-primary">${product.price}</p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div>
                            <p className="text-sm text-gray-500">Stock Status</p>
                            <p className={`font-semibold ${product.availableQuantity > 0 ? 'text-success' : 'text-error'}`}>
                                {product.availableQuantity > 0 ? `${product.availableQuantity} Available` : 'Out of Stock'}
                            </p>
                        </div>
                    </div>

                    {/* Key Features Table */}
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <td className="font-semibold text-gray-500">Minimum Order:</td>
                                    <td>{product.minOrderQuantity} Units</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold text-gray-500">Payment Option:</td>
                                    <td>
                                        <span className="badge badge-ghost">{product.paymentMethod}</span>
                                    </td>
                                </tr>
                                {product.demoVideo && (
                                    <tr>
                                        <td className="font-semibold text-gray-500">Demo Video:</td>
                                        <td>
                                            <a href={product.demoVideo} target="_blank" rel="noopener noreferrer" className="link link-primary flex items-center gap-1">
                                                Watch Video 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-gray-200">
                        {user ? (
                            isButtonDisabled ? (
                                <button className="btn btn-disabled w-full" disabled>
                                    {isAdmin || isManager ? "Admins/Managers Cannot Order" : "Out of Stock"}
                                </button>
                            ) : (
                                <Link 
                                    to={`/dashboard/booking/${product._id}`} 
                                    className="btn btn-primary w-full text-lg font-bold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                                >
                                    Book This Product
                                </Link>
                            )
                        ) : (
                            <Link to="/login" className="btn btn-neutral w-full">
                                Login to Order
                            </Link>
                        )}
                        <p className="text-xs text-center text-gray-400 mt-2">
                            *Orders are subject to approval by the manager.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Bottom Section: Related Products --- */}
            {relatedProducts.length > 0 && (
                <div className="mt-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold">Related Products</h2>
                        <div className="h-[1px] bg-gray-300 flex-grow"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedProducts.map(item => (
                            <ProductCard key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;