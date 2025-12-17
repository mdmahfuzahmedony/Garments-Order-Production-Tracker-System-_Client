import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ProductCard from "../../Component/ProductCard/PrpductCard";

const AllProduct = () => {
  // 1. States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // প্রতি পেজে ৬টি করে প্রোডাক্ট দেখাবে

  // 2. Fetching Data (Public API)
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:2001/garments-products");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#0b1120]">
        <span className="loading loading-bars loading-lg text-teal-400"></span>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center mt-20 text-red-500">
        Error: {error.message}
      </div>
    );

  // 3. Filter & Sort Logic
  let filteredProducts = products
    .filter((item) => {
      const name = item.name || item.productName || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  // 4. Pagination Logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // পেজ চেঞ্জ হ্যান্ডলার
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // পেজ চেঞ্জ হলে উপরে স্ক্রল করবে
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120] py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
          Our <span className="text-teal-500">Collections</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- SIDEBAR (Filter & Search) --- */}
          <div className="w-full lg:w-1/4 bg-white dark:bg-[#151f32] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700">
              Filters
            </h3>

            {/* Search Input */}
            <div className="form-control mb-6">
              <label className="label font-semibold text-gray-600 dark:text-gray-300">
                Search Product
              </label>
              <input
                type="text"
                placeholder="e.g. Cotton Shirt"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:border-teal-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // সার্চ করলে ১ নম্বর পেজে ফেরত যাবে
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="form-control mb-6">
              <label className="label font-semibold text-gray-600 dark:text-gray-300">
                Sort by Price
              </label>
              <select
                className="select select-bordered w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:border-teal-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>

            <button
              className="btn btn-neutral w-full bg-gray-800 hover:bg-gray-900 text-white border-0"
              onClick={() => {
                setSearchTerm("");
                setSortOrder("");
                setCurrentPage(1);
              }}
            >
              Reset Filters
            </button>
          </div>

          {/* --- PRODUCT GRID --- */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="font-semibold text-gray-500 dark:text-gray-400">
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                {totalItems} products
              </p>
            </div>

            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* --- PAGINATION CONTROLS --- */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    <button
                      className="btn btn-circle btn-outline border-gray-300 dark:border-gray-600 hover:bg-teal-500 hover:border-teal-500 hover:text-white"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FaAngleLeft />
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-circle border-gray-300 dark:border-gray-600 ${
                          currentPage === idx + 1
                            ? "bg-teal-500 text-white border-teal-500 hover:bg-teal-600"
                            : "btn-outline hover:bg-teal-500 hover:border-teal-500 hover:text-white"
                        }`}
                        onClick={() => handlePageChange(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    ))}

                    <button
                      className="btn btn-circle btn-outline border-gray-300 dark:border-gray-600 hover:bg-teal-500 hover:border-teal-500 hover:text-white"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <FaAngleRight />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-[#151f32] rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-400">
                  No Products Found!
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
