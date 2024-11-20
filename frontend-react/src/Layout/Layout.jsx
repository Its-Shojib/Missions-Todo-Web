import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <div className="max-w-screen-2xl mx-auto px-16 md:px-4">
            <h1 className="text-center text-2xl font-semibold text-rose-900">Missions | Todo App</h1>

            <Outlet></Outlet>
            

    
        </div>
    );
};

export default Layout;