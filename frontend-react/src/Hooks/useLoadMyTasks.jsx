import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const UseLoadMyTasks = () => {
    let axiosPublic = useAxiosPublic();
    let { user } = useAuth();
    const { data: myTask, isPending, refetch } = useQuery({
        queryKey: ['my-task'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/load-task/${user?.email}`);
            // console.log(res.data.tasks);
            return res.data.tasks;
        }
    });
    return [myTask, isPending, refetch];
};

export default UseLoadMyTasks;