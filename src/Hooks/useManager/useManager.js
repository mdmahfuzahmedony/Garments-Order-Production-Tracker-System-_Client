import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/Authprovider";

const useManager = () => {
    const { user, loading } = useContext(AuthContext);
    
    const { data: isManager, isLoading: isManagerLoading } = useQuery({
        queryKey: [user?.email, 'isManager'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // ভুল ১ সমাধান: URL এখন /users/manager/...
            const res = await axios.get(`http://localhost:2001/users/manager/${user.email}`);
            return res.data.manager; 
        }
    });
    return [isManager, isManagerLoading];
};
export default useManager;