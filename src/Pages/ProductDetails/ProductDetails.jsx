import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider"; 
import ProductCard from "../../Pages/ProductDetails/ProductDetails"; 

// হুকগুলো না থাকলে নিচের লাইনগুলো কমেন্ট আউট করে ম্যানুয়াল ভ্যালু বসাবেন
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useManager from "../../Hooks/useManager/useManager";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // রোল ম্যানেজমেন্ট (আপনার হুক অনুযায়ী)
  const [isAdmin] = useAdmin();
  const [isManager] = useManager();

  const [activeImage, setActiveImage] = useState("");

  // 1. Fetch Single Product Details
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://garments-order-production-tracker-s-nu.vercel.app/garments-products/${id}`
      );
      return res.data;
    },
  });

  // 2. Fetch All Products (For Related Items)
  const { data: allProducts = [] } = useQuery({
    queryKey: ["relatedProducts"],
    queryFn: async () => {
      const res = await axios.get(
        "https://garments-order-production-tracker-s-nu.vercel.app/garments-products"
      );
      return res.data;
    },
  });

  // 3. Set Default Image when product loads
  useEffect(() => {
    if (product) {
      if (Array.isArray(product.images) && product.images.length > 0) {
        setActiveImage(product.images[0]);
      } else if (product.image) {
        setActiveImage(product.image);
      } else {
        setActiveImage("https://via.placeholder.com/400");
      }
    }
  }, [product]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#03131E]">
        <span className="loading loading-bars loading-lg text-teal-500"></span>
      </div>
    );

  if (error || !product)
    return (
      <div className="flex justify-center items-center h-screen bg-[#03131E]">
        <div className="text-center text-red-500 font-bold text-xl">
          Error loading product! Please try again later.
        </div>
      </div>
    );

  // Safe Values
  const safeName = product.productName || product.name || "Unnamed Product";
  const safePrice = product.price || 0;
  const safeDescription = product.description || "No description available for this product.";
  const safeCategory = product.category || "General";
  const safeStock = product.availableQuantity ?? product.quantity ?? 0;
  const safeMOQ = product.minOrderQuantity || product.moq || 1;
  const safePayment = product.paymentMethod || product.paymentOption || "Cash on Delivery";
  const safeVideo = product.demoVideo || product.videoLink || product.video || "";

  const imageList =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  // 4. Filter Related Products
  const relatedProducts = allProducts
    .filter(
      (item) => item.category === safeCategory && item._id !== product._id
    )
    .slice(0, 3);

  const isButtonDisabled = isAdmin || isManager || safeStock < 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#03131E] transition-colors duration-300 py-10">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* --- Breadcrumb (Optional) --- */}
        <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400 mb-6">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/all-products">Products</Link></li>
                <li className="text-teal-500 font-semibold">{safeName}</li>
            </ul>
        </div>

        {/* --- Main Section: Details --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white dark:bg-[#0b1120] p-6 lg:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          
          {/* --- Left Side: Image Gallery --- */}
          <div className="flex flex-col gap-5">
            {/* Main Image */}
            <div className="h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#151f32] relative group">
              <img
                src={activeImage || "https://via.placeholder.com/400"}
                alt={safeName}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              {safeStock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-extrabold text-3xl rotate-[-12deg] border-4 border-white p-4 rounded tracking-widest uppercase">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {imageList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {imageList.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                      activeImage === img
                        ? "border-teal-500 opacity-100 ring-2 ring-teal-500/30"
                        : "border-transparent opacity-60 hover:opacity-100 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* --- Right Side: Product Info --- */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <span className="badge badge-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800 font-bold uppercase tracking-wide text-xs">
                    {safeCategory}
                 </span>
                 {safeStock > 0 ? (
                    <span className="badge badge-lg badge-success badge-outline text-xs font-bold gap-1">In Stock</span>
                 ) : (
                    <span className="badge badge-lg badge-error badge-outline text-xs font-bold gap-1">Stock Out</span>
                 )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                {safeName}
              </h1>

              <div className="flex items-end gap-3 mb-6">
                <p className="text-4xl font-extrabold text-teal-600 dark:text-teal-400">
                    ${safePrice}
                </p>
                {/* Optional: Discount or Old Price logic could go here */}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6 border-l-4 border-teal-500 pl-4">
                {safeDescription}
              </p>

              {/* Key Features Table */}
              <div className="bg-gray-50 dark:bg-[#151f32] rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="group">
                      <td className="py-3 font-semibold text-gray-500 dark:text-gray-400">Minimum Order</td>
                      <td className="py-3 font-bold text-gray-800 dark:text-gray-200 text-right">{safeMOQ} Units</td>
                    </tr>
                    <tr className="group">
                      <td className="py-3 font-semibold text-gray-500 dark:text-gray-400">Available Stock</td>
                      <td className={`py-3 font-bold text-right ${safeStock > 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {safeStock} Items
                      </td>
                    </tr>
                    <tr className="group">
                      <td className="py-3 font-semibold text-gray-500 dark:text-gray-400">Payment Option</td>
                      <td className="py-3 text-right">
                        <span className="badge bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 font-mono">
                            {safePayment}
                        </span>
                      </td>
                    </tr>
                    {safeVideo && (
                      <tr className="group">
                        <td className="py-3 font-semibold text-gray-500 dark:text-gray-400">Product Demo</td>
                        <td className="py-3 text-right">
                          <a
                            href={safeVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-500 font-bold hover:underline transition-all"
                          >
                            Watch Video
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              {user ? (
                isButtonDisabled ? (
                  <button className="btn btn-lg w-full bg-gray-300 dark:bg-gray-700 text-gray-500 border-none cursor-not-allowed" disabled>
                    {isAdmin || isManager
                      ? "Admin/Manager Restricted"
                      : "Currently Out of Stock"}
                  </button>
                ) : (
                  <Link
                    to={`/book-product/${product._id}`}
                    className="btn btn-lg w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold border-none shadow-lg shadow-teal-500/30 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Book This Product
                  </Link>
                )
              ) : (
                <Link to="/login" className="btn btn-lg btn-neutral w-full shadow-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  Login to Order
                </Link>
              )}
              <p className="text-xs text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Orders require manager approval before processing.
              </p>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Related Products --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Related Products</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">More items from the {safeCategory} category</p>
                </div>
                <Link to="/all-products" className="btn btn-outline btn-sm text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-800 dark:text-teal-400">View All</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;