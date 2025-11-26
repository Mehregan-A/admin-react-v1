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
// import AddShippingMethod from "./AddShippingMethod.jsx";
import {TbTruckDelivery} from "react-icons/tb";
import {CiDeliveryTruck} from "react-icons/ci";
import {deleteAsyncAdmin, getAsyncStatusAdmin} from "../../feature/redux/AdminSlice.jsx";
import {
    attributeClearResultDelete,
    deleteAsyncAttribute,
    getAsyncListAttribute,
    getAsyncStatusAttribute
} from "../../feature/redux/AttributeSlice.jsx";
import {FaListUl} from "react-icons/fa";
import {BsListUl} from "react-icons/bs";
import AttributeCategory from "../category/AttributeCategory.jsx";
import AttributeValue from "./AttributeValue.jsx";
import {getAsyncListAttributeVal} from "../../feature/redux/AttributeValueSlice.jsx";
import AddAttribute from "./AddAttribute.jsx";


const AttributeList = () => {
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
    const { list_attribute,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.attribute);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListAttribute({ row, page}));
            navigate(`/attribute/list/${row}/${page}`);
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
                await dispatch(deleteAsyncAttribute({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusAttribute({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusAttribute({ Id: id }));
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
                dispatch(attributeClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(attributeClearResultDelete())
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
                    <div className="text-cyan-700 dark:text-cyan-400">ویژگی ها</div>
                </div>

                <button
                    onClick={() => setOpenId("")}
                    className="flex justify-center items-center gap-2 p-3 bg-gray-100 dark:hover:bg-gray-800/90 hover:bg-gray-200 dark:bg-gray-800 border dark:border-0 border-cyan-300 dark:inset-shadow-sm inset-shadow-gray-900 dark:inset-shadow-cyan-400 drop-shadow-lg dark:drop-shadow-gray-500 dark:hover:drop-shadow-cyan-400 transition-all cursor-pointer rounded-2xl w-32 dark:text-gray-200 text-sm"
                >
                    افزودن ویژگی
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 min-h-120 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-700 inset-shadow-sm inset-shadow-cyan-400 p-5">
                {isLoading_list ? (
                    <Loading />
                ) : isError_list ? (
                    <Reject />
                ) : list_attribute?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 mt-4">
                        {list_attribute.data.map((item) => {

                            return (
                                <div
                                    key={item.id}
                                    className="relative shadow-md shadow-cyan-300  attribute dark:bg-gray-800 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between  p-6 pb-4 relative">
                                        <div className="flex flex-col gap-2 w-full">
                                            <h2 className="text-lg mt-2 text-nowrap font-semibold text-gray-900 dark:text-gray-100">
                                                {item.title}
                                            </h2>

                                            <span className="text-sm text-gray-500 dark:text-gray-300">
                            نوع ویژگی: <span className="font-semibold">{item.data_type==="bool"?"دو گزینه ای":item.data_type==="text"?"نوشتاری":"عددی"}</span>
                        </span>

                                            <div className="flex gap-3 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium text-nowrap ${item.is_filter ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
                                فیلتر بر جست و جو: {item.is_filter ? "فعال" : "غیرفعال"}
                            </span>

                                                <span className={`px-2 py-1 rounded-lg text-xs text-nowrap font-medium ${item.is_spec ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
                                 نمایش در مشخصات: {item.is_spec ? "نمایش" : "عدم نمایش"}
                            </span>
                                            </div>
                                        </div>

                                        <span
                                            className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                                                item.status === "active"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400"
                                                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                                            }`}
                                        >
                        {item.status === "active" ? "فعال" : "غیرفعال"}
                    </span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                                    {/* Footer Buttons */}
                                    <div className="flex items-center gap-2 justify-end p-6 pt-0 mt-3">
                                        <ButtonWithTooltip
                                            onClick={ () => setOpenId(item.id, "edit")}
                                            icon={<IoCreateOutline className={`w-5 h-5 `} />}
                                            text="ویرایش"
                                            hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                                        />

                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest(item.status, item.id)}
                                            icon={<IoBanOutline className="w-5 h-5" />}
                                            text={item.status === "active" ? "غیرفعال" : "فعال"}
                                            hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                                        />

                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest("delete", item.id)}
                                            icon={<IoTrashOutline className={`w-5 h-5 `} />}
                                            text="حذف"
                                            hoverColor="hover:text-red-600 dark:hover:text-red-400"
                                        />
                                        <ButtonWithTooltip
                                            onClick={() => setOpenIdAtt(item.id, "att")}
                                            icon={<BsListUl className={`w-5.5 h-5.5 `} />}
                                            text="مقادیر ویژگی"
                                            hoverColor="hover:text-cyan-400 dark:hover:text-cyan-300"
                                        />
                                    </div>
                                </div>
                            );
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
                    <AddAttribute
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListAttributeVal({ row, page }))}
                        Id={isIdsEdit.id}
                        list_attribute={list_attribute.data}
                    />
                </div>
            )}
            {openAtt.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AttributeValue
                        open_slider={openAtt.open}
                        open_close={() => setOpenAtt({ open: !openAtt.open })}
                        reload={() => dispatch(getAsyncListAttributeVal({ row, page }))}
                        Id={isIdsEdit.id}
                        list_attribute={list_attribute.data}
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

export default AttributeList;