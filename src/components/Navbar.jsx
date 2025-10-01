import React, {useEffect} from 'react';
import {FaRightFromBracket} from "react-icons/fa6";
import {useDispatch, useSelector} from 'react-redux'
import {FaAlignRight} from "react-icons/fa";
import {useNavigate} from "react-router";
import {getAsyncLogout, loginClearResult} from "../feature/redux/LoginSlice.jsx";
// import {getAsyncListDashboard} from "../feature/redux/DashboardSlice.jsx";
import {Config} from "../config/Config.jsx";
// import loginImg from "../assets/images/logIn.png"
import {Toast} from "./toast/Toast.jsx";

const Navbar = ({open_close}) => {
    const {logout} = useSelector(state => state.login)
    // const {list_dashboard} = useSelector(state => state.dashboard)
    const dispatch = useDispatch();
    const navigation = useNavigate()
    // useEffect(() => {
    //     dispatch(getAsyncListDashboard());
    // }, []);
    useEffect(() => {
        if(logout && logout.status){
            if(logout.status === 200){
                // toast
                Toast.success(`${logout.data.message}`);
                dispatch(loginClearResult())
                setTimeout(()=>{
                    return navigation ("/login")
                },2000)
            }else {
                // toast
                Toast.error(`${logout.data.message}`);
                dispatch(loginClearResult())
            }
        }
    }, [logout]);

    return (
        <div className='content no-print flex justify-between h-18 bg-gray-200 dark:bg-gray-800 w-full rounded-xl p-4 items-center'>
            <div className='flex items-center gap-3  text-gray-700'>
                <button onClick={()=>{open_close()}} className='w-9 h-9 bg-gray-50   flex items-center rounded-xl justify-center  shadow-lg cursor-pointer hover:text-sky-800 transition-colors'>
                    <FaAlignRight className="w-5 h-5 " />
                </button>
                <button onClick={()=>{dispatch(getAsyncLogout())}} className='w-9 h-9 bg-gray-50  rounded-xl flex items-center justify-center  shadow-lg cursor-pointer hover:text-sky-800 transition-colors'>
                    <FaRightFromBracket className="w-5 h-5 " />
                </button>
            </div>
            <div className='flex items-center md:gap-2'>
                {/*<div className='items-center mx-5 md:mr-0'>*/}
                {/*    <div className='text-sm font-bold text-sky-700 md:flex md:justify-center '>{list_dashboard?.title}</div>*/}
                {/*    <div className='text-[10px] text-gray-600 hidden md:flex'><span>{list_dashboard?.address}_</span><span>{list_dashboard?.phone}</span></div>*/}
                {/*</div>*/}
                {/*{!list_dashboard?.logo?*/}
                {/*    <div className="w-12 h-12 rounded-full ring-1 ring-sky-700 ring-offset-3 ring-offset-white overflow-hidden flex items-center justify-center bg-gray-300">*/}
                {/*        <img*/}
                {/*            src={loginImg}*/}
                {/*            alt="لوگو"*/}
                {/*            className="w-full h-full object-cover"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    :*/}
                {/*    <div className="w-12 h-12 rounded-full ring-1 ring-sky-700 ring-offset-3 ring-offset-white overflow-hidden flex items-center justify-center bg-gray-300">*/}
                {/*        <img*/}
                {/*            src={`${Config.apiImage}${list_dashboard?.logo}`}*/}
                {/*            alt="لوگو"*/}
                {/*            className="w-full h-full object-cover"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*}*/}

            </div>
        </div>
    );
};

export default Navbar;