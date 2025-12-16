import React from "react";
import { useParams, useNavigate } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; 

const Update_Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); 

  // ১. ডাটা লোড করা - লজিক অপরিবর্তিত
  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/garments-products/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
        <span className="loading loading-bars loading-lg text-teal-500"></span>
      </div>
    );
  }

  // ২. সেইফ ভ্যালু সেট করা
  const {
    name,
    category,
    price,
    availableQuantity, 
    quantity, 
    moq,
    description,
    image,
    videoLink, 
    video, 
    paymentOption,
    showOnHome,
  } = product;

  // ৩. আপডেট হ্যান্ডলার - লজিক অপরিবর্তিত
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedProductInfo = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      availableQuantity: parseInt(form.quantity.value),
      moq: parseInt(form.moq.value),
      description: form.description.value,
      image: form.image.value,
      videoLink: form.videoLink.value,
      paymentOption: form.paymentOption.value,
      showOnHome: form.showOnHome.checked,
    };

    try {
      const res = await axiosSecure.put(`/garments-products/${id}`, updatedProductInfo);

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Product Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: '#14b8a6'
        });
        navigate(-1);
      } else {
        Swal.fire("Info", "No changes made to the product.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Update Failed! Only Managers or Admins can update.",
        icon: "error",
      });
    }
  };

  return (
    // 1. Background: Matched with other pages (Gradient & Texture)
    <div className="min-h-screen p-4 md:p-8 font-sans transition-colors duration-300 relative
        bg-gradient-to-br from-gray-50 to-teal-50/30 
        dark:from-[#03131E] dark:to-[#0b1120]">
        
        {/* Background Texture (Dots) */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
        </div>

      {/* Back Button & Header */}
      <div className="relative z-10 max-w-5xl mx-auto mb-8 flex justify-between items-center">
        <button 
            onClick={() => navigate(-1)} 
            className="btn btn-sm btn-ghost text-gray-500 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20"
        >
            <FaArrowLeft /> Back
        </button>
        <div>
            <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs text-center mb-1">Manager Panel</p>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center">
                Update <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Product</span>
            </h2>
        </div>
        <div className="w-16"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white dark:bg-[#151f32] p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
        
        <form onSubmit={handleUpdateProduct} className="space-y-6">
          {/* Row 1: Name & Category */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="form-control w-full md:w-1/2">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Product Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Category</span>
              </label>
              <select
                name="category"
                defaultValue={category || "Shirt"}
                className="select w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
              >
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Jacket">Jacket</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price, Qty, MOQ */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="form-control w-full md:w-1/3">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Price ($)</span>
              </label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/3">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Available Qty</span>
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={availableQuantity || quantity}
                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/3">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">MOQ</span>
              </label>
              <input
                type="number"
                name="moq"
                defaultValue={moq}
                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="form-control w-full">
            <label className="label pl-0">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={description}
              className="textarea h-32 w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
              required
            ></textarea>
          </div>

          {/* Row 4: Image URL & Video Link */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="form-control w-full md:w-1/2">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Product Image URL</span>
              </label>
              <input
                type="text"
                name="image"
                defaultValue={image}
                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Demo Video Link</span>
              </label>
              <input
                type="text"
                name="videoLink"
                defaultValue={videoLink || video}
                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
              />
            </div>
          </div>

          {/* Row 5: Payment & Checkbox */}
          <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 dark:bg-[#0b1120] p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="form-control w-full md:w-1/2">
              <label className="label pl-0">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Payment Options</span>
              </label>
              <select
                name="paymentOption"
                defaultValue={paymentOption || "Cash on Delivery"}
                className="select w-full bg-white dark:bg-[#151f32] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFirst">PayFirst</option>
              </select>
            </div>
            
            <div className="form-control w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
              <label className="cursor-pointer label justify-start gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <input
                  type="checkbox"
                  name="showOnHome"
                  defaultChecked={showOnHome}
                  className="checkbox checkbox-accent checkbox-lg border-2 border-teal-500 checked:border-teal-500 [--chkbg:theme(colors.teal.500)] [--chkfg:white]"
                />
                <span className="label-text font-bold text-lg text-gray-700 dark:text-gray-300">
                  Show on Home Page
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn w-full text-lg font-bold text-white uppercase tracking-wider bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg hover:shadow-teal-500/30 transition-all rounded-xl border-0">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_Product;