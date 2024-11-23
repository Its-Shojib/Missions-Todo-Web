import { FiTrash2 } from "react-icons/fi";


const ShowTask = ({ isPending, filteredTasks, toggleCompletion, deleteTask }) => {
    return (
        <div>
            {
                isPending && <div className="min-h-[calc(100vh-300px)] flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }
            <div className="my-10 max-w-[600px] mx-auto">
                {
                    !isPending && filteredTasks?.length == 0 && (
                        <div className="text-center text-gray-600">
                            <h1 className="text-xl font-semibold">No Task Found</h1>
                            <p className="text-sm">Create a new task to get started.</p>
                        </div>
                    )}
                {
                    filteredTasks?.length > 0 && filteredTasks?.map((task) => (
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
                                    className="text-red-800 hover:text-red-700"
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

export default ShowTask;