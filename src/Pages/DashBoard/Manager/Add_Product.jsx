import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; 

const Add_Product = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const productData = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: parseFloat(data.price),
      availableQuantity: parseInt(data.quantity),
      moq: parseInt(data.moq),
      image: data.photoUrl,
      videoLink: data.videoLink,
      paymentOption: data.paymentOption,
      showOnHome: data.showOnHome,
      status: "available",
      managerEmail: user?.email, 
      managerName: user?.displayName,
    };

    axiosSecure.post("/garments-products", productData)
      .then((dbRes) => {
        if (dbRes.data.insertedId) {
          reset();
          Swal.fire({
            icon: "success",
            title: "Product Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Could not add product. Please check connection.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    // 1. Background: Matched with other pages (Gradient & Texture)
    <div className="w-full min-h-screen p-6 font-sans transition-colors duration-300 relative
        bg-gradient-to-br from-gray-50 to-teal-50/30 
        dark:from-[#03131E] dark:to-[#0b1120]">
        
        {/* Background Texture (Dots) */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
            {/* Header Text */}
            <div className="mb-8 text-center">
                <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-2">Manager Panel</p>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Add New <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Product</span>
                </h2>
            </div>

            {/* Form Container */}
            <div className="bg-white dark:bg-[#151f32] p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Row 1: Name & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Product Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Ex: Men's Cotton Shirt"
                                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Category</span>
                            </label>
                            <select
                                {...register("category")}
                                className="select w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            >
                                <option value="Shirt">Shirt</option>
                                <option value="Pant">Pant</option>
                                <option value="Jacket">Jacket</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Price, Qty, MOQ */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Price ($)</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: true })}
                                placeholder="0.00"
                                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Available Qty</span>
                            </label>
                            <input
                                type="number"
                                {...register("quantity", { required: true })}
                                placeholder="0"
                                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">MOQ</span>
                            </label>
                            <input
                                type="number"
                                {...register("moq", { required: true })}
                                placeholder="Min Order Qty"
                                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label pl-0">
                            <span className="label-text font-bold text-gray-700 dark:text-gray-300">Description</span>
                        </label>
                        <textarea
                            {...register("description", { required: true })}
                            className="textarea h-32 w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            placeholder="Write detailed product description here..."
                        ></textarea>
                    </div>

                    {/* Row 3: Image URL & Video */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Product Image URL</span>
                            </label>
                            <input
                                type="text"
                                {...register("photoUrl", { required: true })}
                                placeholder="Paste image link here (http://...)"
                                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">
                                    Demo Video Link (Optional)
                                </span>
                            </label>
                            <input
                                type="text"
                                {...register("videoLink")}
                                placeholder="https://youtube.com/..."
                                className="input w-full bg-gray-50 dark:bg-[#0b1120] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Row 4: Payment & Checkbox */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 dark:bg-[#0b1120] p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="form-control w-full">
                            <label className="label pl-0">
                                <span className="label-text font-bold text-gray-700 dark:text-gray-300">Payment Options</span>
                            </label>
                            <select
                                {...register("paymentOption")}
                                className="select w-full bg-white dark:bg-[#151f32] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 rounded-xl"
                            >
                                <option value="Cash on Delivery">Cash on Delivery</option>
                                <option value="PayFirst">PayFirst (Online)</option>
                            </select>
                        </div>
                        
                        <div className="form-control w-full flex justify-center">
                            <label className="label cursor-pointer gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                <input
                                    type="checkbox"
                                    {...register("showOnHome")}
                                    className="checkbox checkbox-accent checkbox-lg border-2 border-teal-500 checked:border-teal-500 [--chkbg:theme(colors.teal.500)] [--chkfg:white]"
                                />
                                <span className="label-text font-bold text-lg text-gray-700 dark:text-gray-300">Show on Home Page</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full mt-8 text-lg font-bold text-white uppercase tracking-wider bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg hover:shadow-teal-500/30 transition-all rounded-xl border-0"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner text-white"></span>
                        ) : (
                            "Add Product"
                        )}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Add_Product;