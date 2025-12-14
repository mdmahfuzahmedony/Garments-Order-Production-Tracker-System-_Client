import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"; // 1. Hook Import

const Add_Product = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // 2. Hook Initialize
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
      // এই দুটি ফিল্ড খুবই গুরুত্বপূর্ণ, এগুলো ছাড়া ম্যানেজ পেজে ডাটা দেখাবে না
      managerEmail: user?.email, 
      managerName: user?.displayName,
    };

    // 3. axiosSecure ব্যবহার করা হলো (Full URL বা withCredentials লাগবে না, হুক এটা হ্যান্ডেল করবে)
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
    <div className="w-full max-w-5xl mx-auto p-4 lg:p-10 bg-base-200 rounded-2xl shadow-xl mt-5">
      <h2 className="text-3xl text-green-600 font-bold mb-8 text-center border-b-2 border-primary/20 pb-4">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">Product Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Ex: Men's Cotton Shirt"
              className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">Category</span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
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
            <label className="label">
              <span className="label-text font-bold text-base-content">Price ($)</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              placeholder="0.00"
              className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">Available Qty</span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              placeholder="0"
              className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">MOQ</span>
            </label>
            <input
              type="number"
              {...register("moq", { required: true })}
              placeholder="Min Order Qty"
              className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-base-content">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-32 bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
            placeholder="Write detailed product description here..."
          ></textarea>
        </div>

        {/* Row 3: Image URL & Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">Product Image URL</span>
            </label>
            <input
              type="text"
              {...register("photoUrl", { required: true })}
              placeholder="Paste image link here (http://...)"
              className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">
                Demo Video Link (Optional)
              </span>
            </label>
            <input
              type="text"
              {...register("videoLink")}
              placeholder="https://youtube.com/..."
              className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Row 4: Payment & Checkbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-base-100 p-4 rounded-xl border border-base-300">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content">Payment Options</span>
            </label>
            <select
              {...register("paymentOption")}
              className="select select-bordered w-full bg-base-200 text-base-content focus:border-primary focus:outline-none"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="PayFirst">PayFirst (Online)</option>
            </select>
          </div>
          
          <div className="form-control w-full flex justify-center">
            <label className="label cursor-pointer gap-4 p-4 rounded-lg hover:bg-base-200 transition">
              <input
                type="checkbox"
                {...register("showOnHome")}
                className="checkbox checkbox-primary checkbox-lg"
              />
              <span className="label-text font-bold text-lg text-base-content">Show on Home Page</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-green-600 w-full mt-8 text-lg font-bold shadow-lg hover:shadow-primary/50 text-white"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default Add_Product;