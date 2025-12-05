import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./MainRouter";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";


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

