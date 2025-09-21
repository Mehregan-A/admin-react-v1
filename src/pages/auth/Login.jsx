import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {getAsyncCheck, getAsyncLoginIndex, loginClearResult, postAsyncLogin} from "../../feature/redux/LoginSlice.jsx";
import { useEffect } from "react";
import {useNavigate} from "react-router";
import {Config} from "../../config/Config.jsx";


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
            <div className='w-full h-screen bg-white dark:bg-gray-800 '>

            </div>
        </>
    );
};

export default Login;