import React, {useEffect, useState} from 'react';
import { FaSearch, FaUserCircle} from "react-icons/fa";
import {FaAlignRight} from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router";
import {getAsyncLogout, loginClearResult} from "../feature/redux/LoginSlice.jsx";
import {Toast} from "./toast/Toast.jsx";
import {FaRightFromBracket} from "react-icons/fa6";
import {IoLogOutOutline, IoReorderThreeOutline} from "react-icons/io5";
import {PiMoonThin, PiSignOut, PiSunDimThin} from "react-icons/pi";
import {Config} from "../config/Config.jsx";
import CategoryNotFound from "../assets/image/category_not_found.png";
import {getAsyncProfile} from "../feature/redux/ProfileSlice.jsx";
import {set_theme} from "../feature/redux/ThemeSlice.jsx";

const Navbar = ({open_close}) => {
    const {logout} = useSelector(state => state.login);
    const {theme}=useSelector(state => state.theme)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAsyncProfile())
    },[])

// List article selector
    const { profile } = useSelector(state => state.profile);
    const navigation = useNavigate();
    const [isTheme, setIsTheme] = useState('light');

    useEffect(() => {
        if (theme === true){
            setIsTheme((isTheme === "light")?"dark":"light");
        }
    }, [theme]);

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
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem("theme")) == null){
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", JSON.stringify('dark'));
        }else {
            if(JSON.parse(localStorage.getItem("theme")) === 'dark'){
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                localStorage.setItem("theme", JSON.stringify('light'));
            }else {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                localStorage.setItem("theme", JSON.stringify('dark'));
            }
        }
    },[theme])

    return (
        <div className="w-full h-18 p-4 m-2 shadow-lg shadow-gray-300 dark:shadow-gray-600 bg-gray-50 dark:bg-gray-800 rounded-xl items-center">
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <button
                        onClick={open_close}
                        className="text-gray-500 dark:text-gray-300 hover:text-cyan-400 transition-all p-1.5 rounded-md shadow-md dark:shadow-gray-500 cursor-pointer"
                    >
                        <IoReorderThreeOutline size={25} />
                    </button>
                    <button onClick={()=>{dispatch(getAsyncLogout())}} className='text-gray-500 dark:text-gray-300 hover:text-cyan-400 dark:shadow-gray-500 transition-all p-1.5 rounded-md shadow-md cursor-pointer'>
                        <IoLogOutOutline size={25} />
                    </button>
                    <div className="mr-7">
                        <button
                            onClick={() => dispatch(set_theme(!theme))}
                            className="relative  w-14 h-8 flex items-center bg-gray-100 shadow-md dark:shadow-gray-500 dark:bg-gray-700 cursor-pointer rounded-full p-1 transition-colors"
                        >
                            <span
                                className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-gray-800  rounded-full shadow-md dark:shadow-gray-600 transform transition-transform ${
                                    theme ? "translate-x-6" : "translate-x-0"
                                }`}
                            ></span>

                            <PiMoonThin
                                className={`absolute left-1 w-6 h-6 text-cyan-300 transition-opacity ${
                                    theme ? "opacity-100" : "opacity-0"
                                }`}
                            />
                            <PiSunDimThin
                                className={`absolute right-1 w-6 h-6 text-yellow-300 transition-opacity ${
                                    theme ? "opacity-0" : "opacity-100"
                                }`}
                            />
                        </button>
                    </div>

                </div>
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 rounded-full border border-gray-100 dark:shadow-cyan-500 shadow-md">
                    <img
                        src={profile.image ? Config.apiImage + profile.image : CategoryNotFound}
                        className="w-full h-full rounded-full object-cover"
                        alt="profile"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
