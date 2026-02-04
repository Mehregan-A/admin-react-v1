import {useLocation, useParams} from "react-router-dom";
import CategoryNotFound from "../../assets/image/category_not_found.png"
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PostLogo from "../../assets/image/PostLogo.png";
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
// import AddSlider from "./AddSlider.jsx";
import {MdPublishedWithChanges} from "react-icons/md";
import PagingGetUrl from "../../components/PagingGetUrl.jsx";
import {
    deleteAsyncShippingMethod,
    getAsyncListShippingMethod,
    getAsyncStatusShippingMethod
} from "../../feature/redux/ShippingMethodSlice.jsx";
import AddShippingMethod from "./AddShippingMethod.jsx";
import {TbTruckDelivery} from "react-icons/tb";
import {CiDeliveryTruck} from "react-icons/ci";
import {deleteAsyncAdmin, getAsyncStatusAdmin} from "../../feature/redux/AdminSlice.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import PerPageSelector from "../../components/RowSelector.jsx";


const ListShippingMethod = () => {
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
    const { list_shipping_method,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.shippingMethod);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListShippingMethod({ row, page}));
            navigate(`/shipping-methods/list/${row}/${page}`);
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
                await dispatch(deleteAsyncShippingMethod({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusShippingMethod({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusShippingMethod({ Id: id }));
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
            <div className='flex justify-between items-center p-2'>
                <HeaderBox text1={"داشبورد"} text2={false}  text3={"روش های ارسال"}/>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 min-h-120 bg-gray-50 dark:bg-gray-700/60 rounded-3xl dark:drop-shadow-xl drop-shadow-gray-500 p-5">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setOpenId("")}
                        className='dark:bg-gray-800 bg-gray-100 text-gray-700 cursor-pointer hover:text-cyan-400 transition-all rounded-2xl px-5 text-nowrap py-3 dark:text-gray-100 border border-cyan-400 duration-400 hover:shadow-[0px_0px_4px_4px_rgba(0,200,243,0.4)] hover:dark:shadow-[0px_0px_4px_4px_rgba(0,189,243,0.6)]'>افزودن روش</button>

                    <div className="flex justify-end">
                        <PerPageSelector />
                    </div>
                </div>
                {isLoading_list ? (
                    <Loading />
                ) : isError_list ? (
                    <Reject />
                ) : list_shipping_method?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-2 mt-4">
                        {list_shipping_method.data.map((item) => {
                            const isLocked = [1, 2, 3].includes(item.id);
                            return (
                                <div key={item.id} className="relative bg-white dark:bg-gray-800 drop-shadow-lg drop-shadow-cyan-200 rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                    <div className="absolute -right-7 -bottom-10 leaf-4 -rotate-40 dark:bg-cyan-300/10 bg-cyan-300/20"></div>
                                    <div className="absolute -right-7 -bottom-10 leaf-4 rotate-0 dark:bg-cyan-300/10 bg-cyan-300/20"></div>
                                    <div className="absolute -right-7 -bottom-10 leaf-4 rotate-40 dark:bg-cyan-300/10 bg-cyan-300/20"></div>
                                    <div className="flex items-center justify-between relative w-full p-7">
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                                                    {item.title}
                                                </h2>
                                            </div>
                                            <div className="flex justify-between items-center">
                                            <span className="  text-gray-800 dark:text-gray-100 line-clamp-1">
                                                {item.description}
                                            </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                            <span className="text-sm  text-gray-800 dark:text-gray-100 line-clamp-1">
                                                حداکثر وزن مجاز:{item.max_weight}
                                            </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                            <span className="text-sm  text-gray-800 dark:text-gray-100 line-clamp-1">
                                                حداقل وزن مجاز:{item.min_weight}
                                            </span>
                                            </div>
                                        </div>
                                        {item.id ===1 || item.id ===2 || item.id ===3?
                                            <img
                                                src={PostLogo}
                                                alt={item.title}
                                                className="w-20 h-20 object-cover"
                                            />
                                            :
                                            <CiDeliveryTruck size={100} className="dark:text-gray-200 text-gray-600" />
                                        }
                                        <span
                                            className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                                                item.status === "active"
                                                    ? "bg-green-100 dark:bg-gray-800 shadow shadow-cyan-300 dark:text-green-500 text-green-700"
                                                    : "bg-gray-100 dark:bg-gray-800 shadow shadow-cyan-300  text-red-500 dark:text-red-400"
                                            }`}
                                        >
                                {item.status === "active" ? "فعال" : "غیرفعال"}
                              </span>
                                    </div>
                                    <div className={`flex gap-1 justify-end p-6 pt-0`}>
                                        <ButtonWithTooltip
                                            onClick={!isLocked ? () => setOpenId(item.id, "edit") : undefined}
                                            disabled={isLocked}
                                            icon={<IoCreateOutline className={`w-5 h-5 ${isLocked ? "opacity-40" : ""}`} />}
                                            text="ویرایش"
                                            hoverColor={!isLocked ? "hover:text-green-600 dark:hover:text-emerald-400" : ""}
                                        />

                                        {/* دکمه فعال / غیرفعال */}
                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest(item.status, item.id)}
                                            icon={<IoBanOutline className="w-5 h-5" />}
                                            text={`${item.status === "active" ? "غیرفعال" : "فعال"}`}
                                            hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                                        />

                                        {/* دکمه حذف */}
                                        <ButtonWithTooltip
                                            onClick={!isLocked ? () => handleActionRequest("delete", item.id) : undefined}
                                            disabled={isLocked}
                                            icon={<IoTrashOutline className={`w-5 h-5 ${isLocked ? "opacity-40" : ""}`} />}
                                            text="حذف"
                                            hoverColor={!isLocked ? "hover:text-red-600 dark:hover:text-red-400" : ""}
                                        />
                                    </div>

                                </div>

                            )
                        })}
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
                    <AddShippingMethod
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListShippingMethod({ row, page }))}
                        Id={isIdsEdit.id}
                        list_shipping_method={list_shipping_method.data}
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
            {/*    <PagingGetUrl total_page={list_shipping_method?.page} searchParams={searchParams}/>*/}
            {/*</div>*/}
        </div>

    );
};

export default ListShippingMethod;