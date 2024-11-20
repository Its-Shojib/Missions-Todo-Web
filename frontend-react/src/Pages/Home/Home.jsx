import CreateTask from "../../Components/CreateTask";
import UseLoadMyTasks from "../../Hooks/useLoadMyTasks";


const Home = () => {
    let [myTask, isPending, refetch] = UseLoadMyTasks();
    console.log(myTask)

    return (
        <div>
            <CreateTask />
            <div>
                {isPending && <p>Loading...</p>}
                {!isPending && myTask?.map((task) => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.completed}</p>
                    </div>
                ))}
                <button onClick={refetch}>Refresh</button>
            </div>
        </div>
    );
};

export default Home;