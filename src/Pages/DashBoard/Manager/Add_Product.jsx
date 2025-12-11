import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const Add_Product = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    // এখানে ImgBB বা কোনো আপলোডের ঝামেলা নেই।
    // ইউজার যে লিংক দেবে, সরাসরি সেটাই ডাটাবেসে যাবে।

    const productData = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: parseFloat(data.price),
      availableQuantity: parseInt(data.quantity),
      moq: parseInt(data.moq),
      image: data.photoUrl, // সরাসরি লিংক
      videoLink: data.videoLink,
      paymentOption: data.paymentOption,
      showOnHome: data.showOnHome,
      status: "available",
      managerEmail: user?.email,
      managerName: user?.displayName,
    };

    // ডাটাবেসে সেভ করা
    axios
      .post("http://localhost:2001/garments-products", productData)
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
        console.log(err);
        Swal.fire("Error", "Something went wrong!", "error");
      });

    setLoading(false);
  };

  return (
    <div className="w-full p-4 lg:p-8 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Product Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Product Title"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Category</span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered w-full"
            >
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Price ($)</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="0"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Available Qty</span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              placeholder="0"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">MOQ</span>
            </label>
            <input
              type="number"
              {...register("moq", { required: true })}
              placeholder="Min Order Qty"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Product details..."
          ></textarea>
        </div>

        {/* Row 3: Image URL & Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ফাইলের বদলে এখন টেক্সট ইনপুট (Direct Link) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Product Image URL</span>
            </label>
            <input
              type="text"
              {...register("photoUrl", { required: true })}
              placeholder="Paste image link here (http://...)"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Demo Video Link (Optional)
              </span>
            </label>
            <input
              type="text"
              {...register("videoLink")}
              placeholder="https://youtube.com/..."
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Row 4: Payment & Checkbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Payment Options</span>
            </label>
            <select
              {...register("paymentOption")}
              className="select select-bordered w-full"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="PayFirst">PayFirst</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4 mt-8">
              <input
                type="checkbox"
                {...register("showOnHome")}
                className="checkbox checkbox-primary"
              />
              <span className="label-text font-bold">Show on Home Page</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-6 text-lg"
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
