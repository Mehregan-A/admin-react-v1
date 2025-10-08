import { SideItem } from "../assets/data/data.js";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import FaIcons from "./Icon.jsx";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import {PiMoonThin, PiSunDimThin} from "react-icons/pi";
import {set_theme} from "../feature/redux/ThemeSlice.jsx";
import {AnimatePresence,  motion} from "framer-motion";
import {Toast} from "./toast/Toast.jsx";
import { loginClearResult} from "../feature/redux/LoginSlice.jsx";
import Logo from "../assets/image/logoMarketoo.svg"

const Sidebar = ({ open_close, open_slider }) => {
    const {logout} = useSelector(state => state.login)
    const navigation = useNavigate()
    const dispatch = useDispatch();
    const {theme}=useSelector(state => state.theme)
    const location = useLocation();
    const sidebarRef = useRef();
    const [subId, setSubId] = useState(0);
    const [childId, setChildId] = useState(0);
    const [isTheme, setIsTheme] = useState('light');

    useEffect(() => {
        if (theme === true){
            setIsTheme((isTheme === "light")?"dark":"light");
        }
    }, [theme]);


    useEffect(() => {
        const activeSubId = SideItem.find(item =>
            item.link === location.pathname ||
            item.sub.some(sub => sub.link === location.pathname)
        )?.id || 0;

        const activeChildId = SideItem
            .flatMap(item => item.sub)
            .find(sub => sub.link === location.pathname)?.id || 0;

        setSubId(activeSubId);
        setChildId(activeChildId);
    }, [location.pathname]);

    const subMenu = (input) => {
        setSubId(subId === input ? 0 : input);
    };

    // const childMenu = (input) => {
    //     setChildId(childId === input ? 0 : input);
    // };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                window.innerWidth < 1024 &&
                open_slider
            ) {
                open_close();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open_close, open_slider]);

    const handleItemClick = () => {
        if (window.innerWidth < 1024 && open_slider) {
            open_close();
        }
    };

    // prevent scroll
    useEffect(() => {
        if (window.innerWidth < 1024 && open_slider) {
            const scrollBar = document.querySelector('.scroll-bar');
            const scrollBarStyle = document.querySelector('.scroll-bar-style');

            if (open_slider) {
                document.body.style.overflow = 'hidden';
                scrollBar?.classList.remove('scroll-bar');
                scrollBarStyle?.classList.remove('scroll-bar-style');
            } else {
                document.body.style.overflow = '';
                scrollBar?.classList.add('scroll-bar');
                scrollBarStyle?.classList.add('scroll-bar-style');
            }

            return () => {
                document.body.style.overflow = '';
                scrollBar?.classList.add('scroll-bar');
                scrollBarStyle?.classList.add('scroll-bar-style');
            };
        }
    }, [open_slider]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (sidebarRef.current) {
                const scrollTop = sidebarRef.current.scrollTop;
                setScrollY(scrollTop);
            }
        };

        const sidebarCurrent = sidebarRef.current;
        sidebarCurrent?.addEventListener("scroll", handleScroll);

        return () => {
            sidebarCurrent?.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
        <>
            {/*<div*/}
            {/*    onClick={open_close}*/}
            {/*    className={`no-print fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 z-20 lg:hidden ${*/}
            {/*        open_slider ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"*/}
            {/*    }`}*/}
            {/*></div>*/}
            <div
                ref={sidebarRef}
                className={`${!open_slider ? "translate-x-0" : "translate-x-full"} your-scroll-container flex-shrink-0 no-print fixed h-screen hidden lg:block lg:sticky lg:self-start z-30 overflow-y-auto shadow-xl backdrop-blur-md w-64 transition-transform duration-500 ease-in-out bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 `}
            >
                {/*<div className='w-20 h-20 flex items-center justify-center'>*/}
                {/*    <img src={Logo}/>*/}
                {/*    <span className="text-xl font-bold text-cyan-600 mb-4">مارکتو</span>*/}
                {/* </div>*/}
                <div className="flex flex-col h-full justify-between">
                    <div className="mt-7 mx-3 flex flex-col items-center justify-center text-sm">
                        <ul className="pt-10 mb-10 flex flex-col gap-5 w-full">
                            {SideItem.map((item) =>
                                    item.sub.length > 0 ? (
                                        <li
                                            key={item.id}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                subMenu(item.id);
                                            }}
                                            className={`relative group cursor-pointer p-3.5 flex flex-col items-center rounded-lg transition-all duration-500 ease-in-out ${
                                                subId === item.id || item.sub.some((sub) => sub.link === location.pathname)
                                                    ? "bg-cyan-50/20 dark:bg-cyan-900/30 shadow-lg shadow-cyan-300/50 scale-105"
                                                    : "bg-gray-100/80 dark:bg-gray-800"
                                            }
                                                hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30
                                                hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                        >

                                        <div
                                                className={`${
                                                    subId === item.id ? "bg-gray-300 dark:bg-gray-300/40" : "bg-gray-100 dark:bg-gray-600/80"
                                                } absolute -right-2 -top-0.5 rounded-full transition-all duration-500 group-hover:bg-white group-hover:drop-shadow-lg drop-shadow-cyan-300`}
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
                                                {location.pathname === item.link ||
                                                item.sub.some((sub) => sub.link === location.pathname) ? (
                                                    <FaIcons icon={item.icon_fill} />
                                                ) : (
                                                    <>
                                                        <div className="hidden group-hover:inline">
                                                            <FaIcons icon={item.icon_fill} />
                                                        </div>
                                                        <div className="group-hover:hidden">
                                                            <FaIcons icon={item.icon_outline} />
                                                        </div>
                                                    </>
                                                )}
                                            </NavLink>

                                        </div>

                                            <div className="flex justify-between items-center w-full">
                                                <span className="dark:text-stone-100 text-cyan-700 mr-10">{item.label}</span>
                                                <HiOutlineChevronDown
                                                    className={`flex justify-end text-cyan-600/70 transition-transform duration-300 animate-bounce ${
                                                        subId === item.id ? "rotate-0" : "rotate-90"
                                                    }`}
                                                />
                                            </div>

                                            <AnimatePresence>
                                                {subId === item.id && (
                                                    <motion.ul
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease: "easeInOut" }}
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
                                        </li>
                                    ) : (
                                <li
                                            key={item.id}
                                            className={`relative group cursor-pointer flex items-center rounded-lg p-3.5 transition-all duration-500 ease-in-out ${
                                                location.pathname === item.link || item.sub.some((sub) => sub.link === location.pathname)
                                                    ? "bg-gray-50 dark:bg-cyan-900/30 shadow-lg shadow-cyan-300/50 transform scale-105"
                                                    : "bg-gray-100/80 dark:bg-gray-800"
                                            }
                                                 bg-gray-100/80 dark:bg-gray-800 hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                        >
                                            <div className={`absolute ${
                                                location.pathname === item.link || item.sub.some((sub) => sub.link === location.pathname)
                                                    ? "bg-gray-50 dark:bg-cyan-900/30 shadow-lg shadow-cyan-300/50 transform scale-105"
                                                    : "bg-gray-100/80 dark:bg-gray-800"
                                            } -right-2 rounded-full transition-all duration-500 group-hover:bg-white group-hover:drop-shadow-lg drop-shadow-cyan-300`}>
                                                <NavLink
                                                    to={item.link}
                                                    end
                                                    onClick={handleItemClick}
                                                    className={() =>
                                                        location.pathname === item.link
                                                            ? "w-13 h-13 text-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-cyan-600/70 dark:text-cyan-400 rounded-full"
                                                            : "w-13 h-13 bg-gray-50 dark:bg-gray-700 text-2xl rounded-full text-cyan-600/70 dark:text-white flex items-center justify-center"
                                                    }
                                                >
                                                    <div className={`${
                                                        location.pathname === item.link || item.sub.some((sub) => sub.link === location.pathname) ?"inline":"" } hidden group-hover:inline`}>
                                                        <FaIcons icon={item.icon_fill} />
                                                    </div>
                                                    <div className={`${
                                                        location.pathname === item.link || item.sub.some((sub) => sub.link === location.pathname) ?"hidden":"inline" } group-hover:hidden`}>
                                                        <FaIcons icon={item.icon_outline} />
                                                    </div>
                                                </NavLink>
                                            </div>
                                            <div className="dark:text-cyan-100 text-cyan-800 mr-10">{item.label}</div>
                                        </li>
                                    )
                            )}
                        </ul>
                        <button
                            onClick={() => dispatch(set_theme(!theme))}
                            className="relative w-14 h-8 flex items-center bg-gray-100 shadow dark:bg-gray-700 cursor-pointer rounded-full p-1 transition-colors"
                        >
                            <span
                                className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform ${
                                    theme ? "translate-x-6" : "translate-x-0"
                                }`}
                            ></span>

                            <PiMoonThin
                                className={`absolute left-1 w-6 h-6 text-cyan-300 transition-opacity ${
                                    theme ? "opacity-100" : "opacity-0"
                                }`}
                            />
                            <PiSunDimThin
                                className={`absolute right-1 w-6 h-6 text-orange-400 transition-opacity ${
                                    theme ? "opacity-0" : "opacity-100"
                                }`}
                            />
                        </button>
                    </div>

                </div>
            </div>

            {/*mobile*/}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-screen w-20 bg-gray-100 dark:bg-gray-800 z-40 flex flex-col items-center py-5 gap-4 transition-transform duration-300 ${
                    !open_slider ? "translate-x-0" : "translate-x-full"
                } lg:hidden`}
            >
                {SideItem.map((item) => (
                    <div key={item.id} className="relative flex flex-col items-center w-full">
                        <button
                            onClick={() => setSubId(subId === item.id ? 0 : item.id)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                subId === item.id
                                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-300/50 transform scale-105"
                                    : "bg-gray-200 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                            }`}
                        >
                            <div className={`${
                                location.pathname === item.link || item.sub.some((sub) => sub.link === location.pathname) ?"inline":"" } hidden group-hover:inline`}>
                                <FaIcons icon={item.icon_fill} />
                            </div>
                            <div className={`${
                                location.pathname === item.link || item.sub.some((sub) => sub.link === location.pathname) ?"hidden":"inline" } group-hover:hidden`}>
                                <FaIcons icon={item.icon_outline} />
                            </div>
                        </button>

                        <AnimatePresence>
                            {subId === item.id && (
                                <motion.ul
                                    initial={{ x: -60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -60, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`${!open_slider? "w-40" : "w-0"} absolute right-full top-0 mr-2  bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-right`}
                                >
                                    {item.sub.map((sub) => (
                                        <li key={sub.id}>
                                            <NavLink
                                                to={sub.link}
                                                onClick={handleItemClick}
                                                className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-cyan-300/50 dark:hover:bg-cyan-900/50 transition-colors`}
                                            >
                                                {sub.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                ))}
                <button
                    onClick={() => dispatch(set_theme(!theme))}
                    className="relative w-14 h-8 flex items-center bg-gray-100 shadow dark:bg-gray-700 rounded-full p-1 transition-colors"
                >
                    <span
                        className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform ${
                            theme ? "translate-x-6" : "translate-x-0"
                        }`}
                    ></span>

                    <PiMoonThin
                        className={`absolute left-1 w-6 h-6 text-cyan-300 transition-opacity ${
                            theme ? "opacity-100" : "opacity-0"
                        }`}
                    />
                    <PiSunDimThin
                        className={`absolute right-1 w-6 h-6 text-orange-400 transition-opacity ${
                            theme ? "opacity-0" : "opacity-100"
                        }`}
                    />
                </button>
            </div>
        </>
    );
};

export default Sidebar;