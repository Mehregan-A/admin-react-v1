import {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark} from "react-icons/hi2";
import {Toast} from "../../components/toast/Toast.jsx";
import {adminClearResult, putAsyncPassword} from "../../feature/redux/AdminSlice.jsx";
import Input from "../../components/inputs/Input.jsx";
import {PiLockKeyOpenLight} from "react-icons/pi";


const PasswordAdmin = ({id,open_close,reload,open_slider}) => {
    const myElementRef = useRef(null);
    // transitions for open & close
    const [isOpenModal, setIsOpenModal] = useState(false);
    useEffect(() => {
        if (open_slider){
            setTimeout(() => {
                setIsOpenModal(true)
            }, 300);
        }
    })
    function closeModal() {
        setIsOpenModal(false)

        setTimeout(() => {
            open_close();
        }, 300);
    }

    const {result,isLoading} = useSelector(state => state.admin);
    // redux
    const dispatch = useDispatch();
    // formik
    const initialValues = {
        password: "",
        password_check:""
    }
    const validationSchema = yup.object({
        password: yup
            .string()
            .required('وارد کردن کلمه عبور الزامی است')
            .min(8, 'حداقل شامل ۸ کاراکتر باشد')
            .max(20, 'کلمه عبور نباید بیشتر از 20 کاراکتر باشد')
            .matches(
                /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                'حروف فارسی مجاز نیست'
            )
            .matches(
                /[A-Z]/,
                'کلمه عبور باید حداقل شامل یک حرف بزرگ باشد'
            )
            .matches(
                /[0-9]/,
                'کلمه عبور باید حداقل شامل یک عدد باشد'
            )
            .matches(
                /[a-z]/,
                'کلمه عبور باید حداقل شامل یک حرف کوچک باشد'
            )
            .matches(
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                'کلمه عبور باید حداقل شامل یک کاراکتر خاص باشد(@#$!)'
            ),

        password_check: yup
            .string()
            .trim()
            .required("تکرار رمز عبور الزامی است")
            .oneOf([yup.ref("password")], "رمز عبور با تکرار آن مطابقت ندارد"),
    });

    const onSubmit = (values) => {
        if (id) {
            dispatch(putAsyncPassword({ id, values }));
        }
    };

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true
    })

    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                dispatch(adminClearResult())
                open_close()
                reload()
            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(adminClearResult())
            }
        }
    }, [result]);
    //prevent to scroll
    useEffect(() => {
        const scrollBar = document.querySelector('.scroll-bar');
        const scrollBarStyle = document.querySelector('.scroll-bar-style');

        if (isOpenModal) {
            document.body.style.overflow = 'hidden';
            scrollBar?.classList.remove('scroll-bar');
            scrollBarStyle?.classList.remove('scroll-bar-style');
        } else {
            document.body.style.overflow = '';
            scrollBar?.classList.add('scroll-bar');
            scrollBarStyle?.classList.add('scroll-bar-style');
        }

        return () => {
            document.body.style.overflow = '';
            scrollBar?.classList.add('scroll-bar');
            scrollBarStyle?.classList.add('scroll-bar-style');
        };
    }, [isOpenModal]);
    // click outside element
    useEffect(() => {
        function handleClickOutside(event) {
            if (myElementRef.current && !myElementRef.current.contains(event.target)) {
                closeModal()
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [myElementRef]);
    return (
    <>
        <div className="fixed inset-0 z-20 flex items-center justify-center overflow-auto p-4">
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 z-0 ${isOpenModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div ref={myElementRef} className="flex flex-col gap-2 w-full items-center">

                {/* Form */}
                <div className={`relative md:max-w-2xl w-full rounded-tr-4xl dark:shadow-gray-600 rounded-bl-4xl shadow-lg bg-gray-50 dark:bg-gray-800 transform transition-all duration-300 ease-in-out p-4 pt-1 ${isOpenModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} z-10`}>
                    <div className="h-8 flex items-center justify-between text-gray-800 m-2">
                        <button
                            className="cursor-pointer hover:text-cyan-300 dark:text-gray-200 transition-colors"
                            onClick={closeModal}
                        >
                            <HiMiniXMark className="w-6 h-6 cursor-pointer" />
                        </button>
                        <div className="flex gap-2 items-center dark:text-gray-200 rounded-3xl">
                            <PiLockKeyOpenLight className="w-5 h-5" />
                            <span className="text-sm">تغییر رمز عبور</span>
                        </div>
                    </div>
                    <div className='w-full h-px bg-cyan-300'></div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-6 p-5 pb-5 text-blue-950 ">
                            <Input formik={formik} name="password" type="password" maxLength={20}  minLength={8} label="رمز عبور جدید" noPersian={true} />
                            <Input formik={formik} name="password_check" type="password" maxLength={20}  minLength={8} label="تکرار رمز عبور جدید" noPersian={true} />

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
                                            <span>در حال {id ? "ویرایش" : "ثبت"}...</span>
                                        </>
                                    ) : (
                                        <span>{id ? "ویرایش" : "ثبت"}</span>
                                    )}
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );


};

export default PasswordAdmin;