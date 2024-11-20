import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Remove user and token from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");

        // Redirect to login page
        navigate("/login", { replace: true });
    };

    return { logout };
};

export default useLogout;
