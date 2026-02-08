import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "../../components/toast/Toast.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import Input from "../../components/inputs/Input.jsx";
import {options} from "../../assets/data/Data.js";
import {useLocation, useParams} from "react-router-dom";
import 'nilfam-editor/nilfam-editor.css';
import {getAsyncListSetting, postAsyncEditSetting, settingClearResult} from "../../feature/redux/SettingSlice.jsx";
import InputActivate from "../../components/inputs/InputActive.jsx";
import Media from "../../components/inputs/media/Media.jsx";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";


const SettingList = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("1");
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/setting") {
            dispatch(getAsyncListSetting())
        }
    },[location.pathname])

    const {result,isLoading,list_setting,isLoading_list,isError_list} = useSelector(state => state.setting);
    // redux
    const initialValues = {
        allow_user_to_enter: "",
        allow_admin_to_enter: "",
        site_title: "",
        admin_login_title: "",
        admin_login_background: "",
        admin_panel_title: "",
        site_logo:"",
        user_login_title:"",
        user_login_logo:"",
        admin_login_logo:"",
        admin_slider_logo:""
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
        dispatch(postAsyncEditSetting(values));
    };

    const formik = useFormik({
        initialValues: list_setting ||  initialValues,
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
                dispatch(settingClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(settingClearResult())
            }
        }
    }, [result]);

    return (
        <>
            <div className={`flex flex-col gap-4`}>
                {/*header*/}
                <div className='flex justify-between items-center p-2'>
                    <HeaderBox text1={"داشبورد"} text2={false}  text3={"تنظیمات"}/>
                </div>
                <div className="w-full text-sm p-1.5 flex flex-col md:flex-row gap-3 bg-gray-100 dark:bg-gray-700 dark:shadow-cyan-200 dark:shadow-md   rounded-xl shadow-lg items-center">
                    <button
                        onClick={() => setActiveTab("1")}
                        className={`w-full relative flex items-center justify-center rounded-xl p-2.5 md:text-[15px] text-gray-800 text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "1"
                                ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}

                    >
                        <div className={`${ activeTab === "1"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>
                        تنظیمات سایت
                    </button>

                    <button
                        onClick={() => setActiveTab("2")}
                        className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "2"
                                ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}

                    >
                        <div className={`${ activeTab === "2"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>
                        تنظیمات ادمین</button>
                    <button
                        onClick={() => setActiveTab("3")}
                        className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "3"
                                ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}

                    >
                        <div className={`${ activeTab === "3"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>

                        تنظیمات کاربر</button>

                </div>

                <div className={`flex flex-col gap-3 min-h-120`}>
                    {isLoading_list
                        ?<Loading />
                        :isError_list
                            ?<Reject />
                            :
                            <form className="mt-7" onSubmit={formik.handleSubmit}>
                                {activeTab==="1" &&
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col w-full gap-2">
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl  p-4">
                                                <Input formik={formik} maxLength={25} name="site_title" label="نام سایت" />
                                            </div>
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl p-4">
                                                <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl p-4">
                                                    <Media
                                                        single={true}
                                                        label="افزودن لوگو ادمین"
                                                        desc="سایز عکس 480x720-px"
                                                        name="site_logo"
                                                        formik={formik}
                                                        formikAddress={formik.values.site_logo}/>
                                                </div>
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
                                        <div className="flex flex-col md:flex-row gap-3  bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl  p-4">
                                            <InputActivate formik={formik} name="allow_admin_to_enter" label="اجازه ورود مدیران" options={options} formikAddress={formik.values.allow_admin_to_enter} />
                                            <Input formik={formik} maxLength={25} name="admin_login_title" label="نام ورود ادمین" />
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-3 ">
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl p-4">
                                                <Media
                                                    single={true}
                                                    label="افزودن لوگو ادمین"
                                                    desc="سایز عکس 480x720-px"
                                                    name="admin_login_logo"
                                                    formik={formik}
                                                    formikAddress={formik.values.admin_login_logo}/>
                                            </div>
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl p-4">
                                                <Media
                                                    single={true}
                                                    label="افزودن اسلایدر ادمین"
                                                    desc="سایز عکس 480x720-px"
                                                    name="admin_slider_logo"
                                                    formik={formik}
                                                    formikAddress={formik.values.admin_slider_logo}/>
                                            </div>
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl p-4">
                                                <Media
                                                    single={true}
                                                    label="افزودن بک گراند ورود ادمین"
                                                    desc="سایز عکس 480x720-px"
                                                    name="admin_login_background"
                                                    formik={formik}
                                                    formikAddress={formik.values.admin_login_background}/>
                                            </div>
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
                                        <div className="flex flex-col md:flex-row gap-3  bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl  p-4">
                                            <InputActivate formik={formik} name="allow_user_to_enter" label="اجازه ورود کاربر" options={options} formikAddress={formik.values.allow_user_to_enter} />
                                            <Input formik={formik} maxLength={25} name="user_login_title" label="نام ورود کاربر" />
                                        </div>
                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg  dark:shadow-gray-600 rounded-xl p-4">
                                            <Media
                                                single={true}
                                                label="افزودن لوگو کاربر"
                                                desc="سایز عکس 480x720-px"
                                                name="user_login_logo"
                                                formik={formik}
                                                formikAddress={formik.values.user_login_logo}/>
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
                                    </div>
                                }
                            </form>
                    }
                </div>
            </div>
        </>

    );
};
export default SettingList;