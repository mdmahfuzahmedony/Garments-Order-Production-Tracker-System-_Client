import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useManager = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isManager, isPending: isManagerLoading } = useQuery({
        queryKey: [user?.email, 'isManager'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // আপনার ব্যাকএন্ড রাউট অনুযায়ী
            const res = await axiosSecure.get(`/users/manager/${user.email}`);
            return res.data.manager;
        }
    });

    return [isManager, isManagerLoading];
};

export default useManager;