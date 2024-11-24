
import CreateTask from "../../Components/CreateTask";
import UseLoadMyTasks from "../../Hooks/useLoadMyTasks";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useState } from "react";
import Logout from "../../Components/Logout";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SearchTask from "../../Components/SearchTask";
import ShowTask from "../../Components/ShowTask";

const Home = () => {
    const axiosPrivate = useAxiosPrivate();
    let [myTask, isPending, refetch] = UseLoadMyTasks();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredTasks = myTask.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        if (filter === "completed") {
            return matchesSearch && task.completed;
        }
        if (filter === "incompleted") {
            return matchesSearch && !task.completed;
        }
        return matchesSearch;
    });

    const toggleCompletion = async (taskId) => {
        try {
            const res = await axiosPrivate.put(`/api/task/${taskId}`);
            if (res.status === 200) {
                refetch();
            }
        } catch (err) {
            console.error("Error toggling task completion:", err);
        }
    };

    const deleteTask = (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const res = await axiosPrivate.delete(`/api/task/${taskId}`);
                    if (res.status === 200) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `${res.data.message}`,
                            icon: "success"
                        });
                        refetch();
                    }
                } catch (err) {
                    console.error("Error deleting task:", err);
                }

            }
        });

    };

    return (
        <div className="bg-green-100 min-h-screen px-2">
            <Helmet>
                <title>Mission | Home</title>
            </Helmet>

            <CreateTask />
            <Logout />
            <SearchTask
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter} />

            <ShowTask
                isPending={isPending}
                filteredTasks={filteredTasks}
                toggleCompletion={toggleCompletion}
                deleteTask={deleteTask} />
        </div>
    );
};

export default Home;
