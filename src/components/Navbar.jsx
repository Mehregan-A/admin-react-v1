import React, {useEffect} from 'react';
import { FaSearch, FaUserCircle} from "react-icons/fa";
import {FaAlignRight} from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router";
import {getAsyncLogout, loginClearResult} from "../feature/redux/LoginSlice.jsx";
import {Toast} from "./toast/Toast.jsx";
import {FaRightFromBracket} from "react-icons/fa6";
import {IoLogOutOutline, IoReorderThreeOutline} from "react-icons/io5";
import {PiSignOut} from "react-icons/pi";

const Navbar = ({open_close}) => {
    const {logout} = useSelector(state => state.login);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    useEffect(() => {
        if (logout && logout.status) {
            if (logout.status === 200) {
                Toast.success(`${logout.data.message}`);
                dispatch(loginClearResult());
                setTimeout(() => navigation("/login"), 2000);
            } else {
                Toast.error(`${logout.data.message}`);
                dispatch(loginClearResult());
            }
        }
    }, [logout]);

    return (
        <div className="w-full h-18 p-4 shadow-lg shadow-gray-300 dark:shadow-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg items-center">
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-2'>
                    <button
                        onClick={open_close}
                        className="text-gray-500 dark:text-gray-300 hover:text-cyan-400 transition-all p-1.5 rounded-md shadow-md dark:shadow-gray-500 cursor-pointer"
                    >
                        <IoReorderThreeOutline size={25} />
                    </button>
                    <button onClick={()=>{dispatch(getAsyncLogout())}} className='text-gray-500 dark:text-gray-300 hover:text-cyan-400 dark:shadow-gray-500 transition-all p-1.5 rounded-md shadow-md cursor-pointer'>
                        <IoLogOutOutline size={25} />
                    </button>
                </div>
                <div className='flex'>
                    <div className='rounded-full w-11 h-11 bg-gray-200 dark:bg-cyan-300'>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
