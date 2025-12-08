import {Link, useLocation, useParams} from "react-router-dom";
import {HiTrash} from "react-icons/hi2";
import {HiOutlinePencilAlt, HiOutlineUserCircle} from "react-icons/hi";
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    FaCar,
    FaChevronLeft,
    FaFileSignature,
    FaKey,
    FaListUl, FaMoneyBillWave,
    FaPen,
    FaPercentage,
    FaRegIdCard,
    FaTasks,
    FaUserTie
} from "react-icons/fa";
import {VscCircleSlash} from "react-icons/vsc";
import PagingGetUrl from "../../components/PagingGetUrl.jsx";
import {FaCirclePlus, FaClipboardUser} from "react-icons/fa6";
// import AddAdmin from "./AddAdmin.jsx";
import {
    adminClearResult, adminClearResultDelete,
    deleteAsyncAdmin,
    getAsyncListAdmin,
    getAsyncStatusAdmin
} from "../../feature/redux/AdminSlice.jsx";
import Loading from "../../components/loading/Loading.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
// import PasswordAdmin from "./PasswordAdmin.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {Config} from "../../config/Config.jsx";
// import UserImage from "../../assets/images/User.png";
import {BiSolidError} from "react-icons/bi";
import PerPageSelector from "../../components/RowSelector.jsx";
import {MdOutlineGroups, MdOutlinePerson, MdOutlineSupervisorAccount} from "react-icons/md";
import {IoBanOutline, IoCreateOutline, IoKeyOutline, IoPersonCircleOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import {
    couponClearResultDelete,
    deleteAsyncCoupon,
    getAsyncListCoupon,
    getAsyncStatusCoupon
} from "../../feature/redux/CouponSlice.jsx";
import {persianDateNT} from "../../components/utility/persianDateNT.js";

const CouponList = () => {

    const [openAdd ,setOpenAdd] = useState({open:false})
    const [openPass ,setOpenPass] = useState({open:false})
    const navigate = useNavigate();
    const location = useLocation();
    const openModal = location.state?.openModal;
    // AcceptMessage.jsx module
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ actionType: "", id: "", text: "" });
    const [isIdsEdit,setIdsEdit] = useState("");

// Redux
    const dispatch = useDispatch();
    const { page,row } = useParams();

// List article selector
    const { list_coupon,result_delete,isLoading_list,isError_list,result,isLoading_action } = useSelector(state => state.coupon);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListCoupon({ row, page}));
            navigate(`/coupon/list/${row}/${page}`);
        }
    }, [row,page, dispatch, navigate]);

    // Open admin form with selected id
    const setOpenId = (id) => {
        setOpenAdd({ open: true });
        setIdsEdit(id);
    };
    // Open change password admin form with selected id
    const passModal = (id) => {
        setOpenPass({ open: true });
        setIdsEdit(id);
    };

    // Handle delete or deactivate action
    const handleActionRequest = useCallback((type, id) => {
        if (type === "active"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را غیرفعال کنید؟"
            setModalData({ actionType: type, id, text });
        }else if (type === "inactive"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را فعال کنید؟"
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
                await dispatch(deleteAsyncCoupon({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusCoupon({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusCoupon({ Id: id }));
            }
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }, [modalData, dispatch]);

    // Cancel modal
    const handleReject = useCallback(() => {
        setShowModal(false);
    }, []);
    useEffect(() => {
        if(result_delete && result_delete?.status){
            if(result_delete.status === 200) {
                Toast.success(`${result_delete.data.message}`);
                dispatch(couponClearResultDelete());

            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(couponClearResultDelete())
            }
        }
    }, [result_delete]);
    // useEffect(() => {
    //     if(result && result?.status){
    //         if (result.status === 200){
    //             dispatch(getAsyncProfile())
    //         }
    //     }
    // }, [result]);
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
        <>
            <div className="flex flex-col gap-2 ">
                {/* Header */}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-start gap-2 p-5'>
                        <div className="text-gray-400 dark:text-gray-300">  داشبورد   |  </div>
                        <div className="text-cyan-700 dark:text-cyan-400">کوپن</div>
                    </div>
                    <button
                        onClick={() => navigate("/coupon/add")}
                        className='flex justify-center items-center gap-2 p-3 bg-gray-100 dark:hover:bg-gray-800/90 hover:bg-gray-200 dark:bg-gray-800 border dark:border-0 border-cyan-300 dark:inset-shadow-sm inset-shadow-gray-900 dark:inset-shadow-cyan-400  drop-shadow-lg dark:drop-shadow-gray-500 dark:hover:drop-shadow-cyan-400 transition-all cursor-pointer rounded-2xl w-32 dark:text-gray-200 text-sm'>افزودن کوپن</button>
                </div>
                {/* Admin Cards */}
                <div className={`flex flex-col gap-3 min-h-120 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-700 inset-shadow-sm inset-shadow-cyan-400  p-5  `}>
                    <div className="flex flex-row justify-end items-center gap-1 px-4">
                    </div>
                    {isLoading_list
                        ?<Loading />
                        :isError_list
                            ?<Reject />
                            :list_coupon?.data?.length > 0
                                ?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-2 mt-4 ">
                                    {list_coupon?.data &&
                                        list_coupon?.data?.map((item, index) => (
                                            <div key={index} className="relative  flex shadow-md dark:shadow-cyan-500  border-gray-300 rounded-2xl  overflow-hidden hover:shadow-md transition-all duration-300">
                                                <div className="flex flex-col flex-1 p-4">
                                                    <div className="flex items-center gap-3 mb-3">

                                                        <div className="flex justify-between w-full">
                                                            <div>
                                                                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                                                                    کد:{item.code}
                                                                </h3>
                                                                <p className="text-xs text-gray-500 dark:text-gray-200">تاریخ شروع: {persianDateNT.unixWithoutTime(item.start_at)}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-200">تاریخ پایان: {persianDateNT.unixWithoutTime(item.expires_at)}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-200"> حداقل سفارش: {item.min_order}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-200"> تعداد دفعات استفاده : {item.max_uses}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-200"> محدود به سفارش اول : {item.first_order_only===1?"بله":"خیر"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <span
                                                            className={`text-xs font-semibold px-2 py-1 rounded-xl ${
                                                                item.status === "active"
                                                                    ? "bg-green-100 dark:bg-gray-700 text-green-700 dark:text-emerald-400"
                                                                    : "bg-red-100 dark:bg-gray-700  dark:text-red-400 text-red-700"
                                                            }`}
                                                        >
                                                          {item.status === "active" ? "فعال" : "غیرفعال"}
                                                        </span>

                                                        <div className="flex gap-1">
                                                            <ButtonWithTooltip
                                                                onClick={() => navigate(`/coupon/add/${item.id}`)}
                                                                icon={<IoCreateOutline className="w-5 h-5" />}
                                                                text="ویرایش "
                                                                hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                                                            />
                                                            <ButtonWithTooltip
                                                                onClick={() => handleActionRequest(item.status, item.id)}
                                                                icon={<IoBanOutline className="w-5 h-5" />}
                                                                text={`${item.status === "active"?"غیرفعال":"فعال"}`}
                                                                hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                                                            />
                                                            <ButtonWithTooltip
                                                                onClick={() => handleActionRequest("delete", item.id)}
                                                                icon={<IoTrashOutline className="w-5 h-5" />}
                                                                text="حذف"
                                                                hoverColor="hover:text-red-600 dark:hover:text-red-400"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`relative w-20 ${
                                                        item.type === "fixed"
                                                            ? "bg-gradient-to-b from-[#c5fba5] to-[#77F52E] dark:bg-gradient-to-b dark:from-[#98f761] dark:to-gray-800"
                                                            : "bg-gradient-to-b from-cyan-200 to-cyan-400 dark:bg-gradient-to-b dark:from-cyan-300 dark:to-gray-800"
                                                    } flex flex-col justify-center items-center text-white font-semibold p-2 rounded-lg`}
                                                >
                                                  <span className="text-sm tracking-wide">
                                                    {{
                                                        fixed: "ثابت",
                                                        percent: "درصدی",
                                                    }[item.type] || "نامشخص"}
                                                  </span>

                                                    <div className="mt-1">
                                                        {item.type === "fixed" ? (
                                                            <FaMoneyBillWave className="text-green-800 dark:text-green-400" size={32} />
                                                        ) : (
                                                            <FaPercentage className="text-cyan-800 dark:text-cyan-300" size={32} />
                                                        )}
                                                    </div>

                                                    <div className="absolute left-7 -top-3 w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-0"></div>
                                                    <div className="absolute left-7 -bottom-3 w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-0"></div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                :<div className={`flex mt-20 flex-col gap-4 items-center justify-center`}>
                                    <BiSolidError size={35} className={`text-cyan-400 animate-pulse`}/>
                                    <span className={`font-semibold`}>موردی برای نمایش وجود ندارد.</span>
                                </div>
                    }
                </div>
            </div>
            {/*/!* New admin Component *!/*/}
            {/*{openAdd.open && (*/}
            {/*    <div className="fixed inset-0 z-50 flex items-center justify-center">*/}
            {/*        <AddAdmin*/}
            {/*            open_slider={openAdd.open}*/}
            {/*            open_close={() => setOpenAdd({ open: !openAdd.open })}*/}
            {/*            reload={() => dispatch(getAsyncListAdmin({ row, page }))}*/}
            {/*            id={isIdsEdit}*/}
            {/*            list_admin={list_admin.data}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
            {/* Confirm modal */}
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
        </>
    );
};

export default CouponList;