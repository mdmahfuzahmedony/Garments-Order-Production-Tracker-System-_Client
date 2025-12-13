import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth"; // আপনার Auth Context হুক
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:2001', // আপনার ব্যাকএন্ড URL
    withCredentials: true // এটি সবচেয়ে গুরুত্বপূর্ণ, কুকি পাঠানোর জন্য
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            // যদি টোকেন না থাকে বা মেয়াদ শেষ হয় (401/403)
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('Logout user form interceptor');
                logOut()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(err => console.log(err));
            }
            return Promise.reject(error);
        });
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;