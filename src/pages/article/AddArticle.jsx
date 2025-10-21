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


const AddArticle = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {list_category_select} = useSelector(state => state.category);
    const [activeTab, setActiveTab] = useState("1");
    useEffect(() => {
        if (id){
            dispatch(getAsyncGetInfoArticle({Id:id}))
        }
    },[])

    const {result,isLoading,list_info_article} = useSelector(state => state.article);
    console.log(list_info_article)
    // redux
    const initialValues = {
        url:'',
        title:'',
        abstract:'',
        body:"",
        image:"",
        category_id:"",
        sub_category_id:"",
        status:"",
        publish_at:"",
        seo_title:"",
        seo_desc:"",
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
        if (id) {
            dispatch(putAsyncEditArticle(values));
        } else {
            dispatch(postAsyncAddArticle(values));
        }
    };

    const formik = useFormik({
        initialValues: list_info_article ||  initialValues,
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
    const selectedSubCategory = Array.isArray(list_category_select)
        ? list_category_select.find(
            category => category.value === formik.values.category_id
        )
        : undefined;
    const subCategories = selectedSubCategory?.sub_category || [];

    return (
        <>
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-start gap-2 p-5'>
                        <div className="text-gray-400 dark:text-gray-300">  تعاریف   |  </div>
                        <div className="text-gray-400 dark:text-gray-300"> مقاله |</div>
                        {!id &&
                            <div className="text-cyan-700 dark:text-cyan-400">افرودن مقاله</div>
                        }
                        {id &&
                            <div className="text-cyan-700 dark:text-cyan-400">ویرایش مقاله</div>
                        }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 bg-gray-100 dark:bg-gray-800 inset-shadow-sm inset-shadow-cyan-300  rounded-xl shadow-lg items-center">
                    <button
                        onClick={() => setActiveTab("1")}
                        className={`w-full flex items-center justify-center rounded-xl p-3 md:text-[13px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "1"
                                ? "bg-gray-50 drop-shadow-lg drop-shadow-cyan-500 dark:bg-gray-800/90 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}
                    >نام مقاله/url/چکیده/تصویر</button>

                    <button
                        onClick={() => setActiveTab("2")}
                        className={`w-full flex justify-center items-center rounded-xl p-3 md:text-[13px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "2"
                                ? "bg-gray-50 drop-shadow-lg drop-shadow-cyan-500 dark:bg-gray-800/90 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}
                    >body</button>
                    <button
                        onClick={() => setActiveTab("3")}
                        className={`w-full flex justify-center items-center rounded-xl p-3 md:text-[13px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "3"
                                ? "bg-gray-50 drop-shadow-lg drop-shadow-cyan-500 dark:bg-gray-800/90 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}
                    >انتخاب دسته/زیر دسته/زمان مطالعه/تاریخ انتشار</button>
                    <button
                        onClick={() => setActiveTab("4")}
                        className={`w-full flex justify-center items-center rounded-xl p-3 md:text-[13px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "4"
                                ? "bg-gray-50 drop-shadow-lg drop-shadow-cyan-500 dark:bg-gray-800/90 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}
                    >عنوان سئو/توضیحات سئو/وضعیت</button>
                </div>
                 <form className="mt-7" onSubmit={formik.handleSubmit}>
                    {activeTab==="1" &&
                        <div className="flex flex-col gap-6">
                            <div className="flex w-full gap-2 h-80">
                                <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                    <Input formik={formik} maxLength={25} name="title" label="نام مقاله" />
                                    <Input formik={formik} maxLength={25} name="url" label="url" />
                                    <TextArea formik={formik} maxLength={25} name="abstract" label="چکیده" />
                                </div>
                                <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl p-4">
                                    <InputImageUpload formik={formik} formikAddress={formik.values.image} name="image" label="تصویر" />
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
                    {activeTab==="2" &&
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col w-full shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl ">
                                <NilfamEditor value={formik.values.body} dark={true} lang="fa"
                                              onChange={newContent => formik.setFieldValue("body", newContent)} />
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
                    {activeTab==="3" &&
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-2 ">
                            <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl w-full p-4">
                                <SelectOption
                                    formik={formik}
                                    options={list_category_select}
                                    name="category_id"
                                    label="انتخاب دسته"
                                />
                                <SelectOption
                                    formik={formik}
                                    options={subCategories}
                                    name="sub_category_id"
                                    label="انتخاب زیر دسته"
                                />
                            </div>
                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                <Input formik={formik} maxLength={4} name="read_time" label="زمان مطالعه" />
                                <InputCalendar formik={formik} name="publish_at" type="normal" label="تاریخ انتشار" formikAddress={formik.values.publish_at} />
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
                    {activeTab==="4" &&
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-2 ">
                                <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                    <Input formik={formik} maxLength={25} name="seo_title" label="عنوان سئو" />
                                    <TextArea formik={formik} maxLength={25} name="seo_desc" label="توضیحات سئو" />
                                    {!id &&
                                        <SelectOption
                                            formik={formik}
                                            options={status}
                                            name="status"
                                            label="وضعیت"
                                        />
                                    }
                                    {id &&
                                        <InputSelectStatus
                                            formik={formik}
                                            optionEnter={list_info_article?.status}
                                            options={status}
                                            name="status"
                                            label="وضعیت"
                                        />
                                    }
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
                                            <span>در حال {id ? "ویرایش" : "ثبت"}...</span>
                                        </>
                                    ) : (
                                        <span>{id ? "ویرایش" : "ثبت"}</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </>

    );
};
export default AddArticle;