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
import {IoBanOutline, IoCreateOutline, IoListOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import {PiChartPieSlice} from "react-icons/pi";
import {articleClearResultDelete, deleteAsyncArticle, getAsyncListArticle} from "../../feature/redux/ArticleSlice.jsx";
import DataTableArticle from "../../components/dataTable/DataTableProduct.jsx";
import {persianDateNT} from "../../components/utility/persianDateNT.js";
import {getAsyncListCouponRedemption} from "../../feature/redux/CouponRedemptionSlice.jsx";


const ListCouponRedemptions = () => {
    const [openAdd ,setOpenAdd] = useState({open:false})
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const openModal = location.state?.openModal;
    // AcceptMessage.jsx module
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ actionType: "", id: "", text: "" });
// Redux
    const dispatch = useDispatch();
    const { page,row } = useParams();
// List article selector
    const { list_coupon_redemption,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.couponRedemption);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListCouponRedemption({ row, page,id}));
        }
    }, [row,page, dispatch, navigate]);
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
                await dispatch(deleteAsyncArticle({ del: id }));
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
                dispatch(articleClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(articleClearResultDelete())
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
            name: "کد",
            selector: row => row.code,
        },
        {
            name: "مقدار تخفیف",
            selector: row => row.value,
        },
        {
            name: "شماره سفارش",
            selector: row => row.order_no,
        },
        {
            name: "مبلغ سفارش قبل از تخفیف و مالیات",
            selector: row => row.subtotal,
        },
        {
            name: "مجموع تخفیف‌ها",
            selector: row => row.discount_total,
        },
        {
            name: "مالیات",
            selector: row => row.tax_total,
        },
        {
            name: "مبلغ نهایی پرداختی",
            selector: row => row.grand_total,
        },
        {
            name: "نام و نام خانوادگی",
            selector: row => row.full_name,
        },
        {
            name: "موبایل",
            selector: row => row.mobile,
        },
        {
            name: "کد ملی",
            selector: row => row.mobile,
        },
        {
            name: "وضعیت",
            selector: row => {
                if (row.status === "basket") {
                    return <div className={`text-white green-500 bg-cyan-400 rounded-lg p-1 w-14 text-xs`}>سبد خرید</div>
                } else if (row.status === "shipped") {
                    return <div className={`text-white green-500 bg-green-400 rounded-lg p-1 w-16 text-xs`}>ارسال شده</div>
                } else if (row.status === "cancelled") {
                    return <div className={`text-white green-500 bg-red-400 rounded-lg p-1 w-16 text-xs`}>کنسل شده</div>
                }
                else if (row.status === "paid") {
                    return <div className={`text-white green-500 bg-yellow-400 rounded-lg p-1 w-17 text-xs`}>پرداخت شده</div>
                }
                else if (row.status === "pending") {
                    return <div className={`text-white green-500 bg-purple-400 rounded-lg p-1 w-9 text-xs`}>انتظار</div>
                }else {
                    return <div className="text-red-500">ناموفق</div>;
                }
            }
        },
    ];
    useEffect(() => {
        if (openModal) {
            setOpenAdd({ open: !openAdd.open })
        }
    }, [openModal]);

    return (
        <div className={`flex flex-col gap-2`}>
            <div className='flex justify-between items-center p-2'>
                <div className='flex justify-start gap-2 p-5'>
                    <div className="text-gray-400 dark:text-gray-300">  تعاریف   |  </div>
                    <div className="text-gray-400 dark:text-gray-300">  کوپن   |  </div>
                    <div className="text-cyan-700 dark:text-cyan-400">تعداد استفاده از کوپن</div>
                </div>
            </div>
            <DataTable
                icon={''}
                isLoading={isLoading_list}
                isError={isError_list}
                title=""
                data={list_coupon_redemption?.data}
                numberPage={list_coupon_redemption?.page}
                columns={columns}
            />
        </div>
    );
};

export default ListCouponRedemptions;