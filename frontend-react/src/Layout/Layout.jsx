import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <div className="max-w-screen-2xl mx-auto px-1">
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;