import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowRight, FaEye } from "react-icons/fa";
import { Link } from "react-router";

const HomeProduct = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await axios.get(
        "https://garments-order-production-tracker-s-nu.vercel.app/garments-products"
      );
      // Filter: showOnHome: true and slice first 6
      return res.data.filter((item) => item.showOnHome === true).slice(0, 6);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32 bg-gray-50 dark:bg-[#03131E]">
        <span className="loading loading-bars loading-lg text-teal-400"></span>
      </div>
    );
  }

  return (
    // 1. Background: Updated to Gradient (Matched with Hero & CTA)
    // Light: Gray to Teal Fade | Dark: Footer Color (#03131E) -> Site Theme (#0b1120)
    <section
      className="py-20 relative overflow-hidden transition-colors duration-300 font-sans
      bg-gradient-to-br from-gray-50 to-teal-50/30 
      dark:from-[#03131E] dark:to-[#0b1120]"
    >
      {/* Background Texture (Teal Dots) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-sm mb-2">
              Exclusive Collection
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Discover Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                Best Garments
              </span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              Premium quality fabrics crafted for comfort and durability. Order
              bulk or customize your needs.
            </p>
          </div>

          <Link
            to="/all-products"
            className="group flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-teal-500 transition-all"
          >
            View All Products
            <span className="group-hover:translate-x-1 transition-transform text-teal-500">
              <FaArrowRight />
            </span>
          </Link>
        </div>

        {/* --- PRODUCTS GRID --- */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#151f32] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-xl text-gray-400">
              No featured products currently available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white dark:bg-[#151f32] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Optional: Top Accent Line Animation (Added for consistency with other cards) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></div>

                {/* Image Section */}
                <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Buttons on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link
                      to={`/product-details/${product._id}`}
                      className="btn btn-circle bg-white text-gray-900 hover:bg-teal-500 hover:text-white border-0 shadow-lg"
                      title="View Details"
                    >
                      <FaEye className="text-lg" />
                    </Link>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {product.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-xs font-mono text-gray-400">
                      MOQ:{" "}
                      <span className="text-gray-600 dark:text-gray-300 font-bold">
                        {product.moq}
                      </span>
                    </div>

                    <Link
                      to={`/product-details/${product._id}`}
                      className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 hover:gap-3 transition-all group-hover:text-teal-500"
                    >
                      View Details <FaArrowRight className="text-teal-500" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeProduct;
