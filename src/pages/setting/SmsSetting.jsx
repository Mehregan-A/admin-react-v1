import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import Input from "../../components/inputs/Input.jsx";
import {options} from "../../assets/data/Data.js";
import {useLocation, useParams} from "react-router-dom";
import 'nilfam-editor/nilfam-editor.css';
import {getAsyncListSetting, postAsyncEditSetting, settingClearResult} from "../../feature/redux/SettingSlice.jsx";
import InputActivate from "../../components/inputs/InputActive.jsx";
import Media from "../../components/inputs/media/Media.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {getAsyncListSms, postAsyncAddSms, smsClearResult} from "../../feature/redux/SmsSlice.jsx";
import TextArea from "../../components/inputs/TextArea.jsx";


const SmsSetting = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/sms-setting") {
            dispatch(getAsyncListSms())
        }
    },[location.pathname])

    const {result,isLoading,list_sms,isLoading_list,isError_list} = useSelector(state => state.sms);
    // redux
    const initialValues = {
        enable_successful_payment_sms: "",
        successful_payment_sms_text: "",
        enable_shipment_sms: "",
        shipment_sms_text: ""
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
        console.log(values)
        dispatch(postAsyncAddSms(values));
    };

    const formik = useFormik({
        initialValues: list_sms || initialValues,
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
                dispatch(smsClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(smsClearResult())
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
                        <div className="text-gray-400 dark:text-gray-300">  تنظیمات   |  </div>
                        <div className="text-cyan-700 dark:text-cyan-400">پیامک </div>
                    </div>
                </div>
                <div className={`flex flex-col gap-3 min-h-120`}>
                    {isLoading_list
                        ?<Loading />
                        :isError_list
                            ?<Reject />
                            :
                            <form className="flex flex-col gap-5 mt-7" onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col md:flex-row w-full items-center gap-2">
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl p-4">
                                                <InputActivate formik={formik} name="enable_successful_payment_sms" label="فعال سازی پیامک پرداخت موفق" options={options} formikAddress={formik.values.enable_successful_payment_sms} />
                                                <TextArea formik={formik} maxLength={25} name="successful_payment_sms_text" label="متن پیامک پرداخت موفق" />
                                            </div>
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl p-4">
                                                <InputActivate formik={formik} name="enable_shipment_sms" label="زمان ارسال پیامک ارسال شود؟" options={options} formikAddress={formik.values.enable_shipment_sms} />
                                                <TextArea formik={formik} maxLength={25} name="shipment_sms_text" label="متن پیامک زمان ارسال" />
                                            </div>
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
                                                <span>در حال ویرایش...</span>
                                            </>
                                        ) : (
                                            <span>ثبت</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                    }
                </div>
            </div>
        </>

    );
};
export default SmsSetting;