import React from "react";
import { createBrowserRouter } from "react-router";
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
import AllProducts from "../Pages/DashBoard/Admin/AllProducts";
import MyProfile from "../Pages/DashBoard/Buyer/MyProfile";
import MyOrders from "../Pages/DashBoard/Buyer/MyOrders";
import TrackOrder from "../Pages/DashBoard/Buyer/TrackOrder";
import Add_Product from "../Pages/DashBoard/Manager/Add_Product";
import Approve_Orders from "../Pages/DashBoard/Manager/Approve_Orders";
import Manage_Products from "../Pages/DashBoard/Manager/Manage_Products";
import My_Profile from "../Pages/DashBoard/Manager/My_Profile";
import Pending_Orders from "../Pages/DashBoard/Manager/Pending_Orders";
import Update_Product from "../Pages/DashBoard/Manager/Update_Product";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/home",
        Component:Home,
      },
      {
       path:"/garments-products",
       Component:AllProduct
      },
      {
        path:"/product-details/:id",
        Component:ProductDetails
      },
      {
        path: "/login",
        Component:Login,
      },
      {
        path: "/register",
        Component:Register,
      },
      {
        path:"/book-product/:id",
        Component:BookingPage,
      },
      {
        path:"/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
        
        ////admin -part
          {
            path:"manage-users",
            Component:ManageUsers
          },
          {
            path:"all-orders",
            Component:AllOrders
          },
          {
           path:"all-products",
           Component:AllProducts
          },
          

          //buyerpart

          {
          path:"my-profile",
          Component:MyProfile
          },
          {
            path:"my-orders",
            Component:MyOrders
          },
          {
            path:"track-order",
            Component:TrackOrder
          },
          
          //--------manager

          {
            path:"add-product",
            Component:Add_Product

          }
          , {
            path:"approved-orders",
            Component:Approve_Orders

          },
           {
            path:"manage-products",
            Component:Manage_Products

          },
           {
            path:"profile",
            Component:My_Profile

          },
           {
            path:"pending-orders",
            Component:Pending_Orders

          },
          {
            path:"update-product/:id",
            Component:Update_Product
          }

        ]
      }
    ],



  },
]);

