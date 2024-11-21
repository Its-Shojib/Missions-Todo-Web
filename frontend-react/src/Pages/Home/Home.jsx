
import CreateTask from "../../Components/CreateTask";
import UseLoadMyTasks from "../../Hooks/useLoadMyTasks";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import Logout from "../../Components/Logout";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
                console.log(res);
                refetch();
            }
        } catch (err) {
            console.error("Error toggling task completion:", err);
        }
    };

    // Delete a task
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
        <div className="bg-green-100 min-h-screen">
            <Helmet>
                <title>Mission | Home</title>
            </Helmet>
            
            <CreateTask />
            <Logout></Logout>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6 max-w-screen-sm mx-auto mt-10">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-auto border border-gray-300 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full md:w-auto border border-gray-300 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed Tasks</option>
                    <option value="incompleted">Incomplete Tasks</option>
                </select>
            </div>
            {
                isPending && <div className="min-h-[calc(100vh-300px)] flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>

            }
            <div className="my-10 max-w-[600px] mx-auto">
                {!isPending && filteredTasks?.length == 0 && (
                    <div className="text-center text-gray-600">
                        <h1 className="text-xl font-semibold">No Task Found</h1>
                        <p className="text-sm">Create a new task to get started.</p>
                    </div>
                )}
                {filteredTasks?.length > 0 && filteredTasks?.map((task) => (
                    <div key={task.id}>
                        <div className="flex items-center justify-between gap-2 bg-white my-3 p-2 rounded shadow">
                            <div className="flex items-center gap-2">
                                <input
                                    className="w-5 h-5 rounded-full"
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleCompletion(task.id, task.completed)}
                                />
                                <h3 className={`text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
                                    {task.title}
                                </h3>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => deleteTask(task.id)}
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
