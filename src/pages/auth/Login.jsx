import { useFormik } from "formik";
import  loginImage from "../../assets/image/login.svg"
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {getAsyncCheck, getAsyncLoginIndex, loginClearResult, postAsyncLogin} from "../../feature/redux/LoginSlice.jsx";
import { useEffect } from "react";
import {useNavigate} from "react-router";
import {Config} from "../../config/Config.jsx";
import InputLogIn from "../../components/inputs/InputLogin.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
import ToastContainer from "../../components/toast/ToastContainer.jsx";


const Login = () => {
    const dispatch = useDispatch();
    const { login,login_index,isLoading_enter } = useSelector(state => state.login);
    const navigation = useNavigate();
    // const location = useLocation();
    // useEffect(() => {
    //     dispatch(getAsyncLoginIndex());
    // },[])

    const initialValues = {
        username: "",
        password: "",
    };

    const onSubmit = (values) => {
        dispatch(postAsyncLogin(values));
    };

    const validationSchema = yup.object({
        username: yup.string()
            .min(4, "نام کاربری حداقل 4 کلمه باشد")
            .max(15, "طول نام کاربری حداکثر 15 کلمه باشد")
            .required("نام کاربری نمی‌تواند خالی باشد"),
        password: yup.string()
            .required("کلمه عبور نمی‌تواند خالی باشد")
            .min(8, "کلمه عبور حداقل 8 کلمه باشد"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnMount: true
    });

    useEffect(() => {
        if (login && login.data) {
            if (login.status === 200) {
                Toast.success(`${login.data.message}`);
                dispatch(loginClearResult());
                setTimeout(() => navigation("/"), 2000);
            } else {
                Toast.error(`${login.data.message}`);
                dispatch(loginClearResult());
            }
        }
    }, [login]);

    return (
        <>
            <div className='relative'>
                <div className='absolute w-full h-px z-50 bg-gray-800'></div>
                <div className='min-h-screen bg-gray-50 w-full flex flex-col md:flex-row'>

                    <div className="w-full min-h-screen flex items-center justify-around bg-gradient-to-r from-cyan-300 to-cyan-600 p-10">
                        <div className="flex flex-col items-center bg-white w-full max-w-md rounded-3xl shadow-xl p-8 ">
                            <span className="text-3xl font-bold text-cyan-600 mb-4">Marktoo</span>
                            <span className="text-2xl font-semibold mb-6 text-gray-700">ورود به حساب کاربری</span>

                            <form className="w-full" onSubmit={formik.handleSubmit}>
                                <div className="flex flex-col gap-5">
                                    <InputLogIn
                                        autoFocusOnMount={true}
                                        formik={formik}
                                        name="username"
                                        label="نام کاربری"
                                        noPersian={true}
                                        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                    />
                                    <InputLogIn
                                        formik={formik}
                                        type="password"
                                        name="password"
                                        label="کلمه عبور"
                                        noPersian={true}
                                        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                    />
                                </div>

                                <button
                                    disabled={!formik.isValid || isLoading_enter}
                                    type="submit"
                                    className={`mt-6 w-full flex justify-center items-center gap-x-2 px-4 py-3 rounded-xl enabled:cursor-pointer disabled:bg-gray-500 bg-cyan-400 hover:bg-cyan-500 text-gray-50 transition transform enabled:hover:scale-105 text-sm shadow-xl`}
                                >
                                    {isLoading_enter ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-gray-50 border-t-transparent rounded-full animate-spin"></span>
                                            <span className='text-lg'>ورود...</span>
                                        </>
                                    ) : (
                                        <span className='text-lg'>ورود</span>
                                    )}
                                </button>
                            </form>

                            <a href="#" className="mt-4 text-sm text-cyan-600 hover:underline">
                                فراموشی کلمه عبور؟
                            </a>
                            <p className="mt-6 text-gray-500 text-sm text-center">
                                حساب کاربری ندارید؟
                                <a href="#" className="text-cyan-500 font-semibold hover:underline"> ثبت نام کنید</a>
                            </p>
                        </div>
                        <div className="hidden lg:flex  items-center justify-center ">
                            <img src={loginImage} alt="login" className="max-w-lg w-full h-auto object-contain" />
                        </div>
                    </div>



                </div>
                <ToastContainer />
            </div>
        </>
    );

};

export default Login;