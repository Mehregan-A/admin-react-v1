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
import {coupon, optionsActive, status} from "../../assets/data/Data.js";
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
import SelectOptionMultiSelect from "../../components/inputs/SelectOptionMultiSelect.jsx";
import {getAsyncInfoCoupon} from "../../feature/redux/CouponSlice.jsx";


const CouponAdd = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {list_category_select} = useSelector(state => state.category);
    useEffect(() => {
        dispatch(getAsyncSelectCategory())
        if (id){
            dispatch(getAsyncInfoCoupon({Id:id}))
        }
    },[])

    const {result,isLoading,info_coupon} = useSelector(state => state.coupon);
    // redux
    const initialValues = {
        code: "",
        type: "",
        value: "",
        max_uses: "",
        user_limit: "",
        first_order_only: "",
        min_order: "",
        start_at: "",
        expires_at: "",
        status: "",
        brand_id: "",
        category_id:[],
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
        console.log(formik.values)
        // if (id) {
        //     dispatch(putAsyncEditArticle(values));
        // } else {
        //     dispatch(postAsyncAddArticle(values));
        // }
    };

    const formik = useFormik({
        initialValues: info_coupon ||  initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true
    })

    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                dispatch(articleClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(articleClearResult())
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
                        <div className="text-gray-400 dark:text-gray-300"> کوپن |</div>
                        {!id &&
                            <div className="text-cyan-700 dark:text-cyan-400">افرودن کوپن</div>
                        }
                        {id &&
                            <div className="text-cyan-700 dark:text-cyan-400">ویرایش کوپن</div>
                        }
                    </div>
                </div>
                <form className="mt-7" onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex w-full gap-2 h-80">
                                <div className="grid grid-cols-2 w-full  gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                    <Input formik={formik} maxLength={25} name="code" label="کد:" />
                                    <Input formik={formik} maxLength={25} name="min_order" label="حداقل سفارش:" />
                                    <SelectOptionMultiSelect
                                        formik={formik}
                                        formikAddress={formik.values.category_id}
                                        options={list_category_select}
                                        name="category_id"
                                        label="انتخاب دسته"
                                    />
                                    <InputCheckbox
                                        formik={formik}
                                        name="status"
                                        label="کوپن فعال باشد؟"
                                        value={true}
                                    />
                                    <InputCalendar formik={formik} name="start_at" type="normal" label="تاریخ شروع" formikAddress={formik.values.publish_at} />
                                    <InputCalendar formik={formik} name="expires_at" type="normal" label="تاریخ پایان" formikAddress={formik.values.publish_at} />
                                    {!id &&
                                        <SelectOption
                                            formik={formik}
                                            options={coupon}
                                            name="type"
                                            label="نوع کوپن"
                                        />
                                    }
                                    {id &&
                                        <InputSelectStatus
                                            formik={formik}
                                            optionEnter={info_coupon?.type}
                                            options={coupon}
                                            name="type"
                                            label="نوع کوپن"
                                        />
                                    }
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
                                                    <span>در حال {id ? "ویرایش" : "ثبت"}...</span>
                                                </>
                                            ) : (
                                                <span>{id ? "ویرایش" : "ثبت"}</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </form>
            </div>
        </>

    );
};
export default CouponAdd;