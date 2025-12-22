import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark, HiPencilSquare} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {Toast} from "../../components/toast/Toast.jsx";
import {adminClearResult, postAsyncAddAdmin, putAsyncEditAdmin} from "../../feature/redux/AdminSlice.jsx";
import {gender, optionsActive, role} from "../../assets/data/Data.js";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import DataTable from "../../components/dataTable/DataTable.jsx";
import {FaMagnifyingGlass, FaXmark} from "react-icons/fa6";
import {
    attributeValClearSearch,
    getAsyncAddAttributeVal,
    postAsyncSearchAttributeVal
} from "../../feature/redux/AttributeValueSlice.jsx";
import {postAsyncSearchAmazingProduct} from "../../feature/redux/AmazingProductSlice.jsx";


const AddProductAmazing = ({id,list_admin,open_close,reload,open_slider}) => {
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

    const {result,isLoading,isLoading_search,search} = useSelector(state => state.amazingProduct);
    // redux
    // const foundItem = list_admin?.find(item => item.id === id);
    const dispatch = useDispatch();
    // formik
    const initialValues = {
       search:""
    }

    const validationSchema = (isEditMode) => yup.object({
        name: yup
            .string()
            .required('وارد کردن نام الزامی است')
            .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
            .max(25, 'نام نباید بیشتر از 25 کاراکتر باشد'),

        family: yup
            .string()
            .required('وارد کردن نام خانوادگی الزامی است')
            .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
            .max(25, 'نام خانوادگی نباید بیشتر از 25 کاراکتر باشد'),

        mobile: yup
            .string()
            .required('شماره موبایل الزامی است')
            .matches(
                /^09(0[1-5]|1[0-9]|2[0-2]|3[0-9]|9[0-4])\d{7}$/,
                'شماره موبایل معتبر نیست'
            ),

        username: yup
            .string()
            .required('نام کاربری الزامی است')
            .min(4, 'نام کاربری باید حداقل 4 کاراکتر باشد')
            .max(25, 'نام کاربری نباید بیشتر از 25 کاراکتر باشد')
            .matches(
                /^[^A-Z]*$/,
                'نام کاربری  شامل حروف بزرگ نباشد'
            )
            .matches(
                /[a-z]/,
                'کلمه عبور باید حداقل شامل یک حرف کوچک باشد'
            ),
        password: yup.string().when([], {
            is: () => !isEditMode,
            then: schema =>
                schema
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
                        'کلمه عبور شامل یک کاراکتر خاص باشد(@#$!...)'
                    ),
            otherwise: schema => schema.notRequired(),
        }),

    });

    const onSubmit = (values) => {
        if(values.search && values.search.trim() !== "") {
            dispatch(postAsyncSearchAmazingProduct({ search: values.search }));
        }
    };

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema: validationSchema(!!id),
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
    const removeSearch = () => {
        formik.setFieldValue("search", "");
        dispatch(attributeValClearSearch());
    };
    console.log(search);


    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit} className="flex w-full items-center gap-2">
                    <div className="w-full relative">
                        <Input
                            formik={formik}
                            type="search"
                            name="search"
                            maxLength={30}
                            minLength={1}
                            label=""
                            formikAddress={formik.values.search}
                            placeholder={""}
                        />

                        <FaMagnifyingGlass className="absolute right-1.5 -translate-y-6.5 text-sm text-gray-400" />

                        {/* clean search */}
                        <button
                            tabIndex={-1}
                            type="button"
                            onClick={removeSearch}
                            className="absolute left-2 -translate-y-7 text-cyan-300 cursor-pointer"
                        >
                            <FaXmark size={20} />
                        </button>
                    </div>

                    {/* search button */}
                    <button
                        disabled={!formik.values.search || isLoading_search}
                        type="submit"
                        className=" w-32 flex justify-center items-center gap-x-1 mt-1  px-2 md:py-2.5 py-2 rounded-lg md:rounded-lg disabled:bg-gray-500 bg-cyan-300 hover:bg-cyan-400 enabled:cursor-pointer text-gray-200 transition-colors"
                    >
                        {isLoading_search ? (
                            <>
                                <span className="text-xs md:text-sm text-gray-50">جست و جو</span>
                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            </>
                        ) : (
                            <span className="text-xs md:text-sm text-gray-50">جست و جو</span>
                        )}
                    </button>
                </form>
                {/*<DataTable*/}
                {/*    icon={''}*/}
                {/*    isLoading={isLoading_list}*/}
                {/*    isError={isError_list}*/}
                {/*    title=""*/}
                {/*    data={list_category?.data}*/}
                {/*    numberPage={list_category?.page}*/}
                {/*    columns={columns}*/}
                {/*/>*/}

            </div>
        </>
    );
};

export default AddProductAmazing;