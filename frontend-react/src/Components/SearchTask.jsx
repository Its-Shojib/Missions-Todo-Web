

const SearchTask = ({search,setSearch, filter, setFilter }) => {
    return (
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
    );
};

export default SearchTask;