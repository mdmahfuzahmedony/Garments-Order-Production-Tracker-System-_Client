import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/Authprovider";

const useManager = () => {
    const { user, loading } = useContext(AuthContext);
    
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email, // ইউজার থাকলেই কল হবে
        queryFn: async () => {
            const res = await axios.get(`http://localhost:2001/users/admin/${user.email}`);
            return res.data.admin; // সার্ভার রিটার্ন করবে { admin: true/false }
        }
    });
    return [isAdmin, isAdminLoading];
};
export default useManager;