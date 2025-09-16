import Image from '/src/assets/image/logo-sidebar.jpg';
import { SideItem } from "../assets/data/data.js";
import { NavLink, useLocation } from "react-router-dom";
import FaIcons from "./Icon.jsx";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import {PiMoonThin, PiSunDimThin} from "react-icons/pi";
import {set_theme} from "../feature/redux/ThemeSlice.jsx";

const Sidebar = ({ open_close, open_slider }) => {
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

    return (
        <>
            {open_slider && (
                <div
                    onClick={open_close}
                    className="no-print fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 z-20 lg:hidden"
                ></div>
            )}

            <div
                ref={sidebarRef}
                className={`your-scroll-container flex-shrink-0 no-print fixed lg:sticky m-2  lg:self-start z-30 overflow-y-auto rounded-4xl shadow-xl backdrop-blur-md  transition-all duration-500 ease-in-out ${
                    open_slider ? "w-64 translate-x-0 " : "w-0 translate-x-full "
                } dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 bg-gradient-to-b from-stone-100 via-white to-stone-100  `}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className="mt-7 mx-3 flex flex-col items-center justify-center text-sm">
                        <ul className="pt-10 mb-10 flex flex-col gap-1 w-full">
                            {SideItem.map((item) =>
                                item.sub.length > 0 ? (
                                    <li
                                        key={item.id}
                                        className="flex flex-col w-full"
                                    >

                                        <div
                                            onClick={() => subMenu(item.id)}
                                            className={`anime_hover w-full duration-500 group transition-colors cursor-pointer flex items-center rounded-full p-1 ${
                                                subId === item.id
                                                    ? "bg-gradient-to-l from-gray-200 via-gray-300 to-gray-400 dark:bg-gradient-to-l dark:from-stone-400/90 dark:via-stone-600 dark:to-stone-700/30"
                                                    : "hover:bg-gradient-to-l from-gray-100 via-gray-200 to-gray-300 dark:hover:bg-gradient-to-l dark:from-stone-400/90 dark:via-stone-600 dark:to-stone-700/30"
                                            }`}
                                        >

                                        <div className={`${subId === item.id?"bg-gray-300 dark:bg-stone-300/40":"bg-gray-100 dark:bg-stone-600/80"} rounded-full transition-colors  group-hover:bg-gray-200 dark:group-hover:bg-stone-300/40  text-stone-800 dark:text-white`}>
                                                <NavLink
                                                    to={item.link }
                                                    className={() =>
                                                        location.pathname === item.link ||
                                                        item.sub.some((sub) => sub.link === location.pathname)
                                                            ? "active-link w-11.5 h-11.5 text-2xl flex items-center justify-center rounded-full"
                                                            : "inactive-link w-11.5 h-11.5 bg-gray-600 dark:bg-stone-700 rounded-full text-2xl text-stone-200 dark:text-stone-50 flex items-center justify-center"
                                                    }
                                                >
                                                    <div className={`${subId === item.id?"inline":"hidden"} hidden group-hover:inline`}>
                                                        <FaIcons icon={item.icon_fill} />
                                                    </div>
                                                    <div className={`${subId === item.id?"hidden":"inline"} hidden group-hover:hidden`}>
                                                        <FaIcons icon={item.icon_outline} />
                                                    </div>
                                                </NavLink>
                                            </div>
                                            <div className="flex justify-between items-center w-full mr-2.5">
                                                <span className="dark:text-stone-100 text-stone-800">{item.label}</span>
                                                <HiOutlineChevronDown
                                                    className={`anime_hover transition-transform duration-300 dark:text-stone-100 text-stone-800 ${
                                                        subId === item.id ? "rotate-0" : "rotate-90"
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        {subId === item.id && (
                                            <ul className="ml-8 mt-2 flex flex-col">
                                                {item.sub.map((sub) => (
                                                    <li key={sub.id} className="relative flex items-center py-2">
                                                        <div className="absolute right-6 top-0 bottom-0 flex items-center">
                                                            <div className="w-[0.5px] h-full bg-stone-600 dark:bg-stone-100 ml-2" />
                                                        </div>

                                                        <NavLink
                                                            to={sub.link}
                                                            className={({ isActive }) =>
                                                                `flex items-center gap-2 px-3 py-1 rounded-full transition-colors w-full ${
                                                                    isActive
                                                                        ? " font-semibold"
                                                                        : "text-gray-700 dark:text-stone-300 "
                                                                }`
                                                            }
                                                        >

                                                            <div className="flex-shrink-0 mr-[9px] w-1 h-1 z-30">

                                                                <div
                                                                    className={`w-1.5 h-1 rounded-full  ${
                                                                        location.pathname === sub.link ? "bg-stone-600 dark:bg-stone-100" : "bg-transparent"
                                                                    }`}
                                                                />
                                                            </div>

                                                            <div className="bg-gray-100 dark:bg-stone-600 w-full py-2.5 px-4 text-stone-800 dark:text-stone-100 rounded-3xl mr-1">
                                                                {sub.label}
                                                            </div>
                                                        </NavLink>
                                                    </li>
                                                ))}

                                            </ul>
                                        )}
                                    </li>
                                ) : (
                                    <li key={item.id} className="group transition-colors cursor-pointer flex items-center rounded-full hover:bg-gradient-to-l from-gray-400 via-gray-300 to-gray-100   dark:hover:bg-gradient-to-l dark:hover:from-stone-400/90 dark:hover:via-stone-600 dark:hover:to-stone-700/30 p-1">
                                        <div className="rounded-full transition-colors group-hover:bg-white dark:group-hover:bg-stone-300/40 bg-gray-100 dark:bg-stone-600/80 text-white">
                                            <NavLink
                                                to={item.link}
                                                end
                                                onClick={handleItemClick}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "w-11.5 h-11.5 text-2xl flex items-center justify-center rounded-full"
                                                        : "inactive-link w-11.5 h-11.5 bg-gray-600 dark:bg-stone-700 text-2xl rounded-full text-gray-50 dark:text-stone-50 flex items-center justify-center"
                                                }
                                            >
                                                <div className="hidden group-hover:inline">
                                                    <FaIcons icon={item.icon_fill} />
                                                </div>
                                                <div className="group-hover:hidden">
                                                    <FaIcons icon={item.icon_outline} />
                                                </div>
                                            </NavLink>
                                        </div>
                                        <div className="dark:text-stone-100 text-stone-800 mr-2.5">{item.label}</div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                </div>
                <div className="p-5">
                    <PiMoonThin onClick={()=>{dispatch(set_theme(false))}} className={`${theme ? 'block' : 'hidden'} w-8 h-8 text-stone-200`} />
                    <PiSunDimThin onClick={()=>{dispatch(set_theme(true))}} className={`${theme ? 'hidden' : 'block'} w-8 h-8 text-stone-200`} />
                </div>

            </div>
        </>
    );

};

export default Sidebar;