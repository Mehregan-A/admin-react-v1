import {useLocation, useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import {IoBanOutline, IoCreateOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {BiSolidError} from "react-icons/bi";
import {persianDateNT} from "../../components/utility/persianDateNT.js";
import PagingGetUrl from "../../components/PagingGetUrl.jsx";
import {
    attributeClearResultDelete,
    deleteAsyncAttribute,
    getAsyncStatusAttribute
} from "../../feature/redux/AttributeSlice.jsx";
import {BsListUl} from "react-icons/bs";
import PerPageSelector from "../../components/RowSelector.jsx";
import {
    deleteAsyncVariantAttribute,
    getAsyncListVariantAttribute,
    getAsyncStatusVariantAttribute, variantAttributeClearResultDelete
} from "../../feature/redux/VariantAttributeSlice.jsx";
import VariantAttributeValue from "./VariantAttributeValue.jsx";
import AddVariantAttribute from "./AddVariantAttribute.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";


const VariantAttributeList = () => {
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
    const { variant_attribute_list,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.variantAttribute);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListVariantAttribute({ row, page}));
            navigate(`/variant-attribute/list/${row}/${page}`);
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
                await dispatch(deleteAsyncVariantAttribute({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusVariantAttribute({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusVariantAttribute({ Id: id }));
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
                dispatch(variantAttributeClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(variantAttributeClearResultDelete())
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
                <HeaderBox text1={"داشبورد"} text2={false}  text3={"ویژگی های موثر بر قیمت"}/>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 min-h-120 bg-gray-50 dark:bg-gray-700/60 rounded-3xl dark:drop-shadow-xl drop-shadow-gray-500 p-5">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setOpenId("")}
                        className='dark:bg-gray-800 bg-gray-100 text-gray-700 cursor-pointer hover:text-cyan-400 transition-all rounded-2xl px-5 text-nowrap py-3 dark:text-gray-100 border border-cyan-400 duration-400 hover:shadow-[0px_0px_4px_4px_rgba(0,200,243,0.4)] hover:dark:shadow-[0px_0px_4px_4px_rgba(0,189,243,0.6)]'>افزودن ویژگی</button>

                    <div className="flex justify-end">
                        <PerPageSelector />
                    </div>
                </div>
                {isLoading_list ? (
                    <Loading />
                ) : isError_list ? (
                    <Reject />
                ) : variant_attribute_list?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-2 mt-4">
                        {variant_attribute_list.data.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="relative shadow-md shadow-cyan-300  variant-attribute dark:bg-gray-800 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between  p-6 pb-4 relative">
                                        <div className="flex flex-col gap-2 w-full">
                                            <h2 className="text-lg mt-2 text-nowrap font-semibold text-gray-900 dark:text-gray-100">
                                                نام ویژگی:{item.title}
                                            </h2>

                                            <span className="text-sm text-gray-500 dark:text-gray-300">
                            تاریخ انتشار: <span className="font-semibold">{persianDateNT.date(item.create_at)}</span>
                        </span>

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
                        <span className="font-semibold dark:text-green-100">موردی برای نمایش وجود ندارد.</span>
                    </div>
                )}
            </div>
            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddVariantAttribute
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListVariantAttribute({ row, page }))}
                        Id={isIdsEdit.id}
                        variantAttribute_list={variant_attribute_list.data}
                    />
                </div>
            )}
            {openAtt.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <VariantAttributeValue
                        open_slider={openAtt.open}
                        open_close={() => setOpenAtt({ open: !openAtt.open })}
                        reload={() => dispatch(getAsyncListVariantAttribute({ row, page }))}
                        Id={isIdsEdit.id}
                        variantAttribute_list={variant_attribute_list.data}
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
            <div className='flex justify-end p-2 rounded-3xl mt-3'>
                <PagingGetUrl total_page={variant_attribute_list?.page} />
            </div>
        </div>

    );
};

export default VariantAttributeList;