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
import {getAsyncListSeo, postAsyncEditSeo, seoClearResult} from "../../feature/redux/SeoSiteSlice.jsx";
import TextArea from "../../components/inputs/TextArea.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import {NilfamEditor} from "nilfam-editor";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import InputCalendar from "../../components/inputs/InputCalender.jsx";
import {status} from "../../assets/data/Data.js";
import InputSelectStatus from "../../components/inputs/InputSelectStatus.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";


const SeoList = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("1");
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
        index_title: yup
            .string()
            .required('عنوان صفحه اول الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        index_desc: yup
            .string()
            .required('عنوان توضیحات صفحه اول الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        articles_title: yup
            .string()
            .required('عنوان مقاله الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        articles_desc: yup
            .string()
            .required('عنوان توضیحات مقاله الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        rules_title: yup
            .string()
            .required('عنوان قوانین الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        rules_desc: yup
            .string()
            .required('عنوان توضیحات قوانین الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        contact_us_title: yup
            .string()
            .required('عنوان ارتباط با ما الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        contact_us_desc: yup
            .string()
            .required('عنوان توضیحات ارتباط با ما الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        about_us_title: yup
            .string()
            .required('عنوان درباره ما الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        about_us_desc: yup
            .string()
            .required('عنوان توضیحات درباره ما الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        return_policy_title: yup
            .string()
            .required('عنوان سیاست بازگشت کالا الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        return_policy_desc: yup
            .string()
            .required('عنوان توضیحات سیاست بازگشت کالا الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        purchase_and_payment_guide_title: yup
            .string()
            .required('عنوان راهنمای خرید و پرداخت الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        purchase_and_payment_guide_desc: yup
            .string()
            .required('عنوان توضیحات راهنمای خرید و پرداخت الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        shipping_method_title: yup
            .string()
            .required('عنوان روش های ارسال الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        shipping_method_desc: yup
            .string()
            .required('توضیحات روش های ارسال الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        faq_title: yup
            .string()
            .required('عنوان پرسش و پاسخ الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        faq_desc: yup
            .string()
            .required('توضیحات پرسش و پاسخ الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        privacy_policy_title: yup
            .string()
            .required('عنوان سیاست حفظ حریم خصوصی الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        privacy_policy_desc: yup
            .string()
            .required('توضیحات سیاست حفظ حریم خصوصی الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
        bug_report_title: yup
            .string()
            .required('عنوان گزارش اشکال الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        bug_report_desc: yup
            .string()
            .required('توضیحات گزارش اشکال الزامی است')
            .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
            .max(300, 'عنوان نباید بیشتر از 300 کاراکتر باشد'),
    });

    const onSubmit = (values) => {
        dispatch(postAsyncEditSeo(values));
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
                dispatch(seoClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(seoClearResult())
            }
        }
    }, [result]);

    return (
        <>
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <HeaderBox text1={"داشبورد"} text2={false}  text3={"سئو سایت"}/>
                </div>
                <div>
                    <div className="flex w-full flex-col gap-6">
                        <div className="flex w-full gap-2 ">
                            {isLoading_list ? (
                                <Loading />
                            ) : isError_list ? (
                                <Reject />
                            ) : Object.values(list_seo).length  > 0 ? (
                                    <div className="w-full">
                                        <div className="w-full  p-1.5 flex flex-col text-sm md:flex-row gap-3 bg-gray-100 dark:bg-gray-700 dark:shadow-cyan-200 dark:shadow-md   rounded-xl shadow-lg items-center">
                                            <button
                                                onClick={() => setActiveTab("1")}
                                                className={`w-full relative flex items-center justify-center rounded-xl p-2.5 md:text-[15px] text-gray-800 text-xs cursor-pointer transition-colors 
              ${
                                                    activeTab === "1"
                                                        ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                                        : "dark:text-gray-100"
                                                }`}

                                            >
                                                    <div className={`${ activeTab === "1"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>
                                                عنوان صفحه اول/مقاله
                                            </button>

                                            <button
                                                onClick={() => setActiveTab("2")}
                                                className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                                                    activeTab === "2"
                                                        ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                                        : "dark:text-gray-100"
                                                }`}

                                            >
                                                <div className={`${ activeTab === "2"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>
                                                قوانین/ارتباط با ما</button>
                                            <button
                                                onClick={() => setActiveTab("3")}
                                                className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                                                    activeTab === "3"
                                                        ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                                        : "dark:text-gray-100"
                                                }`}

                                            >
                                                <div className={`${ activeTab === "3"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>

                                                درباره ما/بازگشت کالا</button>
                                            <button
                                                onClick={() => setActiveTab("4")}
                                                className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                                                    activeTab === "4"
                                                        ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                                        : "dark:text-gray-100"
                                                }`}

                                            >
                                                <div className={`${ activeTab === "4"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>

                                                راهنمای خرید و پرداخت/روش ارسال</button>
                                            <button
                                                onClick={() => setActiveTab("5")}
                                                className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                                                    activeTab === "5"
                                                        ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                                        : "dark:text-gray-100"
                                                }`}

                                            >
                                                <div className={`${ activeTab === "5"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>

                                                پرسش و پاسخ/حریم خصوصی</button>
                                            <button
                                                onClick={() => setActiveTab("6")}
                                                className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                                                    activeTab === "6"
                                                        ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                                        : "dark:text-gray-100"
                                                }`}

                                            >
                                                <div className={`${ activeTab === "6"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>

                                                گزارش اشکال</button>
                                        </div>
                                        <form className="mt-7" onSubmit={formik.handleSubmit}>
                                            {activeTab==="1" &&
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex flex-col w-full gap-2 ">
                                                        <div className="flex  w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl  p-4">
                                                            <Input formik={formik} maxLength={100} name="index_title" label="عنوان صفحه اول" />
                                                            <TextArea formik={formik} maxLength={300} name="index_desc" label="توضیحات صفحه اول" />
                                                        </div>
                                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl  p-4">
                                                            <Input formik={formik} maxLength={100} name="articles_title" label="عنوان مقاله" />
                                                            <TextArea formik={formik} maxLength={300} name="articles_desc" label="توضیحات مقاله" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => setActiveTab("1")}
                                                            className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                                                        >
                                                            ادامه
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                            {activeTab==="2" &&
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex flex-col w-full gap-2 ">
                                                        <div className="flex  w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl  p-4">
                                                            <Input formik={formik} maxLength={100} name="rules_title" label="عنوان قوانین" />
                                                            <TextArea formik={formik} maxLength={300} name="rules_desc" label="توضیحات قوانین" />
                                                        </div>
                                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl  p-4">
                                                            <Input formik={formik} maxLength={100} name="contact_us_title" label="عنوان ارتیاط با ما" />
                                                            <TextArea formik={formik} maxLength={300} name="contact_us_desc" label="توضیحات ارتباط با ما" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => setActiveTab("2")}
                                                            className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                                                        >
                                                            ادامه
                                                        </button>
                                                    </div>
                                                </div>

                                            }
                                            {activeTab==="3" &&
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex flex-col gap-2 ">
                                                        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl w-full p-4">
                                                            <Input formik={formik} maxLength={100} name="about_us_title" label="عنوان درباره ما" />
                                                            <TextArea formik={formik} maxLength={300} name="about_us_desc" label="توضیحات درباره ما" />
                                                        </div>
                                                        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl w-full p-4">
                                                            <Input formik={formik} maxLength={100} name="return_policy_title" label="عنوان سیاست بازگشت کالا" />
                                                            <TextArea formik={formik} maxLength={300} name="return_policy_desc" label="توضیحات سیاست بازگشت کالا" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => setActiveTab("3")}
                                                            className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                                                        >
                                                            ادامه
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                            {activeTab==="4" &&
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex flex-col gap-2 ">
                                                        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl w-full p-4">
                                                            <Input formik={formik} maxLength={100} name="purchase_and_payment_guide_title" label="عنوان راهنمای خرید و پرداخت" />
                                                            <TextArea formik={formik} maxLength={300} name="purchase_and_payment_guide_desc" label="توضیحات راهنمای خرید و پرداخت" />
                                                        </div>
                                                        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl w-full p-4">
                                                            <Input formik={formik} maxLength={100} name="shipping_method_title" label="عنوان روش های ارسال" />
                                                            <TextArea formik={formik} maxLength={300} name="shipping_method_desc" label="توضیحات روش های ارسال" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => setActiveTab("4")}
                                                            className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                                                        >
                                                            ادامه
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                            {activeTab==="5" &&
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex flex-col gap-2 ">
                                                        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl w-full p-4">
                                                            <Input formik={formik} maxLength={100} name="faq_title" label="عنوان پرسش و پاسخ" />
                                                            <TextArea formik={formik} maxLength={300} name="faq_desc" label="توضیحات پرسش و پاسخ" />
                                                        </div>
                                                        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl w-full p-4">
                                                            <Input formik={formik} maxLength={100} name="privacy_policy_title" label="عنوان سیاست حفظ حریم خصوصی" />
                                                            <TextArea formik={formik} maxLength={300} name="privacy_policy_desc" label="توضیحات سیاست حفظ حریم خصوصی" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => setActiveTab("5")}
                                                            className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                                                        >
                                                            ادامه
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                            {activeTab==="6" &&
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex gap-2 ">
                                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl  p-4">
                                                            <Input formik={formik} maxLength={100} name="bug_report_title" label="عنوان گزارش اشکال" />
                                                            <TextArea formik={formik} maxLength={300} name="bug_report_desc" label="توضیحات گزارش اشکال" />
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
                                            }
                                        </form>
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
                </div>
            </div>
        </>

    );
};
export default SeoList;