import React, {useEffect, useRef, useState} from 'react';
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import {
    getAsyncSelectCategory,
} from "../../feature/redux/CategorySlice.jsx";
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {coupon, CouponChoose, filter, IncreasePriceOption} from "../../assets/data/Data.js";
import {useParams} from "react-router-dom";
import 'nilfam-editor/nilfam-editor.css';
import InputCalendar from "../../components/inputs/InputCalender.jsx";
import InputSelectStatus from "../../components/inputs/InputSelectStatus.jsx";
import SelectOptionMultiSelect from "../../components/inputs/SelectOptionMultiSelect.jsx";
import {
    couponClearResult, couponClearResultInfo,
    getAsyncInfoCoupon,
    postAsyncAddCoupon,
    putAsyncEditCoupon
} from "../../feature/redux/CouponSlice.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import InputLimitCount from "../../components/inputs/InputLimitCount.jsx";
import InputRadioButton from "../../components/inputs/InputRadioButton.jsx";
import {getAsyncListBrand, getAsyncSelectBrand} from "../../feature/redux/BrandSlice.jsx";


const CouponAdd = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {list_category_select} = useSelector(state => state.category);
    const {list_brand_select} = useSelector(state => state.brand);
    useEffect(() => {
        dispatch(getAsyncSelectCategory())
        dispatch(getAsyncSelectBrand())
        dispatch(couponClearResultInfo())
        if (id){
            dispatch(getAsyncInfoCoupon({Id:id}))
        }
    },[id])

    const {result,isLoading,info_coupon} = useSelector(state => state.coupon);
    // redux
    const initialValues = {
        type_coupon: "product",
        type: "",
        value: "",
        max_uses: "",
        user_limit: 10,
        first_order_only: "",
        min_order: "",
        max_order: "",
        start_at: "",
        expires_at: "",
        status: "",
        brand_id: [],
        category_id:[],
    }
    const validationSchema = yup.object({
    });

    const onSubmit = (values) => {
        if (id) {
            dispatch(putAsyncEditCoupon(values));
        } else {
            dispatch(postAsyncAddCoupon(values));
        }
    };

    const formik = useFormik({
        initialValues: info_coupon ||  initialValues,
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
                dispatch(couponClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(couponClearResult())
            }
        }
    }, [result]);

    return (
        <>
            <div className={`flex flex-col gap-2`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <HeaderBox text1={"داشبورد"} text2={"کوپن"}  text3={`${id?"ویرایش کوپن":"افرودن کوپن"}`}/>
                </div>
                <div className="w-full flex items-center justify-between py-2 px-6 dark:bg-gray-700/30 bg-gray-50 rounded-2xl shadow-lg dark:shadow dark:shadow-cyan-300">
                    <InputRadioButton
                        formik={formik}
                        name="type_coupon"
                        label=""
                        list={CouponChoose}
                    />
                </div>
                <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex w-full gap-2 ">
                                <div className="grid grid-cols-2 w-full  gap-4 bg-gray-50 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-3xl  p-4">
                                    <Input formik={formik} maxLength={30} name="code" label="کد:" />
                                    <Input formik={formik} maxLength={100000000000000000} name="min_order" label="حداقل مبلغ سفارش:" />
                                    {formik.values.type_coupon==="free_shipping" &&
                                        <Input formik={formik} maxLength={100000000000000000} name="max_order" label="حداکثر مبلغ سفارش:" />
                                    }
                                    <Input formik={formik} maxLength={100000000} onlyNum={true} name="max_uses" label="حداکثر دفعات استفاده:" />
                                    <InputLimitCount formik={formik} name={`user_limit`} onChange={e => formik.setFieldValue(`user_limit`, e.target.value)} label="محدودیت برای هر کاربر:" />
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
                                    {formik.values.type_coupon==="product" &&
                                        <div>
                                            {formik.values.type==="percent"?
                                                <Input formik={formik} maxLength={100} isPercent  name="value" label="درصد تخفیف:" />
                                                :
                                                <Input formik={formik} maxLength={100000000000} name="value" isAmount label="مبلغ تخفیف:" />
                                            }
                                        </div>
                                    }
                                    <SelectOption options={filter} formik={formik} name={`first_order_only`} label="محدود به اولین سفارش:" />
                                    {formik.values.type_coupon==="product" &&
                                        <SelectOptionMultiSelect
                                        formik={formik}
                                        formikAddress={formik.values.category_id}
                                        options={list_category_select}
                                        name="category_id"
                                        label="انتخاب دسته"
                                        />
                                    }
                                    {formik.values.type_coupon==="product" &&
                                        <SelectOptionMultiSelect
                                            formik={formik}
                                            formikAddress={formik.values.brand_id}
                                            options={list_brand_select}
                                            name="brand_id"
                                            label="انتخاب برند"
                                        />
                                    }
                                    <InputCalendar formik={formik} name="start_at" type="normal" label="تاریخ شروع" formikAddress={formik.values.start_at} />
                                    <InputCalendar formik={formik} name="expires_at" type="normal" label="تاریخ پایان" formikAddress={formik.values.expires_at} minDate={
                                        formik.values.start_at
                                            ? new DateObject({
                                                date: (formik.values.start_at + 3600) * 1000,
                                                calendar: persian,
                                                locale: persian_fa,
                                            })
                                            : null
                                    } />

                                    <InputCheckbox
                                        formik={formik}
                                        name="status"
                                        label="کوپن فعال باشد؟"
                                        value={true}
                                    />
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