import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router";
import { getAsyncCheck } from "../feature/redux/LoginSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToastContainer from "../components/toast/ToastContainer.jsx";
import Navbar from "../components/Navbar.jsx";

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useSelector(state => state.login);

    useEffect(() => {
        dispatch(getAsyncCheck());
    }, []);

    useEffect(() => {
        if (isAuthenticated === false && !isLoading) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading]);

    const [closed, setClosed] = useState({ open: true });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setClosed({ open: false });
            } else {
                setClosed({ open: true });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setClosed(prev => ({ open: !prev.open }));

    return (
        <>
            <div className='scroll-bar'>
                <div className='scroll-bar-style your-scroll-container'>
                    <div className="flex flex-col w-full bg-gray-200 dark:bg-gray-800 " style={{ minHeight: "100vh" }}>
                        <div className="w-full relative">
                            <div className="flex">
                                <Sidebar open_slider={closed.open} open_close={toggleSidebar} />
                                <div  className="flex w-full flex-col container mx-auto">
                                    <div>
                                        <Navbar open_close={toggleSidebar} />
                                    </div>
                                    <div className="mb-10 p-5 md:p-5">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );


};

export default Layout;