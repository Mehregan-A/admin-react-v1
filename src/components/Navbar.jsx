import React, {useEffect} from 'react';
import { FaSearch, FaUserCircle} from "react-icons/fa";
import {FaAlignRight} from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router";
import {getAsyncLogout, loginClearResult} from "../feature/redux/LoginSlice.jsx";
import {Toast} from "./toast/Toast.jsx";
import {FaRightFromBracket} from "react-icons/fa6";

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
        <div className="w-full shadow-md bg-white dark:bg-gray-800 rounded-xl">
            <div className="flex justify-between items-center px-4 py-3">

                {/* دکمه باز/بستن منو و خروج */}
                <div className="flex items-center gap-3 text-gray-700">
                    <button onClick={open_close}
                            className="w-9 h-9 bg-gray-50 dark:bg-gray-700 flex items-center rounded-xl justify-center shadow-lg cursor-pointer hover:text-sky-800 transition-colors">
                        <FaAlignRight className="w-5 h-5"/>
                    </button>
                    <button onClick={() => dispatch(getAsyncLogout())}
                            className="w-9 h-9 bg-gray-50 dark:bg-gray-700 flex items-center rounded-xl justify-center shadow-lg cursor-pointer hover:text-red-600 transition-colors">
                        <FaRightFromBracket className="w-5 h-5"/>
                    </button>
                </div>

                {/* لوگو و نام پنل */}
                <div className="flex items-center gap-2">
                    {/*<img src="/logo.png" alt="لوگو" className="w-10 h-10"/>*/}
                    <span className="font-bold text-lg">پنل مدیریت فروشگاه</span>
                </div>

                {/* پروفایل ادمین */}
                <div className="flex items-center gap-3 text-gray-600">
                    <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                        <FaSearch className="text-gray-400"/>
                        <input
                            type="text"
                            placeholder="جستجو..."
                            className="bg-transparent outline-none px-2 text-sm w-32 md:w-48"
                        />
                    </div>
                    <FaUserCircle className="text-3xl cursor-pointer hover:text-blue-500"/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
