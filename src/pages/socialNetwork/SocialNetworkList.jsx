import React, {useEffect} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import rubika from "../../assets/image/social/rubika.png"
import bale from "../../assets/image/social/bale.svg"
import {useLocation} from "react-router-dom";
import 'nilfam-editor/nilfam-editor.css';
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import Input from "../../components/inputs/Input.jsx";
import {getAsyncListSocial, postAsyncEditSocial, socialClearResult} from "../../feature/redux/SocialNetworkSlice.jsx";
import {FaTelegram} from "react-icons/fa";


const SocialNetworkList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/social/list") {
            dispatch(getAsyncListSocial())
        }
    },[location.pathname])

    const {result,isLoading,list_social,isLoading_list,isError_list} = useSelector(state => state.social);
    // redux
    const initialValues = {
        telegram: "",
        instagram: "",
        twitter: "",
        youtube: "",
        linkedin: "",
        aparat: "",
        facebook: "",
        eitaa: "",
        bale: "",
        rubika: ""
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
        dispatch(postAsyncEditSocial(values));
    };

    const formik = useFormik({
        initialValues: list_social || initialValues,
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
                dispatch(socialClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(socialClearResult())
            }
        }
    }, [result]);

    return (
        <>
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <HeaderBox text1={"داشبورد"} text2={"تنظیمات"}  text3={`شبکه های اجتماعی`}/>
                </div>
                <div className={`flex flex-col gap-3 min-h-120`}>
                    {isLoading_list
                        ?<Loading />
                        :isError_list
                            ?<Reject />
                            :
                            <form className="flex flex-col gap-5 mt-7" onSubmit={formik.handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col w-full items-center gap-2">
                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="rubika" label="آدرس روبیکا" />
                                                <img className="w-10 h-10 mt-4.5" src={rubika}/>
                                            </div>
                                            <Input formik={formik} name="instagram" label="آدرس اینستاگرام" />
                                            <Input formik={formik} name="twitter" label="آدرس ایکس" />
                                            <Input formik={formik} name="youtube" label="آدرس یوتیوب" />
                                            <Input formik={formik} name="linkedin" label="آدرس لینکدین" />
                                            <Input formik={formik} name="aparat" label="آدرس آپارات" />
                                            <Input formik={formik} name="facebook" label="آدرس فیسبوک" />
                                            <Input formik={formik} name="eitaa" label="آدرس ایتا" />
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="bale" label="آدرس بله" />
                                                <img className="w-8.5 h-8.5 mt-4.5" src={bale}/>
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="telegram" label="آدرس تلگرام" />
                                                <div className="text-sky-500 mt-4.5">
                                                    <FaTelegram size={35} />
                                                </div>
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
export default SocialNetworkList;