import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


let axiosSecure = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true
})

const useAxiosPrivate = () => {
    let navigate = useNavigate();
    let { Logout } = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        let token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        let status = error?.response?.status;
        if (status === 401 || status === 403) {
            await Logout();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
}
export default useAxiosPrivate;