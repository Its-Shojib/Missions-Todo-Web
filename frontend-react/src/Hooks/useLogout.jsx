import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogout = () => {
    const navigate = useNavigate();
    const {user, setUser} = useAuth();

    const logout = () => {
        // Remove user and token from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");
        setUser(null);

        // Redirect to login page
        navigate("/login", { replace: true });
    };

    return { logout };
};

export default useLogout;
