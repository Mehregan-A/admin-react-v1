import {useLocation, useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import {IoBanOutline, IoCreateOutline, IoKeyOutline, IoListOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {BiSolidError} from "react-icons/bi";
import PagingGetUrl from "../../components/PagingGetUrl.jsx";
import {
    attributeClearResultDelete,
    deleteAsyncAttribute,
    getAsyncListAttribute,
    getAsyncStatusAttribute
} from "../../feature/redux/AttributeSlice.jsx";
import {BsListUl} from "react-icons/bs";
import {getAsyncListAttributeVal} from "../../feature/redux/AttributeValueSlice.jsx";
import PerPageSelector from "../../components/RowSelector.jsx";
import {getAsyncListAmazingProduct} from "../../feature/redux/AmazingProductSlice.jsx";
import {persianDateNT} from "../../components/utility/persianDateNT.js";
import AddAdmin from "../admin/AddAdmin.jsx";
import {getAsyncListAdmin} from "../../feature/redux/AdminSlice.jsx";
import AddProductAmazing from "./AddProductAmazing.jsx";


const ListProductAmazing = () => {
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
    const { list_product_amazing,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.amazingProduct);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListAmazingProduct({ row, page}));
            navigate(`/product-amazing/list/${row}/${page}`);
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
                    <div className="text-cyan-700 dark:text-cyan-400">شگفت انگیز</div>
                </div>

                <button
                    onClick={() => setOpenId("")}
                    className="flex justify-center items-center gap-2 p-3 bg-gray-100 dark:hover:bg-gray-800/90 hover:bg-gray-200 dark:bg-gray-800 border dark:border-0 border-cyan-300 dark:inset-shadow-sm inset-shadow-gray-900 dark:inset-shadow-cyan-400 drop-shadow-lg dark:drop-shadow-gray-500 dark:hover:drop-shadow-cyan-400 transition-all cursor-pointer rounded-2xl w-32 dark:text-gray-200 text-sm"
                >
                    افزودن شگفت انگیز
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 min-h-120 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-700 inset-shadow-sm inset-shadow-cyan-400 p-5">
                <div className="flex justify-end">
                    <PerPageSelector />
                </div>
                {isLoading_list ? (
                    <Loading />
                ) : isError_list ? (
                    <Reject />
                ) : list_product_amazing?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 mt-4">
                        {list_product_amazing.data.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="relative overflow-hidden rounded-3xl shadow-md shadow-cyan-300
                                 border border-gray-200 dark:border-gray-700
                                 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                                        <div className="relative bg-cyan-200/50 dark:bg-gray-800 w-full h-full">
                                            <svg
                                                width="130"
                                                height="95"
                                                viewBox="0 0 66 44"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`${
                                                    item.flag === "in_progress"
                                                        ? "text-cyan-400"
                                                        : item.flag === "not_started"
                                                            ?"text-red-700"
                                                            :"text-orange-700"
                                                }`}
                                                style={{ position: "absolute", top: 0, left: 0}}
                                            >
                                                <path
                                                    d="M-27.4997 -7.50004C-35.2584 7.3926 -14.3286 52.7562 0.000276566 43.9999C9.00049 38.4999 6.98483 23.4141 15.5003 14.5C33.983 -4.84802 56.5003 11.4999 65.0003 -13.0001C75.4973 -43.2562 -12.7027 -35.9021 -27.4997 -7.50004Z"
                                                    fill="currentColor" fillOpacity="1"
                                                />
                                            </svg>
                                            <svg
                                                width="180"
                                                height="110"
                                                viewBox="0 0 83 40"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-cyan-400"
                                                style={{ position: "absolute", bottom: 0, right: 0 }}
                                            >
                                                <path
                                                    d="M84.7627 40.9096C92.5215 26.0169 100.937 -6.60423 84.7627 -2.09042C72.8886 1.22329 77.7782 16.4954 69.2627 25.4096C50.78 44.7576 16.2893 18.8231 2.76271 41.9096C-13.427 69.5414 69.9658 69.3116 84.7627 40.9096Z"
                                                    fill="currentColor" fillOpacity="1"
                                                />
                                            </svg>

                                        </div>
                                    </div>

                                    {/* Header */}
                                    <div className="flex items-start justify-between p-6 pb-4 relative">
                                        <div className="flex flex-col gap-2 w-full">
                                            <h2 className="text-lg mt-2 text-nowrap font-semibold text-gray-800 dark:text-gray-100">
                                                {item.title}
                                            </h2>
                                            <div className="flex flex-col w-40 gap-3 mt-1">
                                            <span
                                                className={`px-2 py-1 rounded-lg text-xs font-medium text-nowrap  bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300`}>
                                                تاریخ شروع:{persianDateNT.unix(item.start_at)}
                                            </span>
                                            <span
                                                    className={`px-2 py-1 rounded-lg text-xs text-nowrap font-medium bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300`}>
                                                  تاریخ پایان:{persianDateNT.unix(item.end_at)}
                                            </span>
                                            </div>
                                        </div>

                                        <span
                                            className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                                                item.flag === "in_progress"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400"
                                                    : item.flag === "not_started"
                                                    ?"bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-400" 
                                                    :"bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-400"
                                            }`}
                                        >
                                        {item.flag === "in_progress" ? "جاری" : item.flag === "not_started" ?"شروع نشده":"اتمام"}
                                    </span>
                                    </div>
                                    {/* Footer Buttons */}
                                    <div className="flex items-center gap-2 justify-end p-6 pt-0 mt-3">
                                        <ButtonWithTooltip
                                            onClick={() => setOpenId(item.id, "edit")}
                                            icon={<IoCreateOutline className={`w-5 h-5 `}/>}
                                            text="ویرایش"
                                            hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                                        />

                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest(item.status, item.id)}
                                            icon={<IoBanOutline className="w-5 h-5"/>}
                                            text={item.status === "active" ? "غیرفعال" : "فعال"}
                                            hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                                        />

                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest("delete", item.id)}
                                            icon={<IoTrashOutline className={`w-5 h-5 `}/>}
                                            text="حذف"
                                            hoverColor="hover:text-red-600 dark:hover:text-red-400"
                                        />
                                        <ButtonWithTooltip
                                            onClick={() => setOpenIdAtt(item.id, "att")}
                                            icon={<BsListUl className={`w-5.5 h-5.5 `}/>}
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
            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddProductAmazing
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListAdmin({ row, page }))}
                        id={isIdsEdit}
                        list_admin={list_product_amazing.data}
                    />
                </div>
            )}
            <div className='flex justify-end p-2 rounded-3xl mt-3'>
                <PagingGetUrl total_page={list_product_amazing?.page} />
            </div>
        </div>

    );
};

export default ListProductAmazing;