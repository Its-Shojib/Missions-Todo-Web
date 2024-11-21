import { FiPlus } from "react-icons/fi";
// import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import UseLoadMyTasks from "../Hooks/useLoadMyTasks";
import Swal from "sweetalert2";



const CreateTask = () => {

    // let axiosPublic = useAxiosPublic();
    let axiosPrivate = useAxiosPrivate();
    let { user } = useAuth()
    let [,,refetch] = UseLoadMyTasks();

    // Add form handling logic here
    const handleAddTask = async (e) => {
        e.preventDefault();
        // Add task to the list
        const task = {
            title: e.target.task.value,
            email: user?.email,
            completed: false,
        }
        const res = await axiosPrivate.post('/api/add-task', task);
        if (res.data.result) {
            // Reset form
            e.target.reset();
            refetch(); // Fetch updated tasks after adding a new one.
        }else{
            console.error("Failed to add task:", res.data)
            Swal.fire({
                icon: 'error',
                title: `${res.data.errors.title}`,
                text: 'Please try again.',
            });
            e.target.reset();

        }
        // console.log(res.data)

    }
    return (
        <div className="bg-green-800 text-white py-10">
            <form onSubmit={handleAddTask}>
                <div className="flex gap-2 max-w-[600px] mx-auto">
                    <input className="border border-gray-300 w-full py-3 px-2 rounded-md text-gray-700 outline-none " type="text" id="task" name="task"
                    placeholder="Please add task name..." />

                    <button type="submit"><FiPlus className="text-4xl bg-yellow-300 text-black rounded-full w-10 h-10" /></button>
                </div>
            </form>

        </div>
    );
};

export default CreateTask;