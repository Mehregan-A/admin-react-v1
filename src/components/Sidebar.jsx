import { SideItem } from "../assets/data/data.js";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FaIcons from "./Icon.jsx";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "./toast/Toast.jsx";
import { loginClearResult } from "../feature/redux/LoginSlice.jsx";
import MyAnimation from "./MyAnimation.jsx";
import { AnimatePresence, motion } from "framer-motion";
import {HiXMark} from "react-icons/hi2";

const Sidebar = ({ open_close, open_slider }) => {
    const { logout } = useSelector((state) => state.login);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const sidebarRef = useRef();
    const [subId, setSubId] = useState(0);

    useEffect(() => {
        const activeSubId =
            SideItem.find(
                (item) =>
                    item.link === location.pathname ||
                    item.sub.some((sub) => sub.link === location.pathname)
            )?.id || 0;

        setSubId(activeSubId);
    }, [location.pathname]);

    const subMenu = (input) => setSubId(subId === input ? 0 : input);

    const handleItemClick = () => {
        if (window.innerWidth < 1024 && open_slider) open_close();
    };

    useEffect(() => {
        if (window.innerWidth < 1024) {
            document.body.style.overflow = open_slider ? "hidden" : "";
            return () => (document.body.style.overflow = "");
        }
    }, [open_slider]);

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

    const renderSubMenu = (item) => (
        <AnimatePresence>
            {subId === item.id && (
                <motion.ul
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full mt-2 flex flex-col border-r-2 border-gray-200 overflow-hidden"
                >
                    {item.sub.map((sub) => (
                        <li key={sub.id} className="relative flex items-center py-2">
                            <span className="absolute left-full top-0 bottom-0 w-6 pointer-events-none" aria-hidden="true">
                                                                  <svg
                                                                      viewBox="0 0 24 100"
                                                                      preserveAspectRatio="none"
                                                                      className="absolute inset-0 h-full w-full stroke-gray-300 transform -rotate-90"
                                                                  >
                                                                    <path d="M50,18 Q5,50 10,10" fill="none" strokeWidth="1" />
                                                                  </svg>
                                                                </span>
                            <NavLink
                                to={sub.link}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemClick();
                                }}
                                className={({ isActive }) =>
                                    `flex items-center mr-3 gap-2 px-1 py-1 transition-all duration-500 ease-in-out w-full ${
                                        isActive
                                            ? "font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-300/50 dark:bg-cyan-900/50 rounded-lg mr-1"
                                            : "text-gray-700 dark:text-gray-300"
                                    }`
                                }
                            >
                                <div
                                    className="w-full py-2.5 px-2 rounded-lg mr-1 transition-all duration-500 ease-in-out hover:bg-cyan-300/50 dark:hover:bg-cyan-900/50 transform hover:scale-105">
                                    {sub.label}
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <div
                onClick={open_close}
                className={`${open_slider ? "block" : "hidden"} fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300`}
            />
            <div
                ref={sidebarRef}
                className={`${open_slider ? "w-64" : "w-0"} my-2 rounded-2xl flex-shrink-0 hidden lg:block lg:sticky lg:top-0 h-screen z-30 overflow-y-auto backdrop-blur-md transition-all duration-500 ease-in-out bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-[8px_8px_20px_rgba(0,0,0,0.25),_-8px_-8px_20px_rgba(255,255,255,0.4)] dark:shadow-[0_0_25px_5px_rgba(34,211,238,0.1)] thin-scrollbar`}>
            <div className="flex flex-col h-full justify-between">
                    <div className="mx-3 flex flex-col items-center justify-center text-sm">
                        <MyAnimation />
                        <ul className="mb-10 flex flex-col gap-5 w-full">
                            {SideItem.map((item) =>
                                item.sub.length > 0 ? (
                                    <li
                                        key={item.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            subMenu(item.id);
                                        }}
                                        className={`relative group cursor-pointer p-3.5 flex flex-col items-center rounded-lg transition-all duration-500 ease-in-out ${
                                            subId === item.id ||
                                            item.sub.some((sub) => sub.link === location.pathname)
                                                ? "bg-cyan-50/20 dark:bg-cyan-900/30 shadow-lg shadow-cyan-300/50 scale-105"
                                                : "bg-gray-100/80 dark:bg-gray-800"
                                        } hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                    >
                                        <div className={`${
                                                subId === item.id
                                                    ? "bg-gray-50 dark:bg-gray-600/80 drop-shadow-lg"
                                                    : "bg-gray-100 dark:bg-gray-600/80"
                                            } absolute -right-2 -top-0.5 rounded-full transition-all duration-500  group-hover:drop-shadow-lg `}>
                                            <NavLink
                                                to={item.link}
                                                className={() =>
                                                    location.pathname === item.link ||
                                                    item.sub.some((sub) => sub.link === location.pathname)
                                                        ? "w-13 h-13 text-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-cyan-600/70 dark:text-white rounded-full"
                                                        : "w-13 h-13 bg-gray-50 dark:bg-gray-700 text-2xl rounded-full text-cyan-600/70 dark:text-white flex items-center justify-center"
                                                }
                                            >
                                                <FaIcons
                                                    icon={
                                                        location.pathname === item.link ||
                                                        item.sub.some((sub) => sub.link === location.pathname)
                                                            ? item.icon_fill
                                                            : item.icon_outline
                                                    }
                                                />
                                            </NavLink>
                                        </div>

                                        <div className="flex justify-between items-center w-full">
                                            <span className="dark:text-stone-100 text-cyan-700 mr-10">
                                                {item.label}
                                            </span>
                                            <HiOutlineChevronDown
                                                className={`flex justify-end text-cyan-600/70 transition-transform duration-300 animate-bounce ${
                                                    subId === item.id ? "rotate-0" : "rotate-90"
                                                }`}
                                            />
                                        </div>

                                        {renderSubMenu(item)}
                                    </li>
                                ) : (
                                    <NavLink
                                        key={item.id}
                                        to={item.link}
                                        end
                                        onClick={handleItemClick}
                                        className={`relative group cursor-pointer p-3.5 flex flex-col  rounded-lg transition-all duration-500 ease-in-out ${
                                            location.pathname === item.link
                                                ? "bg-cyan-50/20 dark:bg-cyan-900/30 shadow-lg shadow-cyan-300/50 scale-105"
                                                : "bg-gray-100/80 dark:bg-gray-800"
                                        } hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                    >
                                        <div className={`${
                                            subId === item.id
                                                ? "bg-gray-50 dark:bg-gray-600/80 drop-shadow-lg"
                                                : "bg-gray-100 dark:bg-gray-600/80 "
                                        } absolute -right-2 -top-0.5 rounded-full transition-all duration-500 group-hover:drop-shadow-lg `}>
                                            <NavLink
                                                to={item.link}
                                                end
                                                onClick={handleItemClick}
                                                className={() =>
                                                    location.pathname === item.link ||
                                                    item.sub.some((sub) => sub.link === location.pathname)
                                                        ? "w-13 h-13 text-2xl bg-gray-50 dark:bg-gray-700 shadow-lg flex items-center justify-center text-cyan-600/70 dark:text-white rounded-full"
                                                        : "w-13 h-13 bg-gray-50 dark:bg-gray-700 text-2xl rounded-full text-cyan-600/70 dark:text-white flex items-center justify-center"
                                                }
                                            >
                                                <FaIcons
                                                    icon={
                                                        location.pathname === item.link ||
                                                        item.sub.some((sub) => sub.link === location.pathname)
                                                            ? item.icon_fill
                                                            : item.icon_outline
                                                    }
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="dark:text-cyan-100 text-cyan-800 mr-10">{item.label}</div>
                                    </NavLink>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            {/*mobile*/}
            <div
                ref={sidebarRef}
                className={`your-scroll-container fixed top-0 right-0 h-screen w-64 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 z-40 flex flex-col py-5 px-3 shadow-lg rounded-l-2xl overflow-y-auto transition-transform duration-300 lg:hidden
          ${open_slider ? "translate-x-0" : "translate-x-full"} thin-scrollbar`}
            >
                <button
                    onClick={open_close}
                    className="self-end cursor-pointer  p-2 mb-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                    <HiXMark size={17}/>
                </button>

                <div className="flex flex-col h-full justify-between">
                    <div className="mx-3 flex flex-col items-center justify-center text-sm">
                        <MyAnimation />
                        <ul className="mb-10 flex flex-col gap-5 w-full">
                            {SideItem.map((item) =>
                                item.sub.length > 0 ? (
                                    <li
                                        key={item.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            subMenu(item.id);
                                        }}
                                        className={`relative group cursor-pointer p-3.5 flex flex-col items-center rounded-lg transition-all duration-500 ease-in-out ${
                                            subId === item.id ||
                                            item.sub.some((sub) => sub.link === location.pathname)
                                                ? "bg-cyan-50/20 dark:bg-cyan-900/30 shadow-lg shadow-cyan-300/50 scale-105"
                                                : "bg-gray-100/80 dark:bg-gray-800"
                                        } hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                    >
                                        <div
                                            className={`${
                                                subId === item.id
                                                    ? "bg-gray-50 dark:bg-gray-300/40 drop-shadow-lg"
                                                    : "bg-gray-100 dark:bg-gray-600/80"
                                            } absolute -right-2 -top-0.5 rounded-full transition-all duration-500  group-hover:drop-shadow-lg `}
                                        >
                                            <NavLink
                                                to={item.link}
                                                className={() =>
                                                    location.pathname === item.link ||
                                                    item.sub.some((sub) => sub.link === location.pathname)
                                                        ? "w-13 h-13 text-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-cyan-600/70 dark:text-white rounded-full"
                                                        : "w-13 h-13 bg-gray-50 dark:bg-gray-700 text-2xl rounded-full text-cyan-600/70 dark:text-white flex items-center justify-center"
                                                }
                                            >
                                                <FaIcons
                                                    icon={
                                                        location.pathname === item.link ||
                                                        item.sub.some((sub) => sub.link === location.pathname)
                                                            ? item.icon_fill
                                                            : item.icon_outline
                                                    }
                                                />
                                            </NavLink>
                                        </div>

                                        <div className="flex justify-between items-center w-full">
                                            <span className="dark:text-stone-100 text-cyan-700 mr-10">
                                                {item.label}
                                            </span>
                                            <HiOutlineChevronDown
                                                className={`flex justify-end text-cyan-600/70 transition-transform duration-300 animate-bounce ${
                                                    subId === item.id ? "rotate-0" : "rotate-90"
                                                }`}
                                            />
                                        </div>

                                        {renderSubMenu(item)}
                                    </li>
                                ) : (
                                    <NavLink
                                        key={item.id}
                                        to={item.link}
                                        end
                                        onClick={handleItemClick}
                                        className={`relative group cursor-pointer flex items-center rounded-lg p-3.5 transition-all duration-500 ease-in-out ${
                                            location.pathname === item.link
                                                ? "bg-gray-50 dark:bg-cyan-900/30 shadow-lg shadow-cyan-300/50 transform scale-105"
                                                : "bg-gray-100/80 dark:bg-gray-800"
                                        } hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                    >
                                        <div className={`${
                                            subId === item.id
                                                ? "bg-gray-50 dark:bg-gray-600/80 drop-shadow-lg"
                                                : "bg-gray-100 dark:bg-gray-600/80"
                                        } absolute -right-2 -top-0.5 rounded-full transition-all duration-500  group-hover:drop-shadow-lg `}>
                                            <NavLink
                                                to={item.link}
                                                className={() =>
                                                    location.pathname === item.link ||
                                                    item.sub.some((sub) => sub.link === location.pathname)
                                                        ? "w-13 h-13 text-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-cyan-600/70 dark:text-white rounded-full"
                                                        : "w-13 h-13 bg-gray-50 dark:bg-gray-700 text-2xl rounded-full text-cyan-600/70 dark:text-white flex items-center justify-center"
                                                }
                                            >
                                                <FaIcons
                                                    icon={
                                                        location.pathname === item.link ||
                                                        item.sub.some((sub) => sub.link === location.pathname)
                                                            ? item.icon_fill
                                                            : item.icon_outline
                                                    }
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="dark:text-cyan-100 text-cyan-800 mr-10">{item.label}</div>
                                    </NavLink>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

