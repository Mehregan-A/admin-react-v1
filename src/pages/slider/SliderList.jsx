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
import {getAsyncListSlider} from "../../feature/redux/SliderSlice.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {BiSolidError} from "react-icons/bi";


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
                await dispatch(deleteAsyncCategory({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusCategory({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusCategory({ Id: id }));
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
                dispatch(categoryClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(categoryClearResultDelete())
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
    const columns = [
        {
            name: "تصویر",
            selector: row =>
                <div className="w-14 h-14 rounded-full border-2 border-cyan-400">
                    <img
                        src={row.image ? Config.apiImage + row.image : CategoryNotFound}
                        className="w-full h-full rounded-full object-cover"
                        alt="category"
                    />
                </div>,
        },
        {
            name: "نام دسته",
            selector: row => row.title,
        },
        {
            name: "url",
            selector: row => row.url,
        },
        {
            name: "ویژگی",
            selector: row => row.attribute?.map(a => a.label).join("، ") || "-",
        },
        {
            name: " وضعیت",
            selector: row => row.status === "active" ? <div className={`text-green-500`}>فعال</div> :  <div className={`text-red-500`}>غیرفعال</div>
        },
        {
            name: "عملیات",
            style: {
                width: '100px'
            },
            selector: row => (
                <div className="flex lg:justify-center gap-0.5">
                    <ButtonWithTooltip
                        onClick={() => setOpenId(row.id, "edit")}
                        icon={<IoCreateOutline className="w-5 h-5" />}
                        text="ویرایش دسته"
                        hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                    />
                    <ButtonWithTooltip
                        onClick={() => handleActionRequest(row.status, row.id)}
                        icon={<IoBanOutline className="w-5 h-5" />}
                        text={`${row.status === "active"?"غیرفعال":"فعال"}`}
                        hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                    />
                    <ButtonWithTooltip
                        onClick={() => handleActionRequest("delete", row.id)}
                        icon={<IoTrashOutline className="w-5 h-5" />}
                        text="حذف"
                        hoverColor="hover:text-red-600 dark:hover:text-red-400"
                    />
                    <ButtonWithTooltip
                        onClick={() => setOpenIdAtt(row.id, "att")}
                        icon={<PiChartPieSlice className="w-5.5 h-5.5" />}
                        text="ویژگی"
                        hoverColor="hover:text-cyan-400 dark:hover:text-cyan-300"
                    />
                </div>
            )
        }
    ];
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
                    <div className="text-gray-400 dark:text-gray-300">تعاریف |</div>
                    <div className="text-cyan-700 dark:text-cyan-400">دسته بندی</div>
                </div>

                <button
                    onClick={() => setOpenId("")}
                    className="flex justify-center items-center gap-2 p-3 bg-gray-100 dark:hover:bg-gray-800/90 hover:bg-gray-200 dark:bg-gray-800 border dark:border-0 border-cyan-300 dark:inset-shadow-sm inset-shadow-gray-900 dark:inset-shadow-cyan-400 drop-shadow-lg dark:drop-shadow-gray-500 dark:hover:drop-shadow-cyan-400 transition-all cursor-pointer rounded-2xl w-32 dark:text-gray-200 text-sm"
                >
                    افزودن دسته بندی
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
                                {/* تصویر */}
                                <div className="relative w-full xl:w-96 xl:h-36 bg-gray-100">
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
                                                ? "bg-green-100  text-green-700"
                                                : "bg-gray-200 text-gray-600"
                                        }`}
                                    >
                {banner.status === "published" ? "منتشر شده" : "پیش‌نویس"}
              </span>
                                </div>

                                {/* متن و جزئیات */}
                                <div className="bg-gradient-to-br from-[#fdffd7] to-[#D1FDFF] dark:from-cyan-500/40  dark:to-gray-800">
                                    <div className="p-4 flex  flex-col gap-2">
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                                            {banner.title}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                                            {banner.body}
                                        </p>

                                    </div>
                                    <div className="flex gap-1 justify-end px-4 py-2">
                                        <ButtonWithTooltip
                                            onClick={() => setOpenId(banner.id, "edit")}
                                            icon={<IoCreateOutline className="w-5 h-5" />}
                                            text="ویرایش "
                                            hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                                        />
                                        <ButtonWithTooltip
                                            onClick={() => handleActionRequest(banner.status, banner.id)}
                                            icon={<IoBanOutline className="w-5 h-5" />}
                                            text={`${banner.status === "active"?"غیرفعال":"فعال"}`}
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

            {/* مودال تایید عملیات */}
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

export default SliderList;