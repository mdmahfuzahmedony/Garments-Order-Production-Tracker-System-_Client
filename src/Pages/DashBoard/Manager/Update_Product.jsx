import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

const Update_Product = () => {
  const { id } = useParams();

  // ডাটা লোড করা
  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:2001/garments-products/${id}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-20 text-white">Loading...</div>;
  }

  // আগের ডাটাগুলো ডিফল্ট ভ্যালু হিসেবে নেওয়ার জন্য
  const {
    name,
    category,
    price,
    quantity,
    moq,
    description,
    image,
    video,
    paymentOption,
    showOnHome,
  } = product;

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedProductInfo = {
      name: form.name.value,
      category: form.category.value,
      price: form.price.value,
      quantity: form.quantity.value,
      moq: form.moq.value,
      description: form.description.value,
      image: form.image.value,
      video: form.video.value,
      paymentOption: form.paymentOption.value,
      showOnHome: form.showOnHome.checked, // চেকবক্সের জন্য checked ভ্যালু নিতে হয়
    };

    try {
      const res = await axios.put(
        `http://localhost:2001/garments-products/${id}`,
        updatedProductInfo
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Product Updated Successfully",
          icon: "success",
          background: "#1f2937", // Dark Alert
          color: "#fff",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Update Failed",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Top Search Bar (Requested) */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-purple-400">
          Manage Product Update
        </h2>
        <div className="join">
          <input
            className="input input-bordered join-item bg-gray-700 text-white border-gray-600"
            placeholder="Search product to update..."
          />
          <button className="btn join-item rounded-r-full bg-purple-600 border-none text-white hover:bg-purple-700">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-gray-800 p-10 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-8 text-purple-500">
          Update Product
        </h2>

        <form onSubmit={handleUpdateProduct}>
          {/* Row 1: Name & Category */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  Product Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                placeholder="Product Title"
                className="input input-bordered w-full bg-gray-700 border-gray-600 text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  Category
                </span>
              </label>
              <select
                name="category"
                defaultValue={category || "Shirt"}
                className="select select-bordered w-full bg-gray-700 border-gray-600 text-white"
              >
                <option>Shirt</option>
                <option>Pant</option>
                <option>T-Shirt</option>
                <option>Jacket</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price, Qty, MOQ */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="form-control w-full md:w-1/3">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  Price ($)
                </span>
              </label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                placeholder="0"
                className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/3">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  Available Qty
                </span>
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={quantity}
                placeholder="0"
                className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="form-control w-full md:w-1/3">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  MOQ (Min Order Qty)
                </span>
              </label>
              <input
                type="number"
                name="moq"
                defaultValue={moq}
                placeholder="Min Order Qty"
                className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text text-gray-300 font-semibold">
                Description
              </span>
            </label>
            <textarea
              name="description"
              defaultValue={description}
              className="textarea textarea-bordered h-24 bg-gray-700 border-gray-600 text-white"
              placeholder="Product details..."
            ></textarea>
          </div>

          {/* Row 4: Image URL & Video Link */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  Product Image URL
                </span>
              </label>
              <input
                type="text"
                name="image"
                defaultValue={image}
                placeholder="Paste image link here (http://...)"
                className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  Demo Video Link (Optional)
                </span>
              </label>
              <input
                type="text"
                name="video"
                defaultValue={video}
                placeholder="https://youtube.com/..."
                className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Row 5: Payment & Checkbox */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text text-gray-300 font-semibold">
                  Payment Options
                </span>
              </label>
              <select
                name="paymentOption"
                defaultValue={paymentOption}
                className="select select-bordered w-full bg-gray-700 border-gray-600 text-white"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Bkash">Bkash</option>
                <option value="Nagad">Nagad</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <div className="form-control w-full md:w-1/2 mt-8">
              <label className="cursor-pointer label justify-start gap-4">
                <input
                  type="checkbox"
                  name="showOnHome"
                  defaultChecked={showOnHome}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text text-gray-300 font-semibold text-lg">
                  Show on Home Page
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <button className="btn bg-purple-600 hover:bg-purple-700 text-white border-none w-full font-bold text-xl uppercase tracking-wider">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_Product;
