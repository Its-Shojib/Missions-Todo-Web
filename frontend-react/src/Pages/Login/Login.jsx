import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';


const Login = () => {
    let [showPassword, setShowPassword] = useState(false);
    let { setLoading, setUser } = useAuth();
    let navigate = useNavigate();
    let axiosPublic = useAxiosPublic();


    let handleLogin = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        let loginInfo = {
            email,
            password
        }
        setLoading(true);
        let res = await axiosPublic.post('/api/login', loginInfo);
            if(res.data?.result){
                setUser(res.data?.user);
                localStorage.setItem("user", JSON.stringify(res.data?.user));
                localStorage.setItem("access-token", JSON.stringify(res.data?.token));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
                navigate('/');
            }else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
    }



    return (
        <div className='w-full md:w-10/12 mx-auto'>
            <Helmet>
                <title>Mission | Login</title>
            </Helmet>

            <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-5 px-4 mt-20">
                <div className="bg-gray-400 w-full md:w-4/12 md:pr-10 text-center p-10 mb-2 rounded-lg">
                    <h2 className="text-3xl text-base-100 font-bold">Login Now!</h2>
                    <form onSubmit={handleLogin}>
                        <div className="relative">
                            <p className="text-left text-base-100 text-lg font-semibold">User Email</p>
                            <AiOutlineMail className="absolute bottom-4 left-2"></AiOutlineMail>
                            <input className="w-full p-2 pl-7 text-base rounded-lg my-1"
                                type="email"
                                name="email"
                                placeholder="Type your email"
                                required />
                        </div>
                        <hr className="my-3" />
                        <div className="relative">
                            <p className="text-left text-base-100 text-lg font-semibold">Password</p>
                            <RiLockPasswordFill className="absolute bottom-4 left-2"></RiLockPasswordFill>
                            <input className="w-full p-2 pl-6 text-base rounded-lg my-1"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Type your password"
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-4">{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                        </div>
                        <hr className="mt-3" />
                        <div>
                            <p
                                onClick={() => document.getElementById('my_modal').showModal()}
                                className='text-blue-600 text-right mb-3 cursor-pointer'>
                                Forget Password?</p>
                        </div>
                        <button className="bg-green-700 text-white py-2 rounded-md w-full" type="submit">
                            Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;