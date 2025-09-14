// import Image from '/src/assets/images/User.png';
import { SideItem } from "../assets/data/data.js";
import { NavLink, useLocation } from "react-router-dom";
import FaIcons from "./Icon.jsx";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import { FaX } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Config } from "../config/Config.jsx";
import { IoShieldOutline } from "react-icons/io5";
import {RiBox3Line, RiHome3Fill, RiHome5Fill} from "react-icons/ri";
import {GoHomeFill} from "react-icons/go";
// import { getAsyncProfile } from "../feature/redux/ProfileSlice.jsx";
// import UserWoman from "../assets/images/UserWomen.png";
// import UserImage from "../assets/images/User.png";

const Sidebar = ({ open_close, open_slider }) => {
    // const { profile } = useSelector(state => state.profile);
    // const dispatch = useDispatch();
    const location = useLocation();

    const sidebarRef = useRef();

    // useEffect(() => {
    //     dispatch(getAsyncProfile());
    // }, [dispatch]);

    const [subId, setSubId] = useState(0);
    const [childId, setChildId] = useState(0);

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

    const childMenu = (input) => {
        setChildId(childId === input ? 0 : input);
    };

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
    const minScale = 0.7;
    const maxScale = 1;
    const scale = Math.max(minScale, maxScale - scrollY / 150);

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
                } gradient`}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className="mt-7 mx-3 flex flex-col items-center justify-center text-sm">
                        <div className='w-full'>
                            <ul className="pt-3 mb-10 flex flex-col gap-1">
                               {SideItem.map((item) =>
                                <li key={item.id} className='group transition-colors cursor-pointer flex justify-start rounded-full hover:bg-gradient-to-l from-stone-400/90 via-stone-600 to-stone-700/30  p-1 items-center '>
                                    <div className='rounded-full transition-colors group-hover:bg-stone-300/40 bg-stone-600/80 text-white'>
                                        <NavLink
                                            to={item.link}
                                            end
                                            onClick={handleItemClick}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "  w-11.5 h-11.5  text-2xl  items-center flex justify-center"
                                                    : "inactive-link  w-11.5 h-11.5 bg-stone-700 text-2xl text-stone-50 items-center flex justify-center"
                                            }
                                        >
                                            <div className='hidden group-hover:inline'>
                                                <FaIcons icon={item.icon_fill} />
                                        </div>
                                            <div className=' group-hover:hidden'>
                                                <FaIcons icon={item.icon_outline} />
                                            </div>
                                        </NavLink>
                                    </div>
                                    <div className='text-stone-100 mr-2.5'>{item.label}</div>

                                </li>
                               )}
                                {/*<li className='flex justify-start rounded-full  p-1 items-center'>*/}
                                {/*    <div className="rounded-full w-11.5 h-11.5 bg-stone-700 text-2xl text-stone-200 items-center flex justify-center">*/}
                                {/*        <RiBox3Line />*/}
                                {/*    </div>*/}
                                {/*    <div className='text-stone-400 mr-2.5'>محصولات</div>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                        {/* items */}
                        {/*<div className="w-full">*/}
                        {/*    <ul className="pt-3 mb-10 flex flex-col gap-3">*/}
                        {/*        {SideItem.map((item) =>*/}
                        {/*            item.sub.length > 0 ? (*/}
                        {/*                <li*/}
                        {/*                    key={item.id}*/}
                        {/*                    className={`${*/}
                        {/*                        subId === item.id ? "gap-1" : "gap-0"*/}
                        {/*                    } anime_hover duration-500 delay-150 overflow-hidden flex flex-col rounded-2xl  `}*/}
                        {/*                >*/}
                        {/*                    <NavLink*/}
                        {/*                        to={item.link}*/}
                        {/*                        onClick={(e) => {*/}
                        {/*                            e.preventDefault();*/}
                        {/*                            subMenu(item.id);*/}
                        {/*                        }}*/}
                        {/*                        className={() =>*/}
                        {/*                            location.pathname === item.link ||*/}
                        {/*                            item.sub.some((sub) => sub.link === location.pathname)*/}
                        {/*                                ? "active-link p-1.5 rounded-2xl flex justify-between items-center hover:bg-gray-200 transition-colors "*/}
                        {/*                                : "inactive-link p-1.5 rounded-2xl flex justify-between items-center hover:bg-gray-200 transition-colors"*/}
                        {/*                        }*/}
                        {/*                    >*/}
                        {/*                        <div className="flex items-center gap-2">*/}
                        {/*                            <FaIcons icon={item.icon} />*/}
                        {/*                            <span className="mr-2">{item.label}</span>*/}
                        {/*                        </div>*/}
                        {/*                        <HiOutlineChevronDown*/}
                        {/*                            className={`anime_hover transition-transform duration-300 ${*/}
                        {/*                                subId === item.id ? "rotate-0" : "rotate-90"*/}
                        {/*                            }`}*/}
                        {/*                        />*/}
                        {/*                    </NavLink>*/}

                        {/*                    <ul*/}
                        {/*                        className={`flex flex-col gap-1 px-3 rounded-sm transition-[max-height,opacity] duration-600 ease-in-out overflow-hidden ${*/}
                        {/*                            subId === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"*/}
                        {/*                        }`}*/}
                        {/*                    >*/}
                        {/*                        {item.sub.map((detail) => (*/}
                        {/*                            <li key={detail.id} className="anime_hover duration-1000 delay-150 transition-colors">*/}
                        {/*                                <NavLink*/}
                        {/*                                    to={detail.link}*/}
                        {/*                                    onClick={() => {*/}
                        {/*                                        childMenu(detail.id);*/}
                        {/*                                        handleItemClick();*/}
                        {/*                                    }}*/}
                        {/*                                    className={({ isActive }) =>*/}
                        {/*                                        isActive*/}
                        {/*                                            ? "active-link flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-200 space-x-2 cursor-pointer transition-colors "*/}
                        {/*                                            : "inactive-link flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-200 space-x-2 cursor-pointer transition-colors "*/}
                        {/*                                    }*/}
                        {/*                                >*/}
                        {/*                                    <div className="flex items-center gap-2">*/}
                        {/*                                        <FaCircle className="w-2 h-2" />*/}
                        {/*                                        <span>{detail.label}</span>*/}
                        {/*                                    </div>*/}
                        {/*                                </NavLink>*/}
                        {/*                            </li>*/}
                        {/*                        ))}*/}
                        {/*                    </ul>*/}
                        {/*                </li>*/}
                        {/*            ) : (*/}
                        {/*                <li key={item.id} className="rounded-2xl  transition-colors  hover:shadow-xl hover:border-l-2  border-emerald-400">*/}
                        {/*                    <NavLink*/}
                        {/*                        to={item.link}*/}
                        {/*                        end*/}
                        {/*                        onClick={handleItemClick}*/}
                        {/*                        className={({ isActive }) =>*/}
                        {/*                            isActive*/}
                        {/*                                ? "active-link flex items-center p-2.5 flex-row gap-1"*/}
                        {/*                                : "inactive-link flex items-center p-2.5 flex-row gap-1"*/}
                        {/*                        }*/}
                        {/*                    >*/}
                        {/*                        <FaIcons icon={item.icon} />*/}
                        {/*                        <span className="mr-2">{item.label}</span>*/}
                        {/*                    </NavLink>*/}
                        {/*                </li>*/}
                        {/*            )*/}
                        {/*        )}*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>

                </div>
            </div>
        </>
    );

};

export default Sidebar;