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
import {getAsyncListRules, postAsyncEditRules} from "../../feature/redux/RulesSlice.jsx";
import {NilfamEditor} from "nilfam-editor";


const ListRules = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("1");
    const location = useLocation();
    const {theme}=useSelector(state => state.theme)
    useEffect(() => {
        if (location.pathname === "/rules") {
            dispatch(getAsyncListRules())
        }
    },[location.pathname])

    const {result,isLoading,list_rules,isLoading_list,isError_list} = useSelector(state => state.rules);
    // redux
    const initialValues = {
        privacy_policy: "",
        return_policy: "",
        purchase_and_payment_guideterms_and_conditions: "",
        shipping_method: "",
    }
    const validationSchema = yup.object({
    });

    const onSubmit = (values) => {
        console.log(values)
        dispatch(postAsyncEditRules(values));
    };

    const formik = useFormik({
        initialValues: list_rules ||  initialValues,
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
                    <div className='flex justify-start gap-2 p-5'>
                        <div className="text-gray-400 dark:text-gray-300">  داشبورد   |  </div>
                        <div className="text-cyan-700 dark:text-cyan-400">قوانین </div>
                    </div>
                </div>
                <div className="w-full  p-1.5 flex flex-col md:flex-row gap-3 bg-gray-100 dark:bg-gray-700 dark:shadow-cyan-200 dark:shadow-md   rounded-xl shadow-lg items-center">
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
                        راهنمای خرید و پرداخت
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
                         حفظ حریم خصوصی</button>
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

                        سیاست بازگشت</button>
                    <button
                        onClick={() => setActiveTab("4")}
                        className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "4"
                                ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}

                    >
                        <div className={`${ activeTab === "4"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>

                        راهنمای خرید و پرداخت شرایط و ضوابط</button>
                    <button
                        onClick={() => setActiveTab("5")}
                        className={`w-full relative flex justify-center items-center rounded-xl p-3 md:text-[15px] text-xs cursor-pointer transition-colors 
              ${
                            activeTab === "5"
                                ? "bg-gray-50 shadow-lg dark:shadow-cyan-200 dark:shadow-md shadow-gray-400/60 font-semibold dark:bg-gray-800/50 dark:text-gray-100"
                                : "dark:text-gray-100"
                        }`}

                    >
                        <div className={`${ activeTab === "5"?"w-12":"w-0"} absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 bg-cyan-400 dark:bg-gray-300`}></div>

                        روش ارسال</button>
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
                                            <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                                <NilfamEditor value={formik.values.purchase_and_payment_guide} isDark={theme} lang="fa"
                                                              onChange={newContent => formik.setFieldValue("purchase_and_payment_guide", newContent)} />
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
                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                            <NilfamEditor value={formik.values.privacy_policy} isDark={theme} lang="fa"
                                                          onChange={newContent => formik.setFieldValue("privacy_policy", newContent)} />
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
                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                            <NilfamEditor value={formik.values.return_policy} isDark={theme} lang="fa"
                                                          onChange={newContent => formik.setFieldValue("return_policy", newContent)} />
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
                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                            <NilfamEditor value={formik.values.purchase_and_payment_guideterms_and_conditions} isDark={theme} lang="fa"
                                                          onChange={newContent => formik.setFieldValue("purchase_and_payment_guideterms_and_conditions", newContent)} />
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setActiveTab("5")}
                                                className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                                            >
                                                ادامه
                                            </button>
                                        </div>
                                    </div>
                                }
                                {activeTab==="5" &&
                                    <div className="flex flex-col gap-6">
                                        <div className="flex w-full flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-cyan-300 dark:shadow-cyan-500 rounded-xl  p-4">
                                            <NilfamEditor value={formik.values.shipping_method} isDark={theme} lang="fa"
                                                          onChange={newContent => formik.setFieldValue("shipping_method", newContent)} />
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
export default ListRules;