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
import {optionsActive} from "../../assets/data/Data.js";
import {getAsyncInfoProduct} from "../../feature/redux/ProductSlice.jsx";
import {useParams} from "react-router-dom";
import {Config} from "../../config/Config.jsx";
import CategoryNotFound from "../../assets/image/category_not_found.png";
import TextArea from "../../components/inputs/TextArea.jsx";
import {NilfamEditor} from "nilfam-editor";


const AddArticle = () => {
    const { id } = useParams();
    const myElementRef = useRef(null);
    const dispatch = useDispatch();
    const {list_category_select} = useSelector(state => state.category);
    useEffect(() => {
        dispatch(getAsyncSelectCategory())
    }, []);

    useEffect(() => {
        if (id){
            console.log(id);
            dispatch(getAsyncInfoProduct({Id:id}))
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
        brand_id:"",
        category_id:"",
        sub_category_id:"",
        status:"",
        publish_at:"",
        seo_title:"",
        seo_desc:"",
        gallery:"",
        attribute:"",
        pricing_type:"",
        price:"",
        discount_price:"",
        stock_qty:"",
        weight:"",
        variants:"",
    }
    const validationSchema = yup.object({
        title: yup
            .string()
            .required('نام الزامی است')
            .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
            .max(30, 'نام نباید بیشتر از ۳۰ کاراکتر باشد'),

    });
    const onSubmit = (values) => {
        // if (Id) {
        //     dispatch(postAsyncEditCategory(values));
        // } else {
        //     dispatch(postAsyncAddCategory(values));
        // }
    };

    const formik = useFormik({
        initialValues:   initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true
    })

    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                dispatch(categoryClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(categoryClearResult())
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
            <div className={`flex flex-col gap-2`}>
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
                <div className="flex gap-2 h-80">
                    <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl w-xl p-4">
                        <Input formik={formik} maxLength={25} name="title" label="نام مقاله" />
                        <Input formik={formik} maxLength={25} name="url" label="url" />
                        <TextArea formik={formik} maxLength={25} name="abstract" label="چکیده" />
                    </div>
                    <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl w-xl p-4">
                        <InputImageUpload formik={formik} formikAddress={formik.values.image} name="image" label="تصویر" />
                    </div>
                </div>
                <div className="flex gap-2 h-40">
                    <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl w-xl p-4">
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
                </div>
                <div className="flex flex-col p-20">
                    <NilfamEditor value={formik.values.body} dark={false} lang="en"
                                  onChange={newContent => formik.setFieldValue("body", newContent)} />
                </div>
            </div>
        </>

    );
};
export default AddArticle;