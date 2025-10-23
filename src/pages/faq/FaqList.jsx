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
import {
    IoBanOutline,
    IoChevronDownCircleSharp,
    IoChevronUpCircleSharp,
    IoCreateOutline, IoKeyOutline,
    IoListOutline,
    IoTrashOutline
} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import {PiChartPieSlice} from "react-icons/pi";
import {
    deleteAsyncFaq,
    faqClearResultDelete,
    getAsyncListFaq,
    getAsyncStatusFaq
} from "../../feature/redux/FaqSlice.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {BiSolidError} from "react-icons/bi";
import AddFaq from "./AddFaq.jsx";


const FaqList = () => {
    const [openAdd ,setOpenAdd] = useState({open:false})
    const [openAtt ,setOpenAtt] = useState({open:false})
    const [isOpen, setIsOpen] = useState("");
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
    const { list_faq,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.faq);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListFaq({ row, page}));
            navigate(`/faq/list/${row}/${page}`);
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
                await dispatch(deleteAsyncFaq({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusFaq({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusFaq({ Id: id }));
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
                dispatch(faqClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(faqClearResultDelete())
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
        <div className={`flex flex-col gap-2`}>
            <div className='flex justify-between items-center p-2'>
                <div className='flex justify-start gap-2 p-5'>
                    <div className="text-gray-400 dark:text-gray-300">  داشبورد   |  </div>
                    <div className="text-cyan-700 dark:text-cyan-400">سوالات متداول</div>
                </div>
                <button
                    onClick={() => setOpenId("")}
                    className='flex justify-center items-center gap-2 p-3 bg-gray-100 dark:hover:bg-gray-800/90 hover:bg-gray-200 dark:bg-gray-800 border dark:border-0 border-cyan-300 dark:inset-shadow-sm inset-shadow-gray-900 dark:inset-shadow-cyan-400  drop-shadow-lg dark:drop-shadow-gray-500 dark:hover:drop-shadow-cyan-400 transition-all cursor-pointer rounded-2xl w-32 dark:text-gray-200 text-sm'>افزودن سوال</button>

            </div>
            <div className={`flex flex-col gap-3 min-h-120 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-700 inset-shadow-sm inset-shadow-cyan-400  p-5  `}>
                <div className="flex flex-row justify-end items-center gap-1 px-4">
                </div>
                {isLoading_list
                    ?<Loading />
                    :isError_list
                        ?<Reject />
                        :list_faq?.data?.length > 0
                            ?<div className="flex flex-col gap-7 pb-2 mt-4 ">
                                {list_faq?.data &&
                                    list_faq?.data?.map((item, index) => (
                                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md dark:shadow-cyan-200  transition-all duration-300 overflow-hidden">
                                            <div
                                                className="flex justify-between pt-2 px-8 items-center cursor-pointer"
                                                onClick={() => setIsOpen(index)}
                                            >
                                                <div className="flex items-center justify-center gap-3">
                                                    <p className="text-gray-800 dark:text-cyan-200 text-lg font-medium">
                                                        {item.title}
                                                    </p>
                                                    <span
                                                        className={`text-xs font-semibold px-2 py-1 rounded-xl ${
                                                            item.status === "active"
                                                                ? "bg-green-100 dark:bg-gray-700 text-green-700 dark:text-emerald-400"
                                                                : "bg-red-100 dark:bg-gray-700  dark:text-red-400 text-red-700"
                                                        }`}
                                                    >
                                                          {item.status === "active" ? "فعال" : "غیرفعال"}
                                                        </span>
                                                </div>

                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <div className="flex lg:justify-center gap-0.5">
                                                        <ButtonWithTooltip
                                                            onClick={() => setOpenId(item.id, "edit")}
                                                            icon={<IoCreateOutline className="w-5 h-5" />}
                                                            text="ویرایش "
                                                            hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                                                        />
                                                        <ButtonWithTooltip
                                                            onClick={() => handleActionRequest(item.status, item.id)}
                                                            icon={<IoBanOutline className="w-5 h-5" />}
                                                            text={`${row.status === "active"?"غیرفعال":"فعال"}`}
                                                            hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                                                        />
                                                        <ButtonWithTooltip
                                                            onClick={() => handleActionRequest("delete", item.id)}
                                                            icon={<IoTrashOutline className="w-5 h-5" />}
                                                            text="حذف"
                                                            hoverColor="hover:text-red-600 dark:hover:text-red-400"
                                                        />
                                                    </div>
                                                    <div className="text-cyan-400 transition-transform duration-300">
                                                        {isOpen===index ? (
                                                            <IoChevronUpCircleSharp size={35} />
                                                        ) : (
                                                            <IoChevronDownCircleSharp size={35} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`px-8 pb-2 text-gray-700 dark:text-cyan-100 text-base leading-relaxed transition-all duration-800 ${
                                                    isOpen===index
                                                        ? "max-h-96 opacity-100"
                                                        : "max-h-0 opacity-0"
                                                } overflow-hidden`}
                                            >
                                                <p className="mt-5">
                                                    {item.body}
                                                </p>
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


            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddFaq
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListFaq({ row, page }))}
                        Id={isIdsEdit.id}
                        list_faq={list_faq.data}
                    />
                </div>
            )}
            {/*{openAtt.open && (*/}
            {/*    <div className="fixed inset-0 z-50 flex items-center justify-center">*/}
            {/*        <AttributeCategory*/}
            {/*            open_slider={openAtt.open}*/}
            {/*            open_close={() => setOpenAtt({ open: !openAtt.open })}*/}
            {/*            reload={() => dispatch(getAsyncListCategory({ row, page }))}*/}
            {/*            Id={isIdsEdit.id}*/}
            {/*            list_category={list_category.data}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
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
        </div>
    );
};

export default FaqList;