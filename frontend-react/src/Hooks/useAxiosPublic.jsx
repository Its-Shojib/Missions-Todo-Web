import axios from "axios";

let axiosPublic = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
})

const useAxiosPublic = () => {
    return axiosPublic;
}
export default useAxiosPublic;