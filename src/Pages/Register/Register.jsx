import React, { useContext } from "react";
import { useForm } from "react-hook-form";
// ফিক্স ১: 'react-router' এর বদলে 'react-router-dom' হবে
import { Link, useNavigate, useLocation } from "react-router";

// ফিক্স ২: আপনার ফাইলের নাম যদি 'AuthProvider.jsx' হয় তবে নিচের লাইন ঠিক আছে।
// যদি ফাইলের নাম 'Authprovider.jsx' (ছোট হাতের p) হয়, তবে 'AuthProvider' এর বদলে 'Authprovider' লিখবেন।
import { AuthContext } from "../../Provider/AuthProvider"; 

import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photoURL, role } = data;

    // ১. ফায়ারবেসে ইউজার তৈরি
    createUser(email, password)
      .then((result) => {
        // ২. প্রোফাইল আপডেট
        updateUserProfile(name, photoURL).then(() => {
          const userInfo = {
            name,
            email,
            role,
            status: "active",
            image: photoURL,
          };

          // ৩. ডাটাবেসে সেভ করা
          axios
            .post("http://localhost:2001/users", userInfo)
            .then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Registration Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              } else {
                Swal.fire({
                  icon: "info",
                  title: "User Already in Database",
                  timer: 1500,
                });
                navigate("/");
              }
            })
            .catch((err) => console.error("Axios Error:", err));
        });
      })
      .catch((error) => {
        console.error("Firebase Error:", error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "buyer", // ডিফল্ট রোল বায়ার
          status: "active",
          image: user.photoURL,
        };

        axios.post("http://localhost:2001/users", userInfo).then(() => {
          Swal.fire({
            icon: "success",
            title: "Google Sign-in Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Join us to manage your garments production
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              placeholder="https://image.url..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              {...register("photoURL", { required: "Photo URL is required" })}
            />
            {errors.photoURL && (
              <p className="text-red-500 text-xs mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Role
            </label>
            <select
              defaultValue=""
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              {...register("role", { required: "Please select a role" })}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])/,
                  message: "Must include 1 uppercase & 1 lowercase letter",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md mt-2">
            Register
          </button>
        </form>

        <div className="divider my-6 text-gray-400 text-sm">OR</div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-medium py-2.5 rounded-lg transition duration-200"
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-500 font-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;