
import CreateTask from "../../Components/CreateTask";
import UseLoadMyTasks from "../../Hooks/useLoadMyTasks";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { FiTrash2 } from "react-icons/fi";

const Home = () => {
    const axiosPrivate = useAxiosPrivate();
    let [myTask, isPending, refetch] = UseLoadMyTasks();
    console.log(myTask?.length)

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
    const deleteTask = async (taskId) => {
        try {
            const res = await axiosPrivate.delete(`/api/task/${taskId}`);
            if (res.status === 200) {
                console.log(res);
                refetch();
            }
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    return (
        <div className="bg-green-200 min-h-screen">
            <CreateTask />
            {
                isPending && <div className="min-h-screen flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>

            }
            <div className="my-20 max-w-screen-sm mx-auto">
                {!isPending && myTask?.length == 0 && (
                    <div className="text-center text-gray-600">
                        <h1 className="text-xl font-semibold">No Task Found</h1>
                        <p className="text-sm">Create a new task to get started.</p>
                    </div>
                )}
                {myTask?.length > 0 && myTask?.map((task) => (
                    <div key={task.id}>
                        <div className="flex items-center justify-between gap-2 bg-white my-3 p-2 rounded shadow">
                            <div className="flex items-center gap-2">
                                <input
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
