import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Config} from "../../config/Config.jsx";
// import UserImage from "../../assets/images/User.png";
import {getAsyncProfile} from "../../feature/redux/ProfileSlice.jsx";
// import PasswordProfile from "./PasswordProfile.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {useNavigate} from "react-router";
import {MdOutlineHome, MdOutlinePerson, MdOutlinePlaylistAddCheck} from "react-icons/md";
import CategoryNotFound from "../../assets/image/category_not_found.png";
import {TbLock, TbLockFilled} from "react-icons/tb";
// import UserWoman from "../../assets/images/UserWomen.png";
// import HeaderBox from "../../components/header/HeaderBox.jsx";



const Profile = () => {
    const navigate = useNavigate();
    const [openAdd ,setOpenAdd] = useState({open:false})
    const [openPass ,setOpenPass] = useState({open:false})

// Redux
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAsyncProfile())
    },[])

// List article selector
    const { profile,isLoading_list,isError_list } = useSelector(state => state.profile);
    console.log(profile)

    return (
        <>
            <div className={`flex flex-col gap-2 bg-gray-200 dark:bg-gray-800 min-h-screen lg:container`}>
                {/* Header */}
                <div className={`flex flex-col gap-3 min-h-120`}>
                    {isLoading_list
                        ?<Loading />
                        :isError_list
                            ?<Reject />
                            :profile &&
                            <div className="w-full bg-gray-50 dark:bg-gray-800 p-7 rounded-xl shadow-lg flex flex-col gap-4">
                                <span className="text-xl text-gray-800 dark:text-gray-100 p-2">پروفایل</span>
                                <div className="flex items-center gap-7">
                                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 rounded-full border border-gray-100 drop-shadow-xl drop-shadow-cyan-300">
                                        <img
                                            src={profile.image ? Config.apiImage + profile.image : CategoryNotFound}
                                            className="w-full h-full rounded-full object-cover"
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className='bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600  border rounded-2xl w-20 items-center flex justify-center'>
                                            <span className='dark:text-gray-200 text-gray-700'>{profile.role}</span>
                                        </div>
                                        <div className='flex justify-center text-xl dark:text-gray-100'>
                                            <span>{profile.name}</span>
                                            <span>{profile.family}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-7">
                                    <div className="flex flex-col gap-2">
                                        <span className="dark:text-gray-300 text-gray-800">نام</span>
                                        <div className='relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 border rounded-2xl h-8 items-center flex justify-center p-5'>
                                            <div>
                                                <div className='dark:text-gray-100 text-gray-700'>
                                                    <span>{profile.name}</span>
                                                    <span>{profile.family}</span>
                                                </div>
                                            </div>
                                            <div className='absolute -bottom-px h-px w-40 bg-gradient-to-r dark:from-gray-600 dark:via-gray-100 dark:to-gray-600 from-gray-200 via-gray-600 to-gray-200 items-center flex'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="dark:text-gray-300 text-gray-800">نام کاریری</span>
                                        <div className='relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 border rounded-2xl h-8 items-center flex justify-center p-5'>
                                            <div>
                                                <div className='dark:text-gray-100 text-gray-700'>
                                                    <span>{profile.username}</span>
                                                </div>
                                            </div>
                                            <div className='absolute -bottom-px h-px w-40 bg-gradient-to-r dark:from-gray-600 dark:via-gray-100 dark:to-gray-600 from-gray-200 via-gray-600 to-gray-200 items-center flex'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="dark:text-gray-300 text-gray-800">موبایل</span>
                                        <div className='relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 border rounded-2xl h-8 items-center flex justify-center p-5'>
                                            <div>
                                                <div className='dark:text-gray-100 text-gray-700'>
                                                    <span>{profile.mobile}</span>
                                                </div>
                                            </div>
                                            <div className='absolute -bottom-px h-px w-40 bg-gradient-to-r dark:from-gray-600 dark:via-gray-100 dark:to-gray-600 from-gray-200 via-gray-600 to-gray-200 items-center flex'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="dark:text-gray-300 text-gray-800">جنسیت</span>
                                        <div className='relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 border rounded-2xl h-8 items-center flex justify-center p-5'>
                                            <div>
                                                <div className='dark:text-gray-100 text-gray-700'>
                                                    <span>{profile.gender==="male"?"آقا":"خانم"}</span>
                                                </div>
                                            </div>
                                            <div className='absolute -bottom-px h-px w-40 bg-gradient-to-r dark:from-gray-600 dark:via-gray-100 dark:to-gray-600 from-gray-200 via-gray-600 to-gray-200 items-center flex'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="dark:text-gray-300 text-gray-800">وضعیت</span>
                                        <div className='relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 border rounded-2xl h-8 items-center flex justify-center p-5'>
                                            <div>
                                                <div className={`${profile.status==="active"?"text-green-500":"text-red-500"} `}>
                                                    <span>{profile.status==="active"?"فعال":"غیرفعال"}</span>
                                                </div>
                                            </div>
                                            <div className='absolute -bottom-px h-px w-40 bg-gradient-to-r dark:from-gray-600 dark:via-gray-100 dark:to-gray-600 from-gray-200 via-gray-600 to-gray-200 items-center flex'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className='relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 border rounded-2xl items-center flex justify-center p-5'>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-10 h-10  items-center flex justify-center dark:text-gray-100 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-600 border-gray-200 dark:border-gray-600 border rounded-full">
                                                    <TbLockFilled size={25} />
                                                </div>
                                                <div className='dark:text-gray-100 text-gray-700'>
                                                    <span className="text-xl">تغییر رمز</span>
                                                </div>
                                            </div>
                                            <div className='absolute -bottom-px h-px w-40 bg-gradient-to-r dark:from-gray-600 dark:via-gray-100 dark:to-gray-600 from-gray-200 via-gray-600 to-gray-200 items-center flex'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
                {/*/!* change password Component *!/*/}
                {/*{openPass.open && (*/}
                {/*    <div className="fixed inset-0 z-50 flex items-center justify-center">*/}
                {/*        <PasswordProfile*/}
                {/*            open_slider={openPass.open}*/}
                {/*            open_close={() => setOpenPass({ open: !openPass.open })}*/}
                {/*            reload={() => dispatch(getAsyncProfile())}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </>
    );
};

export default Profile;