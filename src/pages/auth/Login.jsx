import { useFormik } from "formik";
import  loginImage from "../../assets/image/login.svg"
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {getAsyncCheck, getAsyncLoginIndex, loginClearResult, postAsyncLogin} from "../../feature/redux/LoginSlice.jsx";
import { useEffect } from "react";
import {useNavigate} from "react-router";
import {Config} from "../../config/Config.jsx";
import InputLogIn from "../../components/inputs/InputLogin.jsx";


const Login = () => {
    const dispatch = useDispatch();
    // const { login,login_index,isLoading_enter } = useSelector(state => state.login);
    const navigation = useNavigate();
    // const location = useLocation();
    useEffect(() => {
        dispatch(getAsyncLoginIndex());
    },[])

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

    // useEffect(() => {
    //     if (login && login.data) {
    //         if (login.status === 200) {
    //             Toast.success(`${login.data.message}`);
    //             dispatch(loginClearResult());
    //             setTimeout(() => navigation("/"), 2000);
    //         } else {
    //             Toast.error(`${login.data.message}`);
    //             dispatch(loginClearResult());
    //         }
    //     }
    // }, [login]);

    return (
        <>
            <div className='relative'>
                <div className='absolute  w-full h-px z-50 bg-gray-800 '></div>
                <div className='h-screen bg-gray-50 w-full flex'>
                    <div className='w-3/7 h-screen items-center flex justify-end flex-col bg-cyan-100 '>
                        <img src={loginImage} className='w-6xl'/>
                    </div>
                    <div className='w-4/7 h-screen  flex justify-center'>
                        <div className="flex flex-col items-center my-auto bg-white w-7/15 h-6/8 drop-shadow-xl drop-shadow-gray-200  rounded-3xl px-20">
                            <span>logo</span>
                            <span className="text-xl font-bold">ورود</span>
                            <form className='w-full' onSubmit={formik.handleSubmit}>
                                <div className='w-full flex flex-col gap-4'>
                                    <InputLogIn autoFocusOnMount={true} formik={formik} name="username" label="نام کاربری" noPersian={true} />
                                    <InputLogIn formik={formik} type="password" name="password" label="کلمه عبور" noPersian={true} />
                                </div>
                                <button type="submit" className="bubbly-button m-2 bg-cyan-400 text-gray-50 rounded-xl p-2 w-full cursor-pointer drop-shadow-xl drop-shadow-cyan-300">ورود</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
};

export default Login;