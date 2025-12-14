import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure(); // আমাদের তৈরি করা Secure Axios

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email, // ইউজার লোড না হওয়া পর্যন্ত অপেক্ষা করবে
        queryFn: async () => {
            // আপনার ব্যাকএন্ড রাউট অনুযায়ী
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data.admin;
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;