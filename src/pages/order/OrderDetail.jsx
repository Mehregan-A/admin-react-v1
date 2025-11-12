import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {Toast} from "../../components/toast/Toast.jsx";
import {
    categoryClearResult,
    getAsyncSelectCategory,
    postAsyncAddCategory,
    postAsyncEditCategory
} from "../../feature/redux/CategorySlice.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {optionsActive, status} from "../../assets/data/Data.js";
import {getAsyncInfoProduct} from "../../feature/redux/ProductSlice.jsx";
import {useParams} from "react-router-dom";
import {Config} from "../../config/Config.jsx";
import CategoryNotFound from "../../assets/image/category_not_found.png";
import TextArea from "../../components/inputs/TextArea.jsx";
import { NilfamEditor } from 'nilfam-editor';
import 'nilfam-editor/nilfam-editor.css';
import InputCalendar from "../../components/inputs/InputCalender.jsx";
import {
    articleClearResult,
    getAsyncGetInfoArticle,
    postAsyncAddArticle,
    putAsyncEditArticle
} from "../../feature/redux/ArticleSlice.jsx";
import InputSelectStatus from "../../components/inputs/InputSelectStatus.jsx";
import {getAsyncInfoOrder} from "../../feature/redux/OrderSlice.jsx";
import {FiCheckCircle, FiCreditCard, FiMapPin, FiTruck, FiXCircle} from "react-icons/fi";
import OrderTimeline from "../../components/OrderTimeline.jsx";


const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {list_category_select} = useSelector(state => state.category);
    useEffect(() => {
        if (id){
            dispatch(getAsyncInfoOrder({Id:id}))
        }
    },[])
    const {result,isLoading,info_order} = useSelector(state => state.order);
    console.log(info_order)

    return (
        <>
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-start gap-2 p-5'>
                        <div className="text-gray-400 dark:text-gray-300">  سفارشات   |  </div>
                        <div className="text-cyan-700 dark:text-cyan-400">جزئیات</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full bg-gray-100 dark:bg-gray-800 border border-cyan-300 shadow-lg rounded-2xl flex flex-col gap-6 p-6 sm:p-8">
                        <h3 className="text-gray-800 dark:text-gray-100 font-bold text-lg text-center sm:text-right">
                            خلاصه سفارش
                        </h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-2">
                                {(() => {
                                    const status = info_order?.status;
                                    const statusMap = {
                                        basket: ["سبد خرید", "text-cyan-600", "bg-cyan-100", <FiTruck />],
                                        shipped: ["ارسال شده", "text-green-600", "bg-green-100", <FiTruck />],
                                        cancelled: ["کنسل شده", "text-red-600", "bg-red-100", <FiXCircle />],
                                        paid: ["پرداخت شده", "text-yellow-600", "bg-yellow-100", <FiCreditCard />],
                                        pending: ["در انتظار", "text-purple-600", "bg-purple-100", <FiCreditCard />],
                                    };
                                    const [text, textColor, bgColor, icon] = statusMap[status] || ["ناموفق", "text-red-600", "", <FiXCircle />];
                                    return (
                                        <div className={`flex items-center gap-1 ${bgColor} ${textColor} rounded-lg px-2 py-1 text-xs font-medium w-fit`}>
                                            {icon} {text}
                                        </div>
                                    );
                                })()}
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>جمع مبلغ:</span>
                                    <span>{info_order?.subtotal?.toLocaleString()} ریال</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>کوپن:</span>
                                    <span className="text-red-500">− {info_order?.coupons_price?.toLocaleString()} ریال</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>تخفیف کل:</span>
                                    <span className="text-red-500">− {info_order?.discount_total?.toLocaleString()} ریال</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>هزینه ارسال:</span>
                                    <span>{info_order?.shipping_fee === 0 ? "رایگان" : `${info_order?.shipping_fee?.toLocaleString()} ریال`}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>روش ارسال:</span>
                                    <span>{info_order?.shipping_methods?.title}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>مالیات:</span>
                                    <span>{info_order?.tax_total?.toLocaleString()} ریال</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

                            <div className="flex justify-between items-center text-gray-900 dark:text-gray-100 font-bold text-lg">
                                <span>مبلغ نهایی:</span>
                                <span className="text-cyan-600">{info_order?.grand_total?.toLocaleString()} ریال</span>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <FiCreditCard /> روش پرداخت:
                                    <span className="font-medium">{info_order?.payment_paid?.gateway_name === "zarinpal" ? "درگاه زرین‌پال" : info_order?.payment_paid?.gateway_name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    {info_order?.payment_paid?.status === "successful" ? <FiCheckCircle className="text-green-500"/> : <FiXCircle className="text-red-500"/>}
                                    وضعیت پرداخت:
                                    <span className={`font-medium ${info_order?.payment_paid?.status === "successful" ? "text-green-500" : "text-red-500"}`}>
          {info_order?.payment_paid?.status === "successful" ? "موفق" : "ناموفق"}
        </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <FiTruck /> کد رهگیری مرسوله:
                                    <span className="font-medium">{info_order?.shipping_code}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

                            {/*<div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">*/}
                            {/*    <div className="flex items-center gap-2">*/}
                            {/*        <FiMapPin /> {info_order?.address_full_name}*/}
                            {/*    </div>*/}
                            {/*    <div>{info_order?.address_mobile} | {info_order?.address_phone}</div>*/}
                            {/*    <div>{info_order?.address_province_title} - {info_order?.address_city_title}</div>*/}
                            {/*    <div>{info_order?.address_line}</div>*/}
                            {/*    <div>کد پستی: {info_order?.address_postal_code}</div>*/}
                            {/*</div>*/}
                            <OrderTimeline status={info_order?.status} />
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 border border-cyan-300 rounded-2xl w-full max-w-xl flex flex-col gap-5 px-4 sm:px-5 py-5 sm:py-6">
                        <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-base sm:text-lg text-center sm:text-right">
                            اقلام سفارش
                        </h3>
                        <div className=" flex flex-col gap-4">
                            {info_order?.order_items?.map((item, index) => {
                                const finalPrice = item.price_each - item.discount_each;
                                const totalPrice = finalPrice * item.qty;

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-between gap-4
                                      p-4 sm:p-5 rounded-2xl border bg-gray-100 border-white/30
                                      dark:bg-gray-800 dark:backdrop-blur-md dark:border-white/20 backdrop-blur-md
                                      drop-shadow-lg dark:drop-shadow-cyan-200 drop-shadow-cyan-300 transition-all duration-300"
                                    >

                                            <div
                                                className="absolute inset-0 rounded-lg"
                                                style={{
                                                    backgroundImage: `
                                                      repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
                                                    repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
                                                    `,
                                                    backgroundSize: "40px 40px",
                                                    WebkitMaskImage:
                                                        "radial-gradient(ellipse 80% 80% at 0% 0%, #000 25%, transparent 50%)",
                                                    maskImage:
                                                        "radial-gradient(ellipse 80% 80% at 0% 0%, #000 30%, transparent 67%)"
                                                }}
                                            />
                                        <div className="flex flex-col sm:flex-row  items-center sm:items-start gap-3 w-full">
                                            <div className="w-20 h-20  rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                                <img
                                                    src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex flex-col text-gray-700 dark:text-gray-100 text-center sm:text-right">
                                                <span className="font-medium">{item.title}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                کد کالا: {item.sku_code}
                                              </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-words">
                                                    url: {item.url}
                                                  </span>
                                            </div>
                                        </div>

                                        <div className="relative w-full flex flex-col gap-2 ">
                                            <div className="w-full text-gray-700 dark:text-gray-200 font-semibold text-sm border-t border-cyan-200/80 dark:border-cyan-200/80 pt-2 mt-2 flex justify-center ">
                                            </div>
                                            <div className="flex left-0 top-5 gap-2 absolute">
                                                <div className="flex items-center  gap-1">
                                                    <span className="text-sm text-gray-800 dark:text-gray-100">تعداد:</span>
                                                    <span className="text-sm text-gray-800 dark:text-gray-100">
                                                          {item.qty}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-start gap-2 ">
                                                {item.price_each && (
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center  gap-1">
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">قیمت اولیه:</span>
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">
                                                          {item.price_each.toLocaleString()} ریال
                                                        </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">تخفیف:</span>
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">
                                                          {item.discount_each.toLocaleString()} ریال
                                                        </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">قیمت نهایی هر محصول:</span>
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">
                                                          {finalPrice.toLocaleString()} ریال
                                                        </span>
                                                        </div>
                                                        <div className="flex items-center  gap-1">
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">قیمت کل:</span>
                                                            <span className="text-sm text-gray-800 dark:text-gray-100">
                                                          {totalPrice.toLocaleString()} ریال
                                                        </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default OrderDetail;