import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {Toast} from "../../components/toast/Toast.jsx";
import {categoryClearResult, postAsyncAddCategory, postAsyncEditCategory} from "../../feature/redux/CategorySlice.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {optionsActive} from "../../assets/data/Data.js";
import {getAsyncInfoProduct} from "../../feature/redux/ProductSlice.jsx";
import {useParams} from "react-router-dom";
import {Config} from "../../config/Config.jsx";
import CategoryNotFound from "../../assets/image/category_not_found.png";


const AddProduct = () => {
    const { id } = useParams();
    const myElementRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id){
            console.log(id);
            dispatch(getAsyncInfoProduct({Id:id}))
        }
    },[])


    const {result,isLoading,info_product} = useSelector(state => state.product);
    console.log(info_product);
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

    return (
        <>
            <div className={`flex flex-col gap-2`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-start gap-2 p-5'>
                        <div className="text-gray-400 dark:text-gray-300">  تعاریف   |  </div>
                        <div className="text-gray-400 dark:text-gray-300"> محصولات |</div>
                        {!id &&
                        <div className="text-cyan-700 dark:text-cyan-400">افرودن محصول</div>
                        }
                        {id &&
                            <div className="text-cyan-700 dark:text-cyan-400">ویرایش محصول</div>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className="w-full flex gap-2 p-5">
                        <div className="bg-gray-700 rounded-xl w-full h-60">
                            <span>ویرایش تصویر</span>
                            <div className="w-full h-20 flex">
                                {info_product.gallery.map((item, index) => {
                                    return(
                                        <img
                                            src={item.url ? Config.apiImage + item.url: CategoryNotFound}
                                            className="w-32 h-32 rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg object-cover shadow-lg shadow-cyan-400 dark:shadow-cyan-300"
                                            alt="category"
                                        />
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AddProduct;