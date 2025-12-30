import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {options, status} from "../../assets/data/Data.js";
import {useLocation, useParams} from "react-router-dom";
import TextArea from "../../components/inputs/TextArea.jsx";
import { NilfamEditor } from 'nilfam-editor';
import 'nilfam-editor/nilfam-editor.css';
import InputCalendar from "../../components/inputs/InputCalender.jsx";

import InputSelectStatus from "../../components/inputs/InputSelectStatus.jsx";
import {getAsyncSelectCategory} from "../../feature/redux/CategorySlice.jsx";
import Media from "../../components/inputs/media/Media.jsx";
import SearchProductAmazing from "./SearchProductAmazing.jsx";
import {PiStarFour, PiStarFourFill} from "react-icons/pi";
import {Config} from "../../config/Config.jsx";
import CategoryNotFound from "../../assets/image/category_not_found.png";
import {
    getAsyncInfoAmazingProduct,
    postAsyncAddAmazingProduct, postAsyncEditAmazingProduct,
    productAmazingClearInfo,
    productAmazingClearResult,
} from "../../feature/redux/AmazingProductSlice.jsx";
import {FaTrash} from "react-icons/fa";
import InputCount from "../../components/inputs/InputCount.jsx";


const AddProductAmazing = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const [openAdd ,setOpenAdd] = useState({open:false})
    const {result,isLoading,info_amazing} = useSelector(state => state.amazingProduct);
    const openModal = location.state?.openModal;
    useEffect(() => {
        if (id){
            dispatch(getAsyncInfoAmazingProduct({Id:id}))
        }else{
            dispatch(productAmazingClearInfo())
        }
    },[])
    useEffect(() => {
        if (openModal) {
            setOpenAdd({ open: !openAdd.open })
        }
    }, [openModal]);
    const setOpenId = () => {
        setOpenAdd({ open: true });
    };

    // redux
    const initialValues = {
        title:"",
        product_id : "",
        start_at : "",
        end_at: "",
        status: "",
        list:[]
    }
    const validationSchema = yup.object({


    });

    const onSubmit = (values) => {
        if (id) {
            dispatch(postAsyncEditAmazingProduct(values));
        } else {
            dispatch(postAsyncAddAmazingProduct(values));
        }
    };

    const formik = useFormik({
        initialValues:info_amazing || initialValues,
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
                dispatch(productAmazingClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(productAmazingClearResult())
            }
        }
    }, [result]);
    const handleDelete=(del)=>{
        const result = formik.values.list.find(val => val.sku_code === del.sku_code)
        if(result){
            const data = formik.values.list.filter(val => val.sku_code !== del.sku_code)
            formik.setFieldValue('list',data);
        }
    }
    console.log(formik.values);

    return (
        <>
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-start gap-2 p-2'>
                        <div className="text-gray-400 dark:text-gray-300">  تعاریف   |  </div>
                        <div className="text-gray-400 dark:text-gray-300"> شگفت انگیز |</div>
                        {!id &&
                            <div className="text-cyan-700 dark:text-cyan-400">افرودن شگفت انگیز</div>
                        }
                        {id &&
                            <div className="text-cyan-700 dark:text-cyan-400">ویرایش شگفت انگیز</div>
                        }
                    </div>
                </div>
                <div
                    onClick={() => setOpenId("")}
                    className="flex justify-center shadow-lg shadow-gray-300 dark:shadow-gray-600 dark:hover:shadow-cyan-200 hover:shadow-cyan-300 transition-all duration-500 dark:bg-gray-800 bg-gray-100 items-center gap-2 p-3 cursor-pointer rounded-2xl w-full h-32 dark:text-gray-200 text-gray-700 text-lg"
                >
                    <div className="flex flex-col gap-2 items-center">
                        <PiStarFourFill size={37} className="text-cyan-400"/>
                        <div className="cursor-pointer inline-block  py-3  font-semibold  bg-cyan-400 rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)] hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)] active:scale-95 transition-all duration-400 ease-in-out select-none hover:text-white dark:hover:text-white text-xs text-gray-100 p-2 px-10">افزودن محصول</div>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} className="bg-gray-100 dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-gray-600 flex flex-col gap-3 w-full rounded-2xl p-3">
                    <div className="lg:flex grid grid-cols-2 gap-2 items-center">
                        <InputCalendar formik={formik} name="start_at" type="normal" label="تاریخ شروع" formikAddress={formik.values.start_at} />
                        <InputCalendar formik={formik} name="end_at" type="normal" label="تاریخ پایان" formikAddress={formik.values.end_at} />
                        <Input formik={formik} maxLength={40} name="title" label="نام شگفت انگیز" />
                        <InputSelectStatus
                            formik={formik}
                            // optionEnter={list_info_article?.status}
                            options={options}
                            name="status"
                            label="وضعیت"
                        />
                        {/* Submit */}
                        <div className="w-full h-10 mt-4 flex justify-center col-start-2">
                            <button
                                disabled={!formik.isValid || isLoading}
                                type="submit"
                                className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl enabled:cursor-pointer disabled:bg-gray-500  bg-cyan-400 enabled:hover:bg-cyan-500} 
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
                    <div className="w-full h-px bg-gray-200"></div>
                    {formik.values.list.length>0 && formik.values.list?.map((item,index)=>{
                        return (
                            <div className="bg-gray-50 dark:bg-gray-700 flex w-full mt-3 gap-4 items-center rounded-xl p-3">
                                <div className="flex flex-col md:flex-row gap-4 items-center ">
                                    <div className="w-18 h-18 flex items-center  justify-center">
                                        <img
                                            src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                            alt="amazing"
                                            className="hexagon-img"
                                        />
                                    </div>
                                    <div className="flex text-gray-600 dark:text-gray-100 flex-col gap-1">
                                        <span className=" text-lg font-semibold">{item.title}</span>
                                        <div className="items-center flex gap-0.5 text-sm">
                                            <span className="">قیمت فعلی:</span>
                                            <span className="">{item.price}</span>
                                        </div>
                                        <div className="items-center flex gap-0.5 text-sm">
                                            <span className="">موجودی:</span>
                                            <span className="">{item.current_stock}</span>
                                        </div>
                                        <div className="items-center flex gap-0.5 text-sm">
                                            <span className="">{item.sku_code}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-row flex-col xl:w-3/4 w-full gap-4 p-4">
                                    <Input isAmount={true} formik={formik} name={`list[${index}].amazing_price`} onChange={e => formik.setFieldValue(`list[${index}].amazing_price`, e.target.value)} label="مبلغ شگفت انگیز" />
                                    <InputCount  formik={formik} name={`list[${index}].limit_qty`} onChange={e => formik.setFieldValue(`list[${index}].limit_qty`, e.target.value)} label="تعداد فروش" />
                                    <InputCount  defaultValue={1} formik={formik} name={`list[${index}].order_limit`} onChange={e => formik.setFieldValue(`list[${index}].order_limit`, e.target.value)} label="حداکثر تعداد سبد خرید" />
                                </div>
                                <div onClick={()=>handleDelete(item)} className="text-cyan-300 pt-3.5 transition-all hover:text-red-500 cursor-pointer">
                                    <FaTrash size={20}/>
                                </div>
                            </div>
                            )
                    })}
                </form>

                {openAdd.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <SearchProductAmazing formik={formik} close={() => setOpenAdd({ open: false })}/>
                    </div>
                )}
            </div>
        </>
    );
};
export default AddProductAmazing;