import React from "react";
import { useParams, useNavigate } from "react-router"; // useNavigate যোগ করা হয়েছে
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const Update_Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ১. ডাটা লোড করা
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
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ২. সেইফ ভ্যালু সেট করা (যাতে এরর না দেয়)
  const {
    name,
    category,
    price,
    availableQuantity, // ডাটাবেসে এই নামেই আছে
    quantity, // ব্যাকওয়ার্ড কম্প্যাটিবিলিটির জন্য
    moq,
    description,
    image,
    videoLink, // ডাটাবেসে এই নামেই আছে
    video, // ব্যাকওয়ার্ড কম্প্যাটিবিলিটির জন্য
    paymentOption,
    showOnHome,
  } = product;

  // ৩. আপডেট হ্যান্ডলার
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedProductInfo = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value), // সংখ্যায় কনভার্ট করা ভালো
      availableQuantity: parseInt(form.quantity.value), // ডাটাবেসে নাম availableQuantity
      moq: parseInt(form.moq.value),
      description: form.description.value,
      image: form.image.value,
      videoLink: form.videoLink.value, // ডাটাবেসে নাম videoLink
      paymentOption: form.paymentOption.value,
      showOnHome: form.showOnHome.checked,
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
          confirmButtonText: "Ok",
        });
        // আপডেটের পর প্রোডাক্ট লিস্ট বা ডিটেইলসে নিয়ে যেতে চাইলে:
        // navigate('/dashboard/all-products'); 
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
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      
      {/* Back Button & Header */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-outline">
            <FaArrowLeft /> Back
        </button>
        <h2 className="text-2xl font-bold text-primary">Update Product</h2>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      <div className="max-w-5xl mx-auto bg-base-100 p-8 rounded-xl shadow-xl border border-gray-200">
        
        <form onSubmit={handleUpdateProduct}>
          {/* Row 1: Name & Category */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Product Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Category</span>
              </label>
              <select
                name="category"
                defaultValue={category || "Shirt"}
                className="select select-bordered w-full"
              >
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Jacket">Jacket</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price, Qty, MOQ */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="form-control w-full md:w-1/3">
              <label className="label">
                <span className="label-text font-bold">Price ($)</span>
              </label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/3">
              <label className="label">
                <span className="label-text font-bold">Available Qty</span>
              </label>
              <input
                type="number"
                name="quantity"
                // availableQuantity না থাকলে quantity (আগের ডাটা) নিবে
                defaultValue={availableQuantity || quantity}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/3">
              <label className="label">
                <span className="label-text font-bold">MOQ</span>
              </label>
              <input
                type="number"
                name="moq"
                defaultValue={moq}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={description}
              className="textarea textarea-bordered h-24"
              required
            ></textarea>
          </div>

          {/* Row 4: Image URL & Video Link */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Product Image URL</span>
              </label>
              <input
                type="text"
                name="image"
                defaultValue={image}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Demo Video Link</span>
              </label>
              <input
                type="text"
                name="videoLink"
                // videoLink না থাকলে video (আগের ডাটা) নিবে
                defaultValue={videoLink || video}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Row 5: Payment & Checkbox */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Payment Options</span>
              </label>
              <select
                name="paymentOption"
                defaultValue={paymentOption || "Cash on Delivery"}
                className="select select-bordered w-full"
              >
                {/* Add_Product এর সাথে মিলিয়ে অপশন রাখা হলো */}
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFirst">PayFirst</option>
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
                <span className="label-text font-bold text-lg">
                  Show on Home Page
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <button className="btn btn-primary w-full text-lg font-bold">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_Product;