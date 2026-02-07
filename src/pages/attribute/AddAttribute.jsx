import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark, HiPencilSquare} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {Toast} from "../../components/toast/Toast.jsx";
import {adminClearResult, postAsyncAddAdmin, putAsyncEditAdmin} from "../../feature/redux/AdminSlice.jsx";
import {data_type, filter, gender, is_spec, options, optionsActive, role} from "../../assets/data/Data.js";
import Loading from "../../components/loading/Loading.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import InputRadioButton from "../../components/inputs/InputRadioButton.jsx";
import {
    attributeClearResult,
    postAsyncAddAttribute,
    putAsyncEditAttribute
} from "../../feature/redux/AttributeSlice.jsx";


const AddAttribute = ({Id,list_attribute,open_close,reload,open_slider}) => {
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

    const {result,isLoading} = useSelector(state => state.attribute);
    // redux
    const foundItem = list_attribute?.find(item => item.id === Id);

    const dispatch = useDispatch();
    // formik
    const initialValues = {
        title: "",
        data_type: "",
        is_filter: "1",
        is_spec: "1",
        status : ""
    }

    const validationSchema = (isEditMode) => yup.object({
        // name: yup
        //     .string()
        //     .required('وارد کردن نام الزامی است')
        //     .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
        //     .max(25, 'نام نباید بیشتر از 25 کاراکتر باشد'),
        //
        // family: yup
        //     .string()
        //     .required('وارد کردن نام خانوادگی الزامی است')
        //     .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
        //     .max(25, 'نام خانوادگی نباید بیشتر از 25 کاراکتر باشد'),
        //
        // mobile: yup
        //     .string()
        //     .required('شماره موبایل الزامی است')
        //     .matches(
        //         /^09(0[1-5]|1[0-9]|2[0-2]|3[0-9]|9[0-4])\d{7}$/,
        //         'شماره موبایل معتبر نیست'
        //     ),
        //
        // username: yup
        //     .string()
        //     .required('نام کاربری الزامی است')
        //     .min(4, 'نام کاربری باید حداقل 4 کاراکتر باشد')
        //     .max(25, 'نام کاربری نباید بیشتر از 25 کاراکتر باشد')
        //     .matches(
        //         /^[^A-Z]*$/,
        //         'نام کاربری  شامل حروف بزرگ نباشد'
        //     )
        //     .matches(
        //         /[a-z]/,
        //         'کلمه عبور باید حداقل شامل یک حرف کوچک باشد'
        //     ),
        // password: yup.string().when([], {
        //     is: () => !isEditMode,
        //     then: schema =>
        //         schema
        //             .required('وارد کردن کلمه عبور الزامی است')
        //             .min(8, 'حداقل شامل ۸ کاراکتر باشد')
        //             .max(20, 'کلمه عبور نباید بیشتر از 20 کاراکتر باشد')
        //             .matches(
        //                 /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
        //                 'حروف فارسی مجاز نیست'
        //             )
        //             .matches(
        //                 /[A-Z]/,
        //                 'کلمه عبور باید حداقل شامل یک حرف بزرگ باشد'
        //             )
        //             .matches(
        //                 /[0-9]/,
        //                 'کلمه عبور باید حداقل شامل یک عدد باشد'
        //             )
        //             .matches(
        //                 /[a-z]/,
        //                 'کلمه عبور باید حداقل شامل یک حرف کوچک باشد'
        //             )
        //             .matches(
        //                 /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        //                 'کلمه عبور شامل یک کاراکتر خاص باشد(@#$!...)'
        //             ),
        //     otherwise: schema => schema.notRequired(),
        // }),

    });

    const onSubmit = (values) => {
        if (Id) {
            dispatch(putAsyncEditAttribute(values));
        } else {
            dispatch(postAsyncAddAttribute(values));
        }
    };

    const formik = useFormik({
        initialValues:  foundItem || initialValues,
        validationSchema: validationSchema(!!Id),
        onSubmit,
        validateOnMount : true
    })
    console.log(formik.values)

    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                dispatch(attributeClearResult())
                open_close()
                reload()
            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(attributeClearResult())
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
                                <HiOutlinePencilAlt className="w-5 h-5" />
                                <span className="text-sm">{Id ? "ویرایش ویژگی" : "ثبت ویژگی"}</span>
                            </div>
                        </div>
                        <div className='w-full h-px bg-cyan-300'></div>
                        <form onSubmit={formik.handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-2 space-y-5">
                            <div className="flex flex-col md:flex-row md:gap-4 gap-6">
                                {/* Inputs */}
                                <div className="w-full grid grid-cols-1 items-center justify-center gap-4">
                                    <Input formik={formik} name="title" onlyChar={true} maxLength={25} label="نام ویژگی" />
                                    <SelectOption formik={formik} name="data_type" formikAddress={formik.values.data_type} options={data_type} label="نوع ویژگی" />
                                    <InputRadioButton
                                        formik={formik}
                                        name="is_filter"
                                        label="فیلتر بر جست و جو:"
                                        list={filter}
                                    />
                                    <InputRadioButton
                                        formik={formik}
                                        name="is_spec"
                                        label="نمایش در مشخصات:"
                                        list={is_spec}
                                    />
                                </div>

                                <div className="w-full md:w-[200px] flex flex-col justify-end gap-4 md:mt-2.5 md:gap-7">

                                    <div className="flex items-center justify-center">
                                        <InputCheckbox
                                            formik={formik}
                                            name="status"
                                            label="ویژگی فعال باشد؟"
                                            value={true}
                                        />
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
                                            <span>در حال {Id ? "ویرایش" : "ثبت"}...</span>
                                        </>
                                    ) : (
                                        <span>{Id ? "ویرایش" : "ثبت"}</span>
                                    )}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAttribute;