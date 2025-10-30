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
                <div className="bg-order rounded-2xl w-xl flex flex-col gap-5 px-5 py-6">
                    <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-base">
                        اقلام سفارش
                    </h3>

                    <div className="flex flex-col gap-4">
                        {info_order?.order_items?.map((item, index) => {
                            const finalPrice = item.price_each - item.discount_each;
                            const totalPrice = finalPrice * item.qty;

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4
          p-5 rounded-2xl border bg-white/20 border-white/30 shadow-lg dark:shadow-gray-700 dark:bg-black/30 dark:backdrop-blur-md dark:border-white/20 backdrop-blur-md
          hover:shadow-cyan-200/50 transition-all duration-300"
                                >
                                    {/* ---------- تصویر و اطلاعات محصول ---------- */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3 w-full ">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0 ">
                                                <img
                                                    src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex flex-col text-gray-700 dark:text-gray-100 justify-center">
                                                {item.title}
                                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                کد کالا: {item.sku_code}
                                              </span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 ">
                                                url: {item.url}
                                              </span>
                                    </div>


                                    {/* ---------- بخش قیمت ---------- */}
                                    <div className="flex flex-col gap-1 text-sm w-full sm:w-1/3 text-left sm:text-right">

                                        {/* قیمت و تخفیف با طراحی زیبا */}
                                        {item.price_each && (
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                                  {item.price_each.toLocaleString()} ریال
                                                </span>
                                                <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium px-2 py-0.5 rounded-full">
                                                  − {item.discount_each.toLocaleString()} ریال
                                                </span>
                                            </div>
                                        )}

                                        {/* قیمت بعد از تخفیف */}
                                        <div className="text-cyan-500 font-bold text-base mt-1 flex justify-end">
                                            {finalPrice.toLocaleString()} <span className="text-sm">ریال</span>
                                        </div>

                                        {/* تعداد × قیمت = جمع */}
                                        <div className="text-gray-700 dark:text-gray-200 font-semibold text-sm border-t border-gray-400/50 dark:border-gray-700/50 pt-2 mt-2">
                                            {item.qty.toLocaleString()} × {finalPrice.toLocaleString()} ریال{" "}
                                            <span className="text-gray-500">=</span>{" "}
                                            <span className="text-cyan-400 font-bold">
                {totalPrice.toLocaleString()} ریال
              </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </>

    );
};
export default OrderDetail;