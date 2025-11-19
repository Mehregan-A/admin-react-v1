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
import {getAsyncListSeo} from "../../feature/redux/SeoSiteSlice.jsx";


const SeoList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAsyncListSeo())
    },[])

    const {result,list_seo,isLoading_list,isError_list,isLoading} = useSelector(state => state.seo);
    // redux
    const initialValues = {
        index_title: "",
        index_desc: "",
        articles_title: "",
        articles_desc: "",
        contact_us_title: "",
        contact_us_desc: "",
        about_us_title: "",
        about_us_desc: "",
        purchase_and_payment_guide_title: "",
        purchase_and_payment_guide_desc: "",
        faq_title: "",
        faq_desc: "",
        privacy_policy_title: "",
        privacy_policy_desc: "",
        bug_report_title: "",
        bug_report_desc: "",
        shipping_method_title: "",
        shipping_method_desc: "",
        return_policy_title: "",
        return_policy_desc: "",
        rules_title: "",
        rules_desc: ""
    }
    const validationSchema = yup.object({
        // title: yup
        //     .string()
        //     .required('عنوان مقاله الزامی است')
        //     .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
        //     .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        //
        // url: yup
        //     .string()
        //     .required('آدرس URL الزامی است')
        //     .matches(/^[a-z0-9-]+$/, 'فقط حروف کوچک، عدد و خط تیره مجاز است')
        //     .max(100, 'آدرس نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        //
        // abstract: yup
        //     .string()
        //     .required('چکیده مقاله الزامی است')
        //     // .min(10, 'چکیده باید حداقل ۱۰ کاراکتر باشد')
        //     .max(500, 'چکیده نباید بیشتر از ۵۰۰ کاراکتر باشد'),
        //
        // body: yup
        //     .string()
        //     .required('متن مقاله الزامی است')
        //     .min(50, 'مقاله حداقل ۵۰ کاراکتر داشته باشد'),
        //
        // // image: yup
        // //     .mixed()
        // //     .required('تصویر مقاله الزامی است'),
        //
        // category_id: yup
        //     .string()
        //     .required('انتخاب دسته الزامی است'),
        //
        // sub_category_id: yup
        //     .string()
        //     .required('انتخاب زیر دسته الزامی است'),
        //
        // read_time: yup
        //     .number()
        //     .typeError('زمان مطالعه باید عدد باشد')
        //     .positive('عدد مثبت وارد کنید')
        //     .integer('عدد صحیح وارد کنید')
        //     .required('زمان مطالعه الزامی است'),
        // seo_title: yup
        //     .string()
        //     .required('عنوان سئو الزامی است')
        //     .min(3, 'عنوان سئو باید حداقل ۳ کاراکتر باشد')
        //     .max(100, 'عنوان سئو نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        //
        // seo_desc: yup
        //     .string()
        //     .required('توضیحات سئو الزامی است')
        //     .min(10, 'توضیحات باید حداقل ۱۰ کاراکتر باشد')
        //     .max(300, 'توضیحات نباید بیشتر از ۳۰۰ کاراکتر باشد'),
    });

    const onSubmit = (values) => {
        dispatch(postAsyncEditShippingMethodFree(values));
    };

    const formik = useFormik({
        initialValues: list_seo ||  initialValues,
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
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-start gap-2 p-5'>
                        <div className="text-gray-400 dark:text-gray-300">  داشبورد   |  </div>
                        <div className="text-cyan-700 dark:text-cyan-400">سئو سایت</div>
                    </div>
                </div>
                <form className="mt-7 " onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex w-full gap-2 ">
                            {isLoading_list ? (
                                <Loading />
                            ) : isError_list ? (
                                <Reject />
                            ) : Object.values(list_seo).length  > 0 ? (
                                <div className="flex flex-col w-4xl gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-2xl  p-10">
                                    <div className="flex items-center justify-between">
                                        <div className="w-1/2 flex-col flex gap-5">
                                            <Input formik={formik} maxLength={25} name="index_title" label="عنوان سئو" />
                                            <Input formik={formik} maxLength={25} name="index_desc" label="توضیحات سئو" />
                                            <Input formik={formik} maxLength={25} name="articles_title" label="عنوان مقاله" />
                                            <Input formik={formik} maxLength={25} name="articles_desc" label="توضیحات مقاله" />
                                            <Input formik={formik} maxLength={25} name="contact_us_title" label="عنوان ارتیاط با ما" />
                                            <Input formik={formik} maxLength={25} name="contact_us_desc" label="توضیحات ارتباط با ما" />
                                            <Input formik={formik} maxLength={25} name="about_us_title" label="عنوان درباره ما" />
                                            <Input formik={formik} maxLength={25} name="about_us_desc" label="توضیحات درباره ما" />
                                            <Input formik={formik} maxLength={25} name="purchase_and_payment_guide_title" label="عنوان راهنمای خرید و پرداخت" />
                                            <Input formik={formik} maxLength={25} name="purchase_and_payment_guide_desc" label="توضیحات راهنمای خرید و پرداخت" />
                                            <Input formik={formik} maxLength={25} name="faq_title" label="عنوان پرسش و پاسخ" />
                                            <Input formik={formik} maxLength={25} name="faq_desc" label="توضیحات پرسش و پاسخ" />
                                            <Input formik={formik} maxLength={25} name="privacy_policy_title" label="عنوان سیاست حفظ حریم خصوصی" />
                                            <Input formik={formik} maxLength={25} name="privacy_policy_desc" label="توضیحات سیاست حفظ حریم خصوصی" />
                                            <Input formik={formik} maxLength={25} name="bug_report_title" label="عنوان گزارش اشکال" />
                                            <Input formik={formik} maxLength={25} name="bug_report_desc" label="توضیحات گزارش اشکال" />
                                            <Input formik={formik} maxLength={25} name="shipping_method_title" label="عنوان روش های ارسال" />
                                            <Input formik={formik} maxLength={25} name="shipping_method_desc" label="توضیحات روش های ارسال" />
                                            <Input formik={formik} maxLength={25} name="return_policy_title" label="عنوان سیاست بازگشت کالا" />
                                            <Input formik={formik} maxLength={25} name="return_policy_desc" label="توضیحات سیاست بازگشت کالا" />
                                            <Input formik={formik} maxLength={25} name="rules_title" label="عنوان قوانین" />
                                            <Input formik={formik} maxLength={25} name="rules_desc" label="توضیحات قوانین" />
                                        </div>
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
export default SeoList;