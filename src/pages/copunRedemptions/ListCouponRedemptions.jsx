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
import {HiOutlineTicket} from "react-icons/hi";
import {getAsyncInfoCoupon} from "../../feature/redux/CouponSlice.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";


const ListCouponRedemptions = () => {
    const [openAdd ,setOpenAdd] = useState({open:false})
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const openModal = location.state?.openModal;
    // AcceptMessage.jsx module
// Redux
    const dispatch = useDispatch();
    const { page,row } = useParams();
// List article selector
    const {info_coupon} = useSelector(state => state.coupon);
    const {list_coupon_redemption,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.couponRedemption);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListCouponRedemption({ row, page,id}));
        }
        dispatch(getAsyncInfoCoupon({Id:id}));
    }, [row,page, dispatch, navigate]);
    console.log(info_coupon)
    // Handle delete or deactivate action
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
            name: "مقدار تخفیف",
            selector: row => row.value,
        },
        {
            name: "نوع کوپن",
            selector: row => row.type==="fixed"?"ثابت":"درصدی",
        },
        {
            name: "شماره سفارش",
            selector: row => row.order_no,
        },
        {
            name: "مجموع تخفیف‌ها",
            selector: row => row.discount_total,
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
            name: "نام کاربری",
            selector: row => row.username,
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
                <HeaderBox text1={"تعاریف"} text2={"کوپن"}  text3={"تعداد استفاده از کوپن"}/>
            </div>
            <div className="flex md:flex-row flex-col w-full gap-4">
                <div className="xl:w-xl  max-h-screen bg-gray-50 dark:bg-gray-700/50 rounded-3xl shadow-lg dark:shadow-gray-600 shadow-gray-300">
                    <div className="items-center flex flex-col justify-center bg-gray-50  dark:bg-gray-700 dark:shadow-cyan-200  w-28 p-3 rounded-3xl shadow-md shadow-gray-300">
                        <span className="text-gray-700 text-sm text-nowrap dark:text-gray-100 font-semibold">مشخصات کوپن</span>
                        <div className="text-cyan-400">
                            <HiOutlineTicket size={30}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-8 p-5">
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>کد:</span>
                            <span>{info_coupon?.code}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>نوع کوپن:</span>
                            <span>{info_coupon?.type==="fixed"?"ثابت":"درصدی"}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>مقدار تخفیف:</span>
                            <span>{info_coupon?.value}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>حداکثر استفاده:</span>
                            <span>{info_coupon?.max_uses}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>محدودیت کاربر:</span>
                            <span>{info_coupon?.user_limit=="0"?"بدون محدودیت":info_coupon?.user_limit}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>محدود به سفارش اول:</span>
                            <span>{info_coupon?.first_order_only=="0"?"بدون محدودیت":info_coupon?.first_order_only}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>حداقل سفارش:</span>
                            <span>{info_coupon?.min_order=="0"?"بدون محدودیت":info_coupon?.min_order}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>شروع:</span>
                            <span>{persianDateNT.unixWithoutTime(info_coupon?.start_at)}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>پایان:</span>
                            <span>{persianDateNT.unixWithoutTime(info_coupon?.expires_at)}</span>
                        </div>
                        <div className="flex gap-1 items-center dark:text-gray-100 text-gray-700">
                            <span>وضعیت:</span>
                            <span>{info_coupon?.status==="active"?"فعال":"غیرفعال"}</span>
                        </div>
                    </div>
                </div>
                <div className="shadow-lg w-full dark:shadow-gray-600 shadow-gray-300 rounded-3xl">
                    <DataTable
                        icon={'لیست استفاده از کوپن'}
                        isLoading={isLoading_list}
                        isError={isError_list}
                        title=""
                        data={list_coupon_redemption?.data}
                        numberPage={list_coupon_redemption?.page}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListCouponRedemptions;