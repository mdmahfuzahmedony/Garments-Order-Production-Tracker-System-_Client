import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./MainRouter";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AllProduct from "../Pages/AllProduct/AllProduct";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";



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
    ],



  },
]);

