import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axios from "axios";
// যদি আপনার useAxiosSecure হুক থাকে তবে সেটি ইমপোর্ট করুন, না থাকলে সাধারণ axios ই থাকুক
// import useAxiosSecure from "../Hooks/useAxiosSecure"; 
import { AuthContext } from "../../Provider/AuthProvider";

const useManager = () => {
    const { user, loading } = useContext(AuthContext);
    // const axiosSecure = useAxiosSecure(); // সিকিউর কলের জন্য

    const { data: isManager, isLoading: isManagerLoading } = useQuery({
        // ফিক্স ১: user?.email এর মাঝে স্পেস সরানো হয়েছে
        queryKey: [user?.email, 'isManager'],
        
        // ফিক্স ২: enabled লজিকে স্পেস সরানো হয়েছে
        enabled: !loading && !!user?.email,
        
        queryFn: async () => {
            // ফিক্স ৩: ব্যাকএন্ড কল (যদি সাধারণ axios ব্যবহার করেন)
            // কিন্তু ভালো প্র্যাকটিস হলো axiosSecure ব্যবহার করা
            const res = await axios.get(`http://localhost:2001/users/manager/${user.email}`);
            return res.data?.manager; // এখানেও অপশনাল চেইনিং দেওয়া নিরাপদ
        }
    });

    return [isManager, isManagerLoading];
};

export default useManager;