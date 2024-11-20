import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const SignUp = () => {

    let [showPassword, setShowPassword] = useState(false);
    let axiosPublic = useAxiosPublic();
    let navigate = useNavigate()
    let {setUser} = useAuth();

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = async (data) => {
        try {
            let user = {
                name: data?.name,
                email: data?.email,
                password: data?.password,
                password_confirmation: data?.password,
            };
    
            console.log(user);
            let res = await axiosPublic.post('/api/signup', user);
            console.log(res.data);
    
            if (res.data.result) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setUser(res.data.user);
                localStorage.setItem('access-token', res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user)); 
                navigate('/');
            }
        } catch (error) {
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors;
                console.error("Validation Errors:", validationErrors);
    
                Swal.fire({
                    icon: "error",
                    title: "Signup Failed",
                    text: Object.values(validationErrors).flat().join(", "), 
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong. Please try again later.",
                });
                console.error("Unexpected Error:", error);
            }
        }
    };
    


    return (
        <div className="flex flex-col md:flex-row gap-5 px-2 justify-center items-center mt-20">
            <Helmet>
                <title>Mission | Signup</title>
            </Helmet>
            <div className="bg-gray-400 w-full md:w-4/12 text-center p-10 rounded-lg">
                <h2 className="text-3xl font-bold mb-2">Signup Now!</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">User Name</p>
                        <BsFillPersonFill className="absolute bottom-4 left-2"></BsFillPersonFill>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Type your name"
                        />
                        {errors?.name && <span className='text-red-600'>Name is required</span>}
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">User Email</p>
                        <AiOutlineMail className="absolute bottom-4 left-2"></AiOutlineMail>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Type your email"
                        />
                        {errors?.email && <span className='text-red-600'>Email is required</span>}
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">Password</p>
                        <RiLockPasswordFill className="absolute bottom-4 left-2"></RiLockPasswordFill>
                        <input className="w-full p-2 pl-6 text-black rounded-lg my-1"
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            })}
                            placeholder="Type your password"
                        />
                        {errors.password?.type === "required" && (
                            <span className='text-red-600'>Password is required</span>
                        )}
                        {errors?.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 character long</span>}
                        {errors?.password?.type === 'maxLength' && <span className='text-red-600'>Password must be less than 20 character</span>}
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-4">{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                    </div>

                    <button
                        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full py-2 text-white font-semibold text-lg rounded-xl mt-5" type="submit">
                        Signup</button>

                </form>
                <div className="flex justify-between mt-3">
                    <span>Already have an account?</span>
                    <Link className="underline text-base text-blue-600" to='/login'>Login now</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;