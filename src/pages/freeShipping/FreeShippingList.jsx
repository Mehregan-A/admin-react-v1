import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import Input from "../../components/inputs/Input.jsx";
import 'nilfam-editor/nilfam-editor.css';
import {couponClearResult,} from "../../feature/redux/CouponSlice.jsx";
import {
    getAsyncListShippingMethodFree,
    postAsyncEditShippingMethodFree, shippingClearResult
} from "../../feature/redux/ShippingMethodSlice.jsx";
import freeShippingFreeIcon from "../../assets/image/free-shipping-icon.png";
import PostLogo from "../../assets/image/PostLogo.png";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {CiDeliveryTruck} from "react-icons/ci";
import {IoBanOutline, IoCreateOutline, IoTrashOutline} from "react-icons/io5";
import {BiSolidError} from "react-icons/bi";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";


const FreeShippingList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAsyncListShippingMethodFree())
    },[])

    const {result,isLoading_list_free,list_shipping_method_free,isError_list_free,isLoading} = useSelector(state => state.shippingMethod);
    // redux
    const initialValues = {
        enable_free_shipping: "",
        min_order_for_free_shipping: "",
        min_count_for_free_shipping: "",
        min_weight_for_free_shipping: "",
        max_weight_for_free_shipping: ""
    }
    const validationSchema = yup.object({
        min_order_for_free_shipping: yup
            .number()
            .required('حداقل سفارش نمی تواند خالی باشد')
            .min(3, 'حداقل ۳ کاراکتر'),
        min_count_for_free_shipping: yup
            .number()
            .required('حداقل تعداد نمی تواند خالی باشد')
            .min(3, 'حداقل ۳ کاراکتر'),
        min_weight_for_free_shipping: yup
            .number()
            .required('حداقل وزن نمی تواند خالی باشد')
            .min(3, 'حداقل ۳ کاراکتر'),
        max_weight_for_free_shipping: yup
            .number()
            .required('حداکثر وزن نمی تواند خالی باشد')
            .min(3, 'حداقل ۳ کاراکتر'),
    });

    const onSubmit = (values) => {
            dispatch(postAsyncEditShippingMethodFree(values));
    };

    const formik = useFormik({
        initialValues: list_shipping_method_free ||  initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true,
        enableReinitialize: true
    })

    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                dispatch(shippingClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(shippingClearResult())
            }
        }
    }, [result]);

    return (
        <>
            <div className={`flex flex-col gap-2`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <HeaderBox text1={"داشبورد"} text2={false}  text3={"ارسال رایگان"}/>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex w-full gap-2 ">
                            {isLoading_list_free ? (
                                <Loading />
                            ) : isError_list_free ? (
                                <Reject />
                            ) :list_shipping_method_free && Object.values(list_shipping_method_free).length  > 0 ? (
                                <div className="flex flex-col w-4xl gap-4 bg-gray-100 dark:bg-gray-700/50 shadow-lg rounded-3xl  p-10">
                                    <div className="flex items-center justify-between">
                                        <div className="w-1/2 flex-col flex gap-5">
                                            <InputCheckbox
                                                formik={formik}
                                                name="enable_free_shipping"
                                                label="روش ارسال رایگان فعال باشد؟"
                                                value={true}
                                            />
                                            <Input formik={formik} maxLength={25} name="min_order_for_free_shipping" label="حداقل مبلغ سفارش برای ارسال رایگان:" />
                                            <Input formik={formik} maxLength={25} name="min_count_for_free_shipping" label="حداقل تعداد سفارش برای ارسال رایگان:" />
                                            <Input formik={formik} maxLength={25} name="min_weight_for_free_shipping" label="حداقل وزن سفارش برای ارسال رایگان:" />
                                            <Input formik={formik} maxLength={25} name="max_weight_for_free_shipping" label="حداکثر وزن سفارش برای ارسال رایگان:" />
                                        </div>
                                        <img
                                            src={freeShippingFreeIcon}
                                            alt="free shipping icon"
                                            className="w-56 h-56 object-cover"
                                        />
                                    </div>
                                    {/* Submit */}
                                    <div className="flex justify-center">
                                        <button
                                            disabled={!formik.isValid || isLoading}
                                            type="submit"
                                            className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-2xl enabled:cursor-pointer disabled:bg-gray-500  bg-cyan-400 enabled:hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                    <span>در حال {"ویرایش"}...</span>
                                                </>
                                            ) : (
                                                <span>{ "ویرایش"}</span>
                                            )}
                                        </button>
                                    </div>
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
                    </div>
                </form>
            </div>
        </>

    );
};
export default FreeShippingList;