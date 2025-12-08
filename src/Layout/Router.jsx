import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./MainRouter";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AllProduct from "../Pages/AllProduct/AllProduct";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import BookingPage from "../Pages/BookingPage/BookingPage";
import User_home from "../Pages/DashBoard/user-home/User_home";
import Myorder from "../Pages/DashBoard/Myorder/Myorder";
import Dashboard from "../Pages/DashBoard/DashBoard";
import MyProfile from "../Pages/DashBoard/MyProfile/MyProfile";




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
          {
            path:"user-home",
            Component:User_home
          },
          {
            path:"my-orders",
            Component:Myorder
          },
          {
          path:"my-profile",
          Component:MyProfile
          }

        ]
      }
    ],



  },
]);

