import axios from "axios";
import { useEffect } from "react";
import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  // 🔥 গুরত্বপূর্ণ পরিবর্তন: এখন কাজ করার জন্য লোকাল লিংক দিন
  baseURL: "https://garments-order-production-tracker-s-nu.vercel.app",

  // পরে যখন Vercel এ আপলোড করবেন তখন এটা চালু করবেন:
  // baseURL: "https://garments-order-production-tracker-s-nu.vercel.app",

  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error tracked in the interceptor", error.response);
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("logout the user");
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => console.log(error));
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
