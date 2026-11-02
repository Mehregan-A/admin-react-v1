import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {set_theme} from "../../feature/redux/ThemeSlice.jsx";
import  loginImage from "../../assets/image/login.svg"
import {LuMoveRight, LuRectangleEllipsis} from "react-icons/lu";
import * as yup from "yup";
import {useFormik} from "formik";

import {Toast} from "../../components/toast/Toast.jsx";
import InputLogIn from "../../components/inputs/InputLogin.jsx";
import {
    authClearResult,
    getAsyncCaptcha,
    getAsyncCheck, loginClearResult,
    postAsyncAuth,
    postAsyncLogin,
    postAsyncVerify, verifyClearResult
} from "../../feature/redux/LoginSlice.jsx";
import Wave1 from "../../assets/image/wave.svg"
import WaveDark from "../../assets/image/Wave2Dark.svg"
import Wave2 from "../../assets/image/wave2.svg"
import Wavedark2 from "../../assets/image/waveDark.svg"
import {PiMoonThin, PiSunDimThin} from "react-icons/pi";
import ToastContainer from "../../components/toast/ToastContainer.jsx";
import CaptchaLogIn from "../captcha/CaptchaLogIn.jsx";
import {useNavigate} from "react-router-dom";

const AuthStep = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {theme}=useSelector(state => state.theme)
    // const router = useRouter()
    const [step, setStep] = useState('login');
    const [timeLeft, setTimeLeft] = useState(180);
    const { login,captcha,isLoading_enter,checkLogin,verify,auth,isLoading_captcha,isLoading_verify,isLoading_auth,open } = useSelector(state => state.login);

    useEffect(() => {
        dispatch(getAsyncCheck());
    }, []);
    useEffect(() => {
        dispatch(getAsyncCaptcha());
    }, [open]);
    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        if (step !== "verify") return;

        setTimeLeft(180);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [step]);
    useEffect(() => {
        if (step === "verify" && timeLeft === 0) {
            formik.setFieldValue("code", "");
            setStep("login");
        }
    }, [timeLeft, step]);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const initialValues = {
        mobile:"",
        hash: "",
        captcha: "",
        gender:"",
        family: "",
        name: "",
        code:""
    }
    const validationSchema = yup.object({
        mobile:
            step === "login"
                ? yup
                    .string()
                    .required("شماره موبایل  نمی تواند خالی باشد")
                    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
                : yup.string(),

        captcha:
            step === "login"
                ? yup
                    .string()
                    .required("کد امنیتی  نمی تواند خالی باشد")
                : yup.string(),

        code:
            step === "verify"
                ? yup
                    .string()
                    .required("کد ورود نمی تواند خالی باشد")
                    .matches(/^\d{6}$/, "کد ورود باید 6 رقم باشد")
                : yup.string(),

        name:
            step === "auth"
                ? yup
                    .string()
                    .required("نام نمی تواند خالی باشد")
                    .min(2, "حداقل ۲ کاراکتر وارد کنید")
                    .max(50, "حداکثر ۵۰ کاراکتر مجاز است")
                : yup.string(),
        family:
            step === "auth"
                ? yup
                    .string()
                    .required("نام خانوادگی نمی تواند خالی باشد")
                    .min(2, "حداقل ۲ کاراکتر وارد کنید")
                    .max(50, "حداکثر ۵۰ کاراکتر مجاز است")
                : yup.string(),
    });
    const onSubmit = async (values) => {
        values["hash"] = captcha?.hash;
        if (step === "login") {
            dispatch(postAsyncLogin(values));
        }
        if (step === "verify") {
            dispatch(postAsyncVerify({mobile: values.mobile, code: values.code}));
            return;
        }

    };


    useEffect(() => {
        if (verify && verify.data) {
            if (verify.status === 200) {
                if (verify?.data?.success == true) {
                    Toast.success(`${verify.data.message}`);
                    navigate("/");
                }
            } else {
                Toast.error(`${verify.data.message}`);
                dispatch(verifyClearResult());
            }
        }
    }, [verify]);


    useEffect(() => {
        if (login && login.data) {
            if (login.status === 200) {
                Toast.success(`${login.data.message}`);
                dispatch(loginClearResult());
                formik.setFieldValue("captcha", "");
                setStep("verify");
            } else {
                Toast.error(`${login?.data?.message}`);
                if(login?.data?.message=="کد کپچا ارسالی اشتباه است"){
                    dispatch(getAsyncCaptcha());
                }
                dispatch(loginClearResult());
            }
        }
    }, [login]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true
    })
    return (
        <div className="relative">

            <div className="relative min-h-screen bg-gray-50 w-full flex flex-col md:flex-row overflow-hidden">
                <button
                    onClick={() => dispatch(set_theme(!theme))}
                    className="fixed top-5 right-5 z-50 bg-gray-50  dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                    {theme ? <PiMoonThin className='text-cyan-400' size={20} /> : <PiSunDimThin className='text-orange-500' size={20}/>}
                </button>

                <div className="relative w-full min-h-screen flex items-center justify-around bg-gray-50 dark:bg-gray-800 p-10">

                    <img
                        src={Wave1}
                        alt="wave background"
                        className="absolute bottom-0 left-0 w-2xl pointer-events-none select-none dark:hidden"
                    />
                    <img
                        src={WaveDark}
                        alt="wave background"
                        className="absolute bottom-0 left-0 w-2xl pointer-events-none select-none hidden dark:block"
                    />
                    <img
                        src={Wave2}
                        alt="wave background"
                        className="absolute top-0 right-0 w-2xl pointer-events-none select-none dark:hidden"
                    />

                    <img
                        src={Wavedark2}
                        alt="wave background"
                        className="absolute top-0 right-0 w-2xl pointer-events-none select-none hidden dark:block"
                    />


                    {step === "login"  && <StepLogin formik={formik}  data={captcha} isLoading={isLoading_enter} isLoading_captcha={isLoading_captcha}/>}
                    {step === "verify"  && (<StepVerify dispatch={dispatch} formik={formik} isloading={isLoading_verify} timeLeft={timeLeft} formatTime={formatTime} setStep={setStep}/>)}
                    {/*{step === "auth"  && <StepAuth isLoading={isLoading_auth} formik={formik}/>}*/}



                    <div className="hidden w-2/6 lg:flex items-center justify-center">
                        <img src={loginImage} alt="login" className="max-w-2xl w-full h-auto object-contain" />
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>

    );

};

export default AuthStep;

const StepLogin = ({formik,data,isLoading,isLoading_captcha}) => {
    return (
        <div className="relative flex flex-col items-center bg-white dark:bg-gray-700 w-full max-w-md rounded-3xl shadow-xl p-8 z-10">
            <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">Marktoo</span>
            <span className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-100">ورود/ثبت نام</span>

            <form className="w-full flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6">
                    <InputLogIn
                        maxLength={11} minLength={11} onlyNum={true} placeholder="۰۹۱۲XXXXXXX" dir="ltr"
                        autoFocusOnMount={true}
                        formik={formik}
                        name="mobile"
                        label="شماره تلفن همراه"
                        noPersian={true}
                        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    />
                    <CaptchaLogIn data={data} isLoading_captcha={isLoading_captcha}/>
                    <InputLogIn
                        formik={formik}
                         maxLength={6} minLength={6} name="captcha"
                        label="کد امنیتی را وارد کنید"
                        noPersian={true}
                        dir="ltr"
                        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    />
                </div>

                <button
                    disabled={!formik.isValid || isLoading}
                    type="submit"
                    className={`mt-6 w-full flex justify-center items-center gap-x-2 px-4 py-3 rounded-xl enabled:cursor-pointer disabled:bg-gray-500 bg-cyan-400 hover:bg-cyan-500 text-gray-50 transition transform enabled:hover:scale-105 text-sm shadow-xl`}
                >
                    {isLoading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>در حال ارسال کد...</span>
                        </>
                    ) : (
                        <span>ارسال کد</span>
                    )}
                </button>
            </form>
        </div>

    )
}


const StepVerify = ({formik, timeLeft, formatTime,setStep,isloading,dispatch}) => {
    return (
        <div className="relative flex flex-col items-center bg-white dark:bg-gray-700 w-full max-w-md rounded-3xl shadow-xl p-8 z-10">
            <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">Marktoo</span>
                <div className="text-center mb-6 w-full">
                    <div className=" mx-auto rounded-full goldGradient flex items-center justify-center mb-3">
                        <LuRectangleEllipsis className="text-cyan-600 dark:text-cyan-400" size={40}/>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">کد ارسالی را وارد کنید</p>


                    <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-3 rounded-lg text-gray-800 mt-3">
                        <span>شماره موبایل: </span>
                        <span>{formik.values.mobile}</span>
                    </div>

                    <div className="mt-4">
                        {timeLeft > 0 ? (
                            <div className="text-cyan-600 dark:text-cyan-400 font-bold text-xl">
                                {formatTime(timeLeft)}
                            </div>
                        ) : (
                            <div>کد منقضی شده</div>
                        )}
                    </div>
                </div>

                <form className="flex flex-col gap-5 w-full" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <InputLogIn
                            formik={formik}
                            onlyNum={true}
                            maxLength={6}
                            minLength={6}
                            name="code"
                            placeholder="کد ورود"
                            dir="ltr"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`mt-6 w-full flex justify-center items-center gap-x-2 px-4 py-3 rounded-xl enabled:cursor-pointer disabled:bg-gray-500 bg-cyan-400 hover:bg-cyan-500 text-gray-50 transition transform enabled:hover:scale-105 text-sm shadow-xl`}
                        disabled={isloading || !formik.isValid}
                    >
                        {isloading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                <span>در حال ورود ...</span>
                            </>
                        ) : (
                            <span>ورود</span>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setStep("login");
                            dispatch(getAsyncCaptcha());
                        }}
                        className="mt-6 w-full flex justify-center items-center gap-x-2 px-4 py-3 rounded-xl cursor-pointer  bg-cyan-400 hover:bg-cyan-500 text-gray-50 transition transform hover:scale-105 text-sm shadow-xl"
                    >
                        <LuMoveRight />
                        <span>تغییر شماره تلفن</span>
                    </button>
                </form>
        </div>


    );
};
//
//
// const StepAuth = ({formik,isLoading}) => {
//     return (
//         <div>
//             <div className="text-center mb-6">
//                 <div className="w-16 h-16 mx-auto rounded-full goldGradient flex items-center justify-center mb-3">
//                     <UserRoundPlus className="text-primary-light" size={25}/>
//                 </div>
//                 <h3 className="text-lg font-bold text-primary-light dark:text-primary-gold">ورود/ثبت نام</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">لطفاً اطلاعات خود را وارد کنید</p>
//             </div>
//             <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
//                 <div className="flex flex-col gap-4">
//                     <div>
//                         <label className="text-primary-light font-semibold dark:text-primary-gold">نام</label>
//                         <Input formik={formik} name="name" maxLength={50} minLength={2} type="text" placeholder="مثال:علی" className="form-input" required=""/>
//                     </div>
//                     <div>
//                         <label className="text-primary-light font-semibold dark:text-primary-gold">نام خانوادگی</label>
//                         <Input formik={formik} name="family" maxLength={50} minLength={2} type="text" placeholder="مثال:محمدی" className="form-input" required=""/>
//
//</div>
//                     <div>
//                         <label className="text-primary-light font-semibold dark:text-primary-gold">جنسیت</label>
//                         <SelectOption options={gender} formik={formik} name="gender" maxLength={50} minLength={2} type="text" className="form-input" required=""/>
//                     </div>
//
//                 </div>
//                 <button
//                     type="submit"
//                     className={`w-full flex justify-center items-center gap-x-2 px-6 py-2.5 enabled:cursor-pointer disabled:bg-gray-500 bg-primary-light rounded-lg hover:bg-primary-light/90 text-gray-50 text-sm transition-colors`}
//                     disabled={isLoading || !formik.isValid}
//                 >
//                     {isLoading ? (
//                         <>
//                             <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                             <span>در حال  ثبت اطلاعات ...</span>
//                         </>
//                     ) : (
//                         <span> ثبت اطلاعات</span>
//                     )}
//                 </button>
//             </form>
//         </div>
//     )
// }