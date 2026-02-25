import React, {useEffect} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import rubika from "../../assets/image/social/rubika.png"
import bale from "../../assets/image/social/bale.svg"
import eitaa from "../../assets/image/social/eitaa.svg"
import aparat from "../../assets/image/social/aparat.svg"
import {useLocation} from "react-router-dom";
import 'nilfam-editor/nilfam-editor.css';
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import Input from "../../components/inputs/Input.jsx";
import {getAsyncListSocial, postAsyncEditSocial, socialClearResult} from "../../feature/redux/SocialNetworkSlice.jsx";
import {FaFacebookSquare, FaInstagram, FaLinkedin, FaTelegram, FaYoutube} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";
import {
    contactUsClearResult,
    getAsyncListContactUs,
    postAsyncEditContactUs
} from "../../feature/redux/ContactUsSlice.jsx";


const ContactUsList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/contact-us") {
            dispatch(getAsyncListContactUs())
        }
    },[location.pathname])

    const {result,isLoading,list_contact,isLoading_list,isError_list} = useSelector(state => state.contact);
    // redux
    const initialValues = {
        about_title: "",
        about_body: "",
        license: "",
        site_slogan: "",
        site_slogan_sub: "",
        contact_title: "",
        contact_address: "",
        contact_phone_one: "",
        contact_phone_two: "",
        contact_mobile_one: "",
        contact_mobile_two: "",
        contact_email: "",
        contact_image: "",
        contact_zipcode: ""
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
        dispatch(postAsyncEditContactUs(values));
    };

    const formik = useFormik({
        initialValues: list_contact || initialValues,
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
                dispatch(contactUsClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(contactUsClearResult())
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-600 rounded-xl p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="about_title" label="درباره عنوان" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="about_body" label="درباره بدنه" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="license" label="مجوز" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="site_slogan" label="شعار سایت" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="site_slogan_sub" label="شعار سایت توضیحات" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_title" label="عنوان تماس با ما" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_address" label="آدرس تماس با ما" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_phone_one" label="تلفن تماس با ما اول" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_phone_two" label="تلفن تماس با ما دوم" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_mobile_one" label="موبایل تماس با ما اول" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_mobile_two" label="موبایل تماس با ما دوم" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_email" label="ایمیل تماس با ما" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_image" label="تصویر تماس با ما" />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Input formik={formik} name="contact_zipcode" label="کد پستی تماس با ما" />
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
export default ContactUsList;