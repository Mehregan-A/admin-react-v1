import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import {gateway, options} from "../../assets/data/Data.js";
import {useLocation, useParams} from "react-router-dom";
import 'nilfam-editor/nilfam-editor.css';
import InputActivate from "../../components/inputs/InputActive.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {getAsyncListSms, postAsyncAddSms, smsClearResult} from "../../feature/redux/SmsSlice.jsx";
import TextArea from "../../components/inputs/TextArea.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import {gatewayClearResult, getAsyncListGateway, postAsyncEditGateway} from "../../feature/redux/GatewaySlice.jsx";
import zarinpal from "../../assets/image/zarnpal.png"
import zibal from "../../assets/image/zibal-logo.png"
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import Input from "../../components/inputs/Input.jsx";


const Listgateway = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/gateway/list") {
            dispatch(getAsyncListGateway())
        }
    },[location.pathname])

    const {result,isLoading,list_gateway,isLoading_list,isError_list} = useSelector(state => state.gateway);
    // redux
    const initialValues = {
        IS_BANK_GATEWAY_ACTIVE: "",
        DEFAULT_GATEWAY: "",
        ZARINPAL_GATEWAY_ACTIVE: "",
        ZARINPAL_PAYMENT_GATEWAY_CODE: "",
        ZIBAL_GATEWAY_ACTIVE: "",
        ZIBAL_PAYMENT_GATEWAY_CODE: ""
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
        dispatch(postAsyncEditGateway(values));
    };

    const formik = useFormik({
        initialValues: list_gateway || initialValues,
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
                dispatch(gatewayClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(gatewayClearResult())
            }
        }
    }, [result]);

    return (
        <>
            <div className={`flex flex-col gap-2`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <HeaderBox text1={"داشبورد"} text2={"پرداخت"}  text3={`درگاه پرداخت`}/>
                </div>
                <div className={`flex flex-col gap-3 min-h-120`}>
                    {isLoading_list
                        ?<Loading />
                        :isError_list
                            ?<Reject />
                            :
                            <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col w-full items-center gap-2">
                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-3xl p-4">
                                            <InputActivate formik={formik} name="IS_BANK_GATEWAY_ACTIVE" label="فعال سازی درگاه پرداخت" options={options} formikAddress={formik.values.IS_BANK_GATEWAY_ACTIVE} />
                                            <InputActivate formik={formik} name="DEFAULT_GATEWAY" label="درگاه پیش فرض" options={gateway} formikAddress={formik.values.DEFAULT_GATEWAY} />
                                        </div>

                                        <div className="flex w-full  gap-4 bg-gray-100  dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl p-4">

                                            <div className={`${formik.values.ZARINPAL_GATEWAY_ACTIVE==="active"?"bg-gray-50 dark:bg-gray-700":"bg-gray-200 dark:bg-gray-800"} max-w-40 items-center flex flex-col gap-3  dark:shadow-gray-600  rounded-xl shadow-md p-3`}>
                                                <div className="flex gap-3 items-center justify-center">
                                                    <span className="dark:text-gray-100 text-gray-800">زرین پال</span>
                                                    <div className="flex items-center justify-center">
                                                        <InputCheckbox
                                                            formik={formik}
                                                            name="ZARINPAL_GATEWAY_ACTIVE"
                                                            label=""
                                                            value={formik.values.ZARINPAL_GATEWAY_ACTIVE}
                                                        />
                                                    </div>
                                                </div>
                                                <img src={zarinpal} className="w-28 h-36"/>
                                                <Input disabled={formik.values.ZIBAL_GATEWAY_ACTIVE==="active"?false:true} formik={formik} maxLength={25} name="ZARINPAL_PAYMENT_GATEWAY_CODE" label="کد درگاه" />
                                            </div>
                                            <div className={`${formik.values.ZIBAL_GATEWAY_ACTIVE==="active"?"bg-gray-50 dark:bg-gray-700":"bg-gray-200 dark:bg-gray-800"} max-w-40 items-center flex flex-col gap-3 dark:bg-gray-700 dark:shadow-gray-600 bg-gray-50 rounded-xl shadow-md p-3`}>
                                                <div className="flex gap-3 items-center justify-center">
                                                    <span className="dark:text-gray-100 text-gray-800">زیبال</span>
                                                    <div className="flex items-center justify-center">
                                                        <InputCheckbox
                                                            formik={formik}
                                                            name="ZIBAL_GATEWAY_ACTIVE"
                                                            label=""
                                                            value={formik.values.ZARINPAL_GATEWAY_ACTIVE}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-28 h-36 bg-white dark:bg-sky-950 rounded-lg border border-sky-700">
                                                    <img src={zibal} className=""/>
                                                </div>
                                                <Input disabled={formik.values.ZIBAL_GATEWAY_ACTIVE==="active"?false:true} formik={formik} maxLength={25} name="ZIBAL_PAYMENT_GATEWAY_CODE" label="کد درگاه" />
                                            </div>
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
export default Listgateway;