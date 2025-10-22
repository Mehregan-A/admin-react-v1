import {useLocation, useParams} from "react-router-dom";
import CategoryNotFound from "../../assets/image/category_not_found.png"
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    categoryClearResultDelete,
    deleteAsyncCategory,
    getAsyncListCategory, getAsyncStatusCategory,
} from "../../feature/redux/CategorySlice.jsx";
import {Config} from "../../config/Config.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
import DataTable from "../../components/dataTable/DataTable.jsx";
import {IoBanOutline, IoCreateOutline, IoKeyOutline, IoListOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import {PiChartPieSlice} from "react-icons/pi";
import {
    deleteAsyncSlider,
    getAsyncListSlider,
    getAsyncStatusSlider,
    sliderClearResultDelete
} from "../../feature/redux/SliderSlice.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {BiSolidError} from "react-icons/bi";
import {persianDateNT} from "../../components/utility/persianDateNT.js";
import AddSubCategory from "../subCategory/AddSubCategory.jsx";
import {getAsyncListSubCategory} from "../../feature/redux/CategorySubSlice.jsx";
import AddSlider from "./AddSlider.jsx";
import {MdPublishedWithChanges} from "react-icons/md";
import PagingGetUrl from "../../components/PagingGetUrl.jsx";


const SliderList = () => {
    const [openAdd ,setOpenAdd] = useState({open:false})
    const [openAtt ,setOpenAtt] = useState({open:false})
    const navigate = useNavigate();
    const location = useLocation();
    const openModal = location.state?.openModal;
    // AcceptMessage.jsx module
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ actionType: "", id: "", text: "" });
    const [isIdsEdit,setIdsEdit] = useState({id:"",action:""});
// Redux
    const dispatch = useDispatch();
    const { page,row } = useParams();
// List article selector
    const { list_slider,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.slider);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListSlider({ row, page}));
            navigate(`/slider/list/${row}/${page}`);
        }
    }, [row,page, dispatch, navigate]);
    // Open user form with selected id
    const setOpenId = (id,action) => {
        setOpenAdd({ open: true });
        setIdsEdit({id,action});
    };
    const setOpenIdAtt = (id,action) => {
        setOpenAtt({ open: true });
        setIdsEdit({id,action});
    };
    // Handle delete or deactivate action
    const handleActionRequest = useCallback((type, id) => {
        if (type === "draft"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را منتشر کنید؟"
            setModalData({ actionType: type, id, text });
        }else if (type === "published"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را پیش نویس کنید؟"
            setModalData({ actionType: type, id, text });
        }else if (type === "delete"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟"
            setModalData({ actionType: type, id, text });
        }
        setShowModal(true);
    }, []);

    // Confirm delete/deactivate
    const handleAccept = useCallback(async () => {
        try {
            const { actionType, id } = modalData;

            if (actionType === "delete") {
                await dispatch(deleteAsyncSlider({ del: id }));
            } else if (actionType === "draft") {
                await dispatch(getAsyncStatusSlider({Id: id,status:'published'}));
            }else if (actionType === "published") {
                await dispatch(getAsyncStatusSlider({Id: id,status:'draft'}));
            }

            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }, [modalData, dispatch]);
    useEffect(() => {
        if(result_delete && result_delete?.status){
            if(result_delete.status === 200) {
                Toast.success(`${result_delete.data.message}`);
                dispatch(sliderClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(sliderClearResultDelete())
            }
        }
    }, [result_delete]);
    // Cancel modal
    const handleReject = useCallback(() => {
        setShowModal(false);
    }, []);
    const ButtonWithTooltip = ({ onClick, icon, text, hoverColor }) => (
        <div className="relative group">
            <button onClick={onClick} className={`w-7 h-7 rounded-full flex items-center justify-center ${hoverColor} text-gray-700 dark:text-gray-100 cursor-pointer`}>
                {icon}
            </button>
            <span className={`absolute mb-1 px-2 py-1 text-xs text-gray-700 dark:text-gray-100 dark:bg-gray-800 bg-gray-100 rounded-lg drop-shadow-lg  drop-shadow-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 left-0`}>
                {text}
            </span>
        </div>
    );
    useEffect(() => {
        if (openModal) {
            setOpenAdd({ open: !openAdd.open })
        }
    }, [openModal]);

    return (
        <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex justify-between items-center p-2">
                <div className="flex justify-start gap-2 p-5">
                    <div className="text-gray-400 dark:text-gray-300">داشبورد |</div>
                    <div className="text-cyan-700 dark:text-cyan-400">بنر</div>
                </div>

                <button
                    onClick={() => setOpenId("")}
                    className="flex justify-center items-center gap-2 p-3 bg-gray-100 dark:hover:bg-gray-800/90 hover:bg-gray-200 dark:bg-gray-800 border dark:border-0 border-cyan-300 dark:inset-shadow-sm inset-shadow-gray-900 dark:inset-shadow-cyan-400 drop-shadow-lg dark:drop-shadow-gray-500 dark:hover:drop-shadow-cyan-400 transition-all cursor-pointer rounded-2xl w-32 dark:text-gray-200 text-sm"
                >
                    افزودن بنر
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 min-h-120 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-700 inset-shadow-sm inset-shadow-cyan-400 p-5">
                {isLoading_list ? (
                    <Loading />
                ) : isError_list ? (
                    <Reject />
                ) : list_slider?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-2 mt-4">
                        {list_slider.data.map((banner) => (
                            <div
                                key={banner.id}
                                className="bg-white drop-shadow-lg drop-shadow-cyan-200 rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="relative w-full  h-36 bg-gray-100">
                                    <img
                                        src={
                                            banner.image
                                                ? Config.apiImage + banner.image
                                                : CategoryNotFound
                                        }
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <span
                                        className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                                            banner.status === "published"
                                                ? "bg-green-100 dark:bg-gray-800 dark:text-green-500 text-green-700"
                                                : "bg-gray-100 dark:bg-gray-800  text-yellow-500 dark:text-yellow-300"
                                        }`}
                                    >
                                {banner.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                              </span>
                                </div>

                                <div className="bg-gradient-to-br from-[#fdffd7] to-[#D1FDFF] dark:from-cyan-500/40  dark:to-gray-800">
                                    <div className="p-2 flex  flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                                                {banner.title}
                                            </h2>
                                            <div className="flex gap-1 items-center justify-end">
                                                <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">تاریخ انتشار:</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                                                    {persianDateNT.unixWithoutTime(banner.publish_at)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 items-center">
                                            <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">url:</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                                                {banner.url}
                                            </p>
                                        </div>

                                    </div>
                                    <div className="flex gap-1 justify-end p-6">
                                        <ButtonWithTooltip
                                            onClick={() => setOpenId(banner.id, "edit")}
                                            icon={<IoCreateOutline className="w-5 h-5" />}
                                            text="ویرایش "
                                            hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                                        />
                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest(banner.status, banner.id)}
                                            icon={<MdPublishedWithChanges className="w-5 h-5" />}
                                            text={`${banner.status === "published"?"پیش نویس":"انتشار"}`}
                                            hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                                        />
                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest("delete", banner.id)}
                                            icon={<IoTrashOutline className="w-5 h-5" />}
                                            text="حذف"
                                            hoverColor="hover:text-red-600 dark:hover:text-red-400"
                                        />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex mt-20 flex-col gap-4 items-center justify-center">
                        <BiSolidError
                            size={35}
                            className="text-cyan-400 animate-pulse"
                        />
                        <span className="font-semibold">موردی برای نمایش وجود ندارد.</span>
                    </div>
                )}
            </div>
            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddSlider
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListSlider({ row, page }))}
                        Id={isIdsEdit.id}
                        list_slider={list_slider.data}
                    />
                </div>
            )}
            {showModal && (
                <AcceptMessage
                    isLoading={isLoading_action}
                    text={modalData.text}
                    accept={handleAccept}
                    reject={handleReject}
                    open_close={() => setShowModal(!showModal)}
                    showModal={showModal}
                />
            )}
            {/*<div className='flex justify-end p-2 rounded-3xl mt-3'>*/}
            {/*    <PagingGetUrl total_page={list_slider?.page} searchParams={searchParams}/>*/}
            {/*</div>*/}
        </div>

    );
};

export default SliderList;