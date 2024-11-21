import CreateTask from "../../Components/CreateTask";
import UseLoadMyTasks from "../../Hooks/useLoadMyTasks";


const Home = () => {
    let [myTask, isPending] = UseLoadMyTasks();
    // console.log(myTask)

    return (
        <div className="bg-green-200 min-h-screen">
            <CreateTask />
            <div className="my-20 max-w-screen-sm mx-auto ">
                {isPending && <p>Loading...</p>}
                {!isPending && myTask?.map((task) => (
                    <div key={task.id}>
                        <div className="flex items-center gap-2 bg-white my-3">
                            <input type="checkbox" checked={task.completed} />
                            <h3 className={`text-lg ${task?.completed? "line-through ":""}`}>{task.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;