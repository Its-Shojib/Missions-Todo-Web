import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import useLogout from "../Hooks/useLogout";
import useAuth from "../Hooks/useAuth";


const Logout = () => {
    const { logout } = useLogout();
    const { user } = useAuth();

    return (
        <div className='flex top-[50%] fixed max-w-screen-2xl'>
            <ul>
                {
                    user ? <li onClick={() => logout()} className={'flex justify-between items-center w-28 h-12 px-2 ml-[-80px] pl-4 hover:ml-[-10px] hover:rounded-md duration-300 bg-rose-900 rounded-r-full text-right cursor-pointer'}>
                        <button className="text-white">Logout</button>
                        <FiLogOut className="cursor-pointer" size={25}></FiLogOut>
                    </li> : <li className={'flex justify-between items-center w-28 h-12 px-2 ml-[-80px] pl-4 hover:ml-[-10px] hover:rounded-md duration-300 bg-green-900 rounded-r-full text-right cursor-pointer'}>
                        <Link to={"/login"} className="text-white">Login</Link>
                        <FiLogIn className="cursor-pointer" size={25}></FiLogIn>
                    </li>
                }
            </ul>
        </div>
    )
}
export default Logout;