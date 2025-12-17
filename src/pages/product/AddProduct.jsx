import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {status} from "../../assets/data/Data.js";
import {useParams} from "react-router-dom";
import TextArea from "../../components/inputs/TextArea.jsx";
import { NilfamEditor } from 'nilfam-editor';
import 'nilfam-editor/nilfam-editor.css';
import InputCalendar from "../../components/inputs/InputCalender.jsx";
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
import {getAsyncListAttributeSelect} from "../../feature/redux/AttributeSlice.jsx";
import {AnimatePresence, motion} from "framer-motion";
import {HiOutlineChevronDown} from "react-icons/hi";
import {
    attributeValClearResult,
    getAsyncAddAttributeVal,
    getAsyncListAttributeVal
} from "../../feature/redux/AttributeValueSlice.jsx";
import {getAsyncListVariantAttributeSelect} from "../../feature/redux/VariantAttributeSlice.jsx";
import ProductVariants from "./ProductVariants.jsx";


const AddProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {list_category_select} = useSelector(state => state.category);
    const {list_variant_attribute_select} = useSelector(state => state.variantAttribute);
    const {list_brand_select} = useSelector(state => state.brand);
    const {list_attribute_select} = useSelector(state => state.attribute);
    const { list_attribute_val,isError_list,isLoading_list,result:result_val} = useSelector(state => state.attributeVal);
    const {theme}=useSelector(state => state.theme)
    const [openAttribute, setOpenAttribute] = useState(null);
    const [AttributeId, setAttributeId] = useState("");
    const [Pricing_type,setPricing_type] = useState("flex");

    useEffect(() => {
        dispatch(getAsyncListVariantAttributeSelect())
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
        code:"1001",
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
        gallery:[],
        attribute:[],
        pricing_type:"simple",
        price:"",
        discount_price:"",
        stock_qty:"",
        weight:"",
        variants:[{id: "",
            option_ids: [],
            option_labels: [],
            price: "",
            discount_price: "",
            stock_qty: "",
            weight: "",
            stock_order_limit: "",
            isConfirmed: false,}],
        current_stock:"",
        stock_order_limit:"",
    }
    const validationSchema = yup.object({
        // title: yup
        //     .string()
        //     .required('عنوان مقاله الزامی است')
        //     .min(2, 'عنوان باید حداقل 2 کاراکتر باشد')
        //     .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        //
        // url: yup
        //     .string()
        //     .required('آدرس URL الزامی است')
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
        //     .required('متن مقاله الزامی است'),
        //
        // image: yup
        //     .mixed()
        //     .required('تصویر مقاله الزامی است'),
        //
        // category_id: yup
        //     .number()
        //     .required('انتخاب دسته الزامی است'),
        //
        // sub_category_id: yup
        //     .number()
        //     .required('انتخاب زیر دسته الزامی است'),
        //
        // read_time: yup
        //     .number()
        //     .required('زمان مطالعه الزامی است'),
        // seo_title: yup
        //     .string()
        //     .required('عنوان سئو الزامی است')
        //     .min(2, 'عنوان سئو باید حداقل 2 کاراکتر باشد')
        //     .max(100, 'عنوان سئو نباید بیشتر از ۱۰۰ کاراکتر باشد'),
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
    useEffect(() => {
        if(result_val && result_val?.status){
            if(result_val.status === 200) {
                // toast
                Toast.success(`${result_val.data.message}`);
                dispatch(getAsyncListAttributeVal({Id:AttributeId}));
                dispatch(attributeValClearResult())
            }else{
                // toast
                Toast.error(`${result_val.data.message}`);
                dispatch(attributeValClearResult())
            }
        }
    }, [result_val]);
    console.log(formik.values)

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
                                <div className="flex flex-col gap-3 w-full bg-gray-100 rounded-xl p-4 dark:bg-gray-800 shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-cyan-300/60">
                                    <div className="flex flex-col xl:flex-row gap-3">
                                        <div className="flex xl:w-3/4 w-full flex-col gap-4">
                                            <Input formik={formik} maxLength={40} noPersian={true} name="url" label="url" />
                                            <Input formik={formik} maxLength={40} name="title" label="نام محصول" />
                                            <TextArea formik={formik} maxLength={500} name="abstract" label="چکیده" />
                                        </div>
                                        <div className="flex xl:w-1/4 w-full flex-col mt-2 rounded-xl">
                                            <Media
                                                single={true}
                                                label=" تصویر اول"
                                                desc="تصویر"
                                                name="image"
                                                formik={formik}
                                                formikAddress={formik.values.image}/>
                                        </div>
                                    </div>
                                    <div className="w-full rounded-xl ">
                                        <div className="flex flex-col xl:flex-row gap-3 ">
                                            <div className="flex gap-2  w-full flex-col rounded-xl">
                                                <Media
                                                    label="تصویر جانبی"
                                                    desc="تصویر"
                                                    name="gallery"
                                                    formik={formik}
                                                    formikAddress={formik.values.image}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex justify-center">
                                </div>
                            </div>
                            <div className="flex flex-col w-full shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl">
                                <NilfamEditor value={formik.values.body} isDark={theme} lang="fa"
                                              onChange={newContent => formik.setFieldValue("body", newContent)} />
                            </div>
                            {formik.values.pricing_type === "flex" &&
                                <ProductVariants
                                    variantAttributes={list_variant_attribute_select}
                                    formik={formik}
                                    isLoadingOptions={isLoading_list}
                                />
                            }
                            {formik.values.pricing_type === "simple" &&
                                <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl  p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-600 text-xs font-semibold">قیمت گذاری پیشرفته</span>
                                        <label className='flex cursor-pointer select-none items-center'>
                                            <div className='relative'>
                                                <input
                                                    type='button'
                                                    onClick={(e)=>formik.setFieldValue("pricing_type",formik.values.pricing_type==="simple"?"flex":"simple")}
                                                    className='sr-only'
                                                />
                                                <div
                                                    className={`box block h-6 w-11 border border-cyan-300 rounded-full ${
                                                        formik.values.pricing_type==="simple" ? 'bg-gray-300' : 'bg-cyan-400'
                                                    }`}
                                                ></div>
                                                <div
                                                    className={`absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${
                                                        formik.values.pricing_type==="simple" ? 'translate-x-full' : ''
                                                    }`}
                                                ></div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input formik={formik} onlyNum name="price" label="قیمت" />
                                        <Input
                                            formik={formik}
                                            onlyNum
                                            name="discount_price"
                                            label="مبلغ پس از تخفیف"
                                        />
                                        <Input
                                            formik={formik}
                                            onlyNum
                                            name="stock_qty"
                                            label="تعداد"
                                        />
                                        <Input formik={formik} onlyNum name="weight" label="وزن" />
                                        <Input
                                            formik={formik}
                                            onlyNum
                                            name="stock_order_limit"
                                            label="حداکثر سفارش"
                                        />
                                    </div>
                                </div>
                            }
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
                                        {list_attribute_select?.length > 0 &&
                                            list_attribute_select.map((att) => {
                                                const exists = formik.values.attribute.some(a => a.id === att.value);

                                                return (
                                                    <div
                                                        key={att.value}
                                                        onClick={() => {
                                                            setAttributeId(att.value);
                                                            dispatch(getAsyncListAttributeVal({ Id: att.value }));
                                                            setOpenAttribute(
                                                                openAttribute === att.value ? null : att.value
                                                            );

                                                            if (!exists) {
                                                                formik.setFieldValue("attribute", [
                                                                    ...formik.values.attribute,
                                                                    {
                                                                        id: att.value,
                                                                        title: att.label,
                                                                        data_type: att.data_type,
                                                                        value: []
                                                                    }
                                                                ]);
                                                            }
                                                        }}
                                                        className={`relative group border border-gray-300 cursor-pointer p-2 flex flex-col items-center rounded-lg transition-all duration-500 ease-in-out
                                                        hover:bg-cyan-50/20 dark:hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105`}
                                                    >
                                                        <div className="flex justify-between items-center w-full">
                                                            <span className="dark:text-stone-100 text-sm text-gray-800 mr-1">
                                                                {att.label}
                                                            </span>

                                                            <HiOutlineChevronDown
                                                                className={`text-cyan-300 transition-transform duration-300 
                                                                 ${openAttribute === att.value ? "rotate-180" : ""}`}
                                                            />
                                                        </div>

                                                        {/* Attribute Value Dropdown */}
                                                        <AnimatePresence>
                                                            {openAttribute === att.value && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.25 }}
                                                                    className="w-full grid grid-cols-2 items-center gap-2  shadow-lg dark:shadow-gray-600 bg-white/60 dark:bg-gray-800 dark:border dark:border-cyan-300 mt-2 rounded-lg p-4 overflow-y-auto max-h-36"
                                                                >
                                                                    {isLoading_list && (
                                                                        <div className="py-2 px-2 text-center text-sm text-gray-500 dark:text-gray-300">
                                                                            در حال بارگذاری...
                                                                        </div>
                                                                    )}
                                                                    <form
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        className="w-full col-span-2"
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <Input
                                                                                formik={formik}
                                                                                name="title"
                                                                                label="افزودن ویژگی"
                                                                            />

                                                                            <button
                                                                                type="button"
                                                                                disabled={!formik.values.title.trim() || isLoading}
                                                                                onClick={() => {
                                                                                    const title = formik.values.title.trim();

                                                                                    if (!title) return;

                                                                                    dispatch(
                                                                                        getAsyncAddAttributeVal({
                                                                                            title,
                                                                                            Id: att.value
                                                                                        })
                                                                                    );
                                                                                    formik.setFieldValue("title", "");
                                                                                }}
                                                                                className="flex mt-4 h-10 text-xs justify-center items-center gap-x-2 px-2 py-0.5 rounded-lg enabled:cursor-pointer disabled:bg-gray-500 bg-cyan-400 enabled:hover:bg-cyan-500 text-gray-50 transition-colors"
                                                                            >
                                                                                {isLoading ? (
                                                                                    <>
                                                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                                                        <span>افزودن...</span>
                                                                                    </>
                                                                                ) : (
                                                                                    <span>افزودن</span>
                                                                                )}
                                                                            </button>

                                                                        </div>
                                                                    </form>
                                                                    {!isLoading_list &&
                                                                        list_attribute_val?.map((val) => (
                                                                            <div
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();

                                                                                    const attributeId = att.value;
                                                                                    const allValues = list_attribute_val.map(v => ({
                                                                                        id: v.value,
                                                                                        title: v.label,
                                                                                        select: false
                                                                                    }));

                                                                                    const updated = formik.values.attribute.map(attr => {
                                                                                        if (attr.id === attributeId) {

                                                                                            const newValues = allValues.map(v => {
                                                                                                const existing = attr.value.find(item => item.id === v.id);
                                                                                                if (v.id === val.value) {
                                                                                                    return {
                                                                                                        ...v,
                                                                                                        select: existing ? !existing.select : true
                                                                                                    };
                                                                                                }

                                                                                                if (existing) {
                                                                                                    return existing;
                                                                                                }

                                                                                                return v;
                                                                                            });

                                                                                            return {
                                                                                                ...attr,
                                                                                                value: newValues
                                                                                            };
                                                                                        }

                                                                                        return attr;
                                                                                    });

                                                                                    formik.setFieldValue("attribute", updated);
                                                                                }}

                                                                                key={val.value}
                                                                                className={`
                                                                                    p-1 rounded-lg flex items-center justify-center 
                                                                                    transition cursor-pointer text-sm
                                                                                    dark:text-gray-300 text-gray-700
                                                                                    bg-white/80 dark:bg-gray-700/20 border-b border-gray-200 shadow-lg dark:shadow-none
                                                                                    ${formik.values.attribute
                                                                                    ?.find(a => a.id === att.value)
                                                                                    ?.value?.find(v => v.id === val.value)?.select
                                                                                    ? ""
                                                                                    : "hover:bg-cyan-100/30 dark:hover:bg-cyan-700/20"
                                                                                }
    `}
                                                                            >
                                                                                <div className="flex gap-2 items-center">
                                                                                    <span>
                                                                                    {val.label}
                                                                                </span>
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={
                                                                                            formik.values.attribute
                                                                                                ?.find(a => a.id === att.value)
                                                                                                ?.value?.find(v => v.id === val.value)?.select || false
                                                                                        }
                                                                                        readOnly
                                                                                        className="
                                                                                            w-4 h-4 cursor-pointer appearance-none rounded-md
                                                                                            border border-gray-400 dark:border-gray-500
                                                                                            transition-all duration-300
                                                                                            checked:bg-cyan-500 checked:border-cyan-500
                                                                                            hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-300/40
                                                                                            relative
                                                                                        "
                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        ))}

                                                                    {isError_list && (
                                                                        <li className="py-2 px-2 text-red-500 text-sm">
                                                                            خطا در دریافت مقدارها
                                                                        </li>
                                                                    )}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
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