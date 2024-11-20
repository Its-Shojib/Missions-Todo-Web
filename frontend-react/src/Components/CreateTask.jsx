import { FiPlus } from "react-icons/fi";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
// import useAxiosPrivate from "../Hooks/useAxiosPrivate";


const CreateTask = () => {

    let axiosPublic = useAxiosPublic();
    // let axiosPrivate = useAxiosPrivate();
    let { user } = useAuth()
    console.log(user?.email)

    // Add form handling logic here
    const handleAddTask = async (e) => {
        e.preventDefault();
        // Add task to the list
        const task = {
            title: e.target.task.value,
            email: user?.email,
            completed: false,
        }
        const res = await axiosPublic.post('/api/add-task', task);
        if (res.status === 201) {
            // Reset form
            e.target.reset();
        }
        console.log(res.data)

    }
    return (
        <div className="bg-green-700 text-white py-10">
            <form onSubmit={handleAddTask}>
                <div className="flex gap-2 max-w-screen-sm mx-auto">
                    <input className="border border-gray-300 w-full py-3 px-2 rounded-md text-gray-700 outline-none " type="text" id="task" name="task" />

                    <button type="submit"><FiPlus className="text-4xl bg-yellow-300 text-black rounded-full w-10 h-10" /></button>
                </div>
            </form>

        </div>
    );
};

export default CreateTask;