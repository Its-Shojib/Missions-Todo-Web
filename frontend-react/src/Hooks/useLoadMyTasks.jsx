import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const UseLoadMyTasks = () => {
    let axiosPrivate = useAxiosPrivate()
    let { user } = useAuth();
    const { data: myTask = [], isPending, refetch } = useQuery({
        queryKey: ['my-task'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/api/load-task/${user?.email}`);
            return res.data.tasks || [];
        }
    });
    return [myTask, isPending, refetch];
};

export default UseLoadMyTasks;