import React from "react";
import { createBrowserRouter } from "react-router"; // react-router-dom ব্যবহার করুন
import MainLayout from "./MainRouter";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AllProduct from "../Pages/AllProduct/AllProduct"; 
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import BookingPage from "../Pages/BookingPage/BookingPage";
import Dashboard from "../Pages/DashBoard/DashBoard";
import ManageUsers from "../Pages/DashBoard/Admin/ManagesUsers";
import AllOrders from "../Pages/DashBoard/Admin/AllOrder";
import MyProfile from "../Pages/DashBoard/Buyer/MyProfile";
import MyOrders from "../Pages/DashBoard/Buyer/MyOrders";
import TrackOrder from "../Pages/DashBoard/Buyer/TrackOrder";
import Add_Product from "../Pages/DashBoard/Manager/Add_Product";
import Approve_Orders from "../Pages/DashBoard/Manager/Approve_Orders";
import Manage_Products from "../Pages/DashBoard/Manager/Manage_Products";
import Pending_Orders from "../Pages/DashBoard/Manager/Pending_Orders";
import Update_Product from "../Pages/DashBoard/Manager/Update_Product";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PrivateRoute from "./PrivateRoute";
import All_Products from './../Pages/DashBoard/Admin/AllProducts'; 
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path:"/about",
        Component:About,
      },
      {
       path:"/contact",
       Component:Contact
      },
      {
        path: "/all-products",
        element: <AllProduct />,
      },
      {
        path: "/product-details/:id",
        element: <PrivateRoute><ProductDetails /></PrivateRoute>
      }, 
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/book-product/:id",
        element: <PrivateRoute><BookingPage /></PrivateRoute>, 
      },
      
      // DASHBOARD ROUTES
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>, 
        children: [
          // ❌ PaymentPage এর রাউটটি মুছে ফেলা হয়েছে কারণ আমরা ডিরেক্ট Stripe এ যাচ্ছি

          // ✅ Success Page (এটি লাগবে)
          {
            path: "payment/success/:tranId",
            Component:PaymentSuccess
            
          },
          
          // --- Admin Part ---
          {
            path: "manage-users",
            element: <PrivateRoute><ManageUsers /></PrivateRoute>
          },
          {
            path: "all-orders",
            element: <PrivateRoute><AllOrders /></PrivateRoute>
          },
          {
            path: "all-products",
            element: <PrivateRoute><All_Products /></PrivateRoute> 
          },

          // --- Buyer Part ---
          {
            path: "my-profile",
            element: <PrivateRoute><MyProfile /></PrivateRoute>
          },
          {
            path: "my-orders",
            element: <PrivateRoute><MyOrders /></PrivateRoute>
          },
          {
            path: "track-order/:orderId", 
            element: <PrivateRoute><TrackOrder /></PrivateRoute>,
          },

          // --- Manager Part ---
          {
            path: "add-product",
            element: <PrivateRoute><Add_Product /></PrivateRoute>
          },
          {
            path: "approved-orders",
            element: <PrivateRoute><Approve_Orders /></PrivateRoute>
          },
          {
            path: "manage-products",
            element: <PrivateRoute><Manage_Products /></PrivateRoute>
          },
          {
            path: "profile",
            element: <PrivateRoute><MyProfile /></PrivateRoute>
          },
          {
            path: "pending-orders",
            element: <PrivateRoute><Pending_Orders /></PrivateRoute>
          },
          {
            path: "update-product/:id",
            element: <PrivateRoute><Update_Product /></PrivateRoute>,
          },
        ],
      },
    ],
  },
]);