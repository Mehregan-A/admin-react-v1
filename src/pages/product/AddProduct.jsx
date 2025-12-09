import React, {useEffect} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {status} from "../../assets/data/Data.js";
import {NavLink, useParams} from "react-router-dom";
import TextArea from "../../components/inputs/TextArea.jsx";
import { NilfamEditor } from 'nilfam-editor';
import 'nilfam-editor/nilfam-editor.css';
import InputCalendar from "../../components/inputs/InputCalender.jsx";
import {
    articleClearInfo,
    articleClearResult,
    getAsyncGetInfoArticle,
    postAsyncAddArticle,
    putAsyncEditArticle
} from "../../feature/redux/ArticleSlice.jsx";
import InputSelectStatus from "../../components/inputs/InputSelectStatus.jsx";
import {getAsyncSelectCategory} from "../../feature/redux/CategorySlice.jsx";
import Media from "../../components/inputs/media/Media.jsx";
import {
    getAsyncInfoProduct,
    postAsyncAddProduct,
    productClearInfo, productClearResult,
    putAsyncEditProduct
} from "../../feature/redux/ProductSlice.jsx";
import {getAsyncSelectBrand} from "../../feature/redux/BrandSlice.jsx";
import SelectOptionMultiSelect from "../../components/inputs/SelectOptionMultiSelect.jsx";
import {getAsyncListAttributeSelect} from "../../feature/redux/AttributeSlice.jsx";
import {AnimatePresence, motion} from "framer-motion";
import FaIcons from "../../components/Icon.jsx";
import {HiOutlineChevronDown} from "react-icons/hi";


const AddProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {list_category_select} = useSelector(state => state.category);
    const {list_brand_select} = useSelector(state => state.brand);
    const {list_attribute_select} = useSelector(state => state.attribute);
    const {theme}=useSelector(state => state.theme)
    useEffect(() => {
        dispatch(getAsyncSelectCategory())
        dispatch(getAsyncSelectBrand())
        dispatch(getAsyncListAttributeSelect())
        if (id){
            dispatch(getAsyncInfoProduct({Id:id}))
        }else{
            dispatch(productClearInfo())
        }
    },[])

    const {result,isLoading,info_product} = useSelector(state => state.product);
    // redux
    const initialValues = {
        url:'',
        title:'',
        abstract:'',
        body:"",
        image:"",
        category_id:"",
        brand_id:"",
        sub_category_id:"",
        status:"",
        publish_at:"",
        seo_title:"",
        seo_desc:"",
        gallery:"",
        attribute:[],
        pricing_type:"",
        price:"",
        discount_price:"",
        stock_qty:"",
        weight:"",
        variants:"",
        code:"",
        current_stock:"",
        stock_order_limit:"",
    }
    const validationSchema = yup.object({
        title: yup
            .string()
            .required('عنوان مقاله الزامی است')
            .min(2, 'عنوان باید حداقل 2 کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),

        url: yup
            .string()
            .required('آدرس URL الزامی است')
            .max(100, 'آدرس نباید بیشتر از ۱۰۰ کاراکتر باشد'),

        abstract: yup
            .string()
            .required('چکیده مقاله الزامی است')
            // .min(10, 'چکیده باید حداقل ۱۰ کاراکتر باشد')
            .max(500, 'چکیده نباید بیشتر از ۵۰۰ کاراکتر باشد'),

        body: yup
            .string()
            .required('متن مقاله الزامی است'),

        image: yup
            .mixed()
            .required('تصویر مقاله الزامی است'),

        category_id: yup
            .number()
            .required('انتخاب دسته الزامی است'),

        sub_category_id: yup
            .number()
            .required('انتخاب زیر دسته الزامی است'),

        read_time: yup
            .number()
            .required('زمان مطالعه الزامی است'),
        seo_title: yup
            .string()
            .required('عنوان سئو الزامی است')
            .min(2, 'عنوان سئو باید حداقل 2 کاراکتر باشد')
            .max(100, 'عنوان سئو نباید بیشتر از ۱۰۰ کاراکتر باشد'),
    });

    const onSubmit = (values) => {
        console.log(values)
        if (id) {
            dispatch(putAsyncEditProduct(values));
        } else {
            dispatch(postAsyncAddProduct(values));
        }
    };

    const formik = useFormik({
        initialValues: info_product ||  initialValues,
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
                dispatch(productClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(productClearResult())
            }
        }
    }, [result]);
    const selectedSubCategory = Array.isArray(list_category_select)
        ? list_category_select.find(
            category => category.value === formik.values.category_id
        )
        : undefined;
    const subCategories = selectedSubCategory?.sub_category || [];
    console.log(list_attribute_select)

    return (
        <>
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-start gap-2 p-2'>
                        <div className="text-gray-400 dark:text-gray-300">  تعاریف   |  </div>
                        <div className="text-gray-400 dark:text-gray-300"> محصول |</div>
                        {!id &&
                            <div className="text-cyan-700 dark:text-cyan-400">افرودن محصول</div>
                        }
                        {id &&
                            <div className="text-cyan-700 dark:text-cyan-400">ویرایش محصول</div>
                        }
                    </div>
                </div>
                    <form onSubmit={formik.handleSubmit} className="md:flex-row flex flex-col w-full  items-start gap-5">
                        <div className="bg-gray-100/50 p-5 dark:bg-gray-700/40 rounded-2xl flex xl:w-4/6 w-full flex-col gap-5">
                            <div className="flex flex-col">
                                <div className="flex flex-col xl:flex-row w-full bg-gray-100 rounded-xl  dark:bg-gray-800 shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-cyan-300/60">
                                    <div className="flex xl:w-3/4 w-full flex-col gap-4 p-4">
                                        <Input formik={formik} maxLength={40} noPersian={true} name="url" label="url" />
                                        <Input formik={formik} maxLength={40} name="title" label="نام محصول" />
                                        <TextArea formik={formik} maxLength={500} name="abstract" label="چکیده" />
                                    </div>
                                    <div className="flex xl:w-1/4  w-full flex-col rounded-xl p-4">
                                        <Media
                                            single={true}
                                            label="تصویر"
                                            desc="تصویر"
                                            name="image"
                                            formik={formik}
                                            formikAddress={formik.values.image}/>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                </div>
                            </div>
                            <div className="flex flex-col w-full shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl">
                                <NilfamEditor value={formik.values.body} isDark={theme} lang="fa"
                                              onChange={newContent => formik.setFieldValue("body", newContent)} />
                            </div>
                        </div>

                        <div className="bg-gray-100/50 rounded-xl p-5 dark:bg-gray-700/40 xl:w-2/6 md:w-3/6 w-full flex flex-col gap-5">
                            <div className="flex gap-2 ">
                                <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl w-full p-4">
                                    <Input formik={formik} maxLength={4} name="read_time" label="زمان مطالعه" />
                                    <InputCalendar formik={formik} name="publish_at" type="normal" label="تاریخ انتشار" formikAddress={formik.values.publish_at} />
                                    <div className="w-full h-px bg-gray-300 dark:bg-cyan-200 my-3"></div>
                                    <SelectOption
                                        formik={formik}
                                        options={list_brand_select}
                                        name="brand_id"
                                        label="انتخاب برند"
                                    />
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
                                    <div className="w-full h-px bg-gray-300 dark:bg-cyan-200 my-3"></div>

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
                                            optionEnter={info_product?.status}
                                            options={status}
                                            name="status"
                                            label="وضعیت"
                                        />
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-2 ">
                                    <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl  p-4">
                                        {list_attribute_select?.length>0 && list_attribute_select?.map((att) => (
                                            <li
                                                key={att.value}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    subMenu(item.id);
                                                }}
                                                className={`relative group border border-gray-300 cursor-pointer p-2 flex flex-col items-center rounded-lg transition-all duration-500 ease-in-out
                                                hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                            >
                                                <div
                                                    className={`
                                                     absolute -right-2 -top-0.5 rounded-full transition-all duration-500 group-hover:bg-white group-hover:drop-shadow-lg drop-shadow-cyan-300`}
                                                >
                                                </div>

                                                <div className="flex justify-between items-center w-full">
                                            <span className="dark:text-stone-100 text-sm text-cyan-700 mr-1">
                                                {att.label}
                                            </span>
                                                    <HiOutlineChevronDown
                                                        className={`flex justify-end text-cyan-300 transition-transform duration-300 animate-bounce 
                                  
                                                       `}
                                                    />
                                                </div>
                                                {/*<AnimatePresence>*/}
                                                {/*    <motion.ul*/}
                                                {/*        layout*/}
                                                {/*        initial={{ height: 0, opacity: 0 }}*/}
                                                {/*        animate={{ height: "auto", opacity: 1 }}*/}
                                                {/*        exit={{ height: 0, opacity: 0 }}*/}
                                                {/*        transition={{ duration: 0.3, ease: "easeInOut" }}*/}
                                                {/*        className="w-full mt-2 flex flex-col border-r-2 border-gray-200 overflow-hidden"*/}
                                                {/*    >*/}
                                                {/*        {item.sub.map((sub) => (*/}
                                                {/*            <li key={sub.id} className="relative flex items-center py-2">*/}
                                                {/*             <span className="absolute left-full top-0 bottom-0 w-6 pointer-events-none" aria-hidden="true">*/}
                                                {/*                  <svg*/}
                                                {/*                      viewBox="0 0 24 100"*/}
                                                {/*                      preserveAspectRatio="none"*/}
                                                {/*                      className="absolute inset-0 h-full w-full stroke-gray-300 transform -rotate-90"*/}
                                                {/*                  >*/}
                                                {/*                    <path d="M50,18 Q5,50 10,10" fill="none" strokeWidth="1" />*/}
                                                {/*                  </svg>*/}
                                                {/*                </span>*/}
                                                {/*                <NavLink*/}
                                                {/*                    to={sub.link}*/}
                                                {/*                    onClick={(e) => {*/}
                                                {/*                        e.stopPropagation();*/}
                                                {/*                        handleItemClick();*/}
                                                {/*                    }}*/}
                                                {/*                    className={({ isActive }) =>*/}
                                                {/*                        `flex items-center mr-3 gap-2 px-1 py-1 transition-all duration-500 ease-in-out w-full ${*/}
                                                {/*                            isActive*/}
                                                {/*                                ? "font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-300/50 dark:bg-cyan-900/50 rounded-lg mr-1"*/}
                                                {/*                                : "text-gray-700 dark:text-gray-300"*/}
                                                {/*                        }`*/}
                                                {/*                    }*/}
                                                {/*                >*/}
                                                {/*                    <div*/}
                                                {/*                        className="w-full py-2.5 px-2 rounded-lg mr-1 transition-all duration-500 ease-in-out hover:bg-cyan-300/50 dark:hover:bg-cyan-900/50 transform hover:scale-105">*/}
                                                {/*                        {sub.label}*/}
                                                {/*                    </div>*/}
                                                {/*                </NavLink>*/}
                                                {/*            </li>*/}
                                                {/*        ))}*/}
                                                {/*    </motion.ul>*/}
                                                {/*</AnimatePresence>*/}
                                            </li>

                                        ))}
                                        {/*<SelectOptionMultiSelect*/}
                                        {/*    formik={formik}*/}
                                        {/*    formikAddress={formik.values.attribute}*/}
                                        {/*    options={list_attribute_select}*/}
                                        {/*    name="attribute"*/}
                                        {/*    label="انتخاب ویژگی غیر موثر بر قیمت"*/}
                                        {/*/>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-2 ">
                                    <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl  p-4">
                                        <Input formik={formik} maxLength={25} name="seo_title" label="عنوان سئو" />
                                        <Input formik={formik} maxLength={25} name="seo_keywords" label="کلمات کلیدی" />
                                        <TextArea formik={formik} maxLength={25} name="seo_desc" label="توضیحات سئو" />
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
                                            <span>در حال {id ? "ویرایش" : "ثبت"}...</span>
                                        </>
                                    ) : (
                                        <span>{id ? "ویرایش" : "ثبت"}</span>
                                    )}
                                </button>
                            </div>
                        </div>

                    </form>
            </div>
        </>
    );
};
export default AddProduct;