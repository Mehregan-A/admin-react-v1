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
// import UserWoman from "../../assets/images/UserWomen.png";
// import HeaderBox from "../../components/header/HeaderBox.jsx";



const Profile = () => {
    const navigate = useNavigate();
    const [openAdd ,setOpenAdd] = useState({open:false})
    const [openPass ,setOpenPass] = useState({open:false})

// Redux
    const dispatch = useDispatch();

// List article selector
    const { profile,isLoading_list,isError_list } = useSelector(state => state.profile);

    return (
        <>
            <div className={`flex flex-col gap-2 bg-gray-200 min-h-screen lg:container`}>
                {/* Header */}
                <div className={`flex flex-col gap-3 min-h-120`}>
                    {isLoading_list
                        ?<Loading />
                        :isError_list
                            ?<Reject />
                            :profile &&
                            <div className="w-full bg-gray-50 p-4 rounded-3xl shadow-lg">
                                {profile &&
                                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                                        {/*profile*/}
                                        <div className="md:col-span-2 flex justify-center items-center">
                                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sky-700 bg-indigo-50 overflow-hidden flex justify-center items-center">
                                                {/*<img className="w-full h-full object-cover" src={ profile?.user?.image ? Config.apiImage + profile?.user?.image :profile?.gender === "female" ? UserWoman : UserImage} alt="profile"*/}
                                                />
                                            </div>
                                        </div>
                                        {/* info */}
                                        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div className="h-10 border border-gray-300 bg-gray-50 rounded-xl p-2 mt-5">
                                                <span className="text-sky-700 text-xs pl-1">نام:</span>
                                                <span className="text-gray-800 text-sm">{profile?.name} </span>
                                            </div>

                                            <div className="h-10 border border-gray-300 bg-gray-50 rounded-xl p-2 sm:mt-5">
                                                <span className="text-sky-700 text-xs pl-1">نام خانوادگی:</span>
                                                <span className="text-gray-800 text-sm">{profile?.family} </span>
                                            </div>

                                            <div className="h-10 border border-gray-300 bg-gray-50 rounded-xl p-2">
                                                <span className="text-sky-700 text-xs pl-1">نام کاربری:</span>
                                                <span className="text-gray-800 text-sm">{profile?.username} </span>
                                            </div>

                                            <div className="h-10 border border-gray-300 bg-gray-50 rounded-xl p-2">
                                                <span className="text-sky-700 text-xs pl-1">تلفن:</span>
                                                <span className="text-gray-800 text-sm">{profile?.mobile} </span>
                                            </div>
                                            <div className="h-10 border border-gray-300 bg-gray-50 rounded-xl p-2">
                                                <span className="text-sky-700 text-xs pl-1">جنسیت:</span>
                                                <span className="text-gray-800 text-sm">{profile?.gender === "male" ?"آقا":"خانم"} </span>
                                            </div>
                                            <div className="h-10 border border-gray-300 bg-gray-50 rounded-xl p-2">
                                                <span className="text-sky-700 text-xs pl-1">وضعیت:</span>
                                                <span className="text-gray-800 text-sm">{profile?.status === "active" ?"فعال":"غیر فعال"} </span>
                                            </div>
                                            <button
                                                onClick={()=>setOpenAdd({open:true})}
                                                className="w-full h-10 flex justify-center gap-2 px-4 py-2 items-center bg-sky-700 hover:bg-sky-800 text-white rounded-xl transition-colors cursor-pointer md:mt-4">
                                                ویرایش
                                            </button>
                                            <button
                                                onClick={()=>setOpenPass({open:true})}
                                                className="flex items-center justify-center gap-2 px-4 py-2 h-10 bg-sky-700 hover:bg-sky-800 text-white rounded-xl transition-colors cursor-pointer md:mt-4">
                                                تغییر رمز عبور
                                            </button>
                                        </div>
                                    </div>
                                }
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