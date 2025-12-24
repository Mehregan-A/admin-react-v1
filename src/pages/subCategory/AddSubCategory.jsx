import {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {Toast} from "../../components/toast/Toast.jsx";
import {

    getAsyncSelectCategory,

} from "../../feature/redux/CategorySlice.jsx";
import InputImageUpload from "../../components/inputs/InputImageUpload.jsx";
import InputCheckbox from "../../components/inputs/InputCheckbox.jsx";
import Input from "../../components/inputs/Input.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {
    postAsyncAddSubCategory,

    SubcategoryClearResult, updateAsyncEditSubCategory
} from "../../feature/redux/CategorySubSlice.jsx";


const AddSubCategory = ({Id,list_sub_category,open_close,reload,open_slider}) => {
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

    const {result,isLoading} = useSelector(state => state.subcategory);
    const {list_category_select} = useSelector(state => state.category);
    useEffect(() => {
        dispatch(getAsyncSelectCategory())
    }, []);
    // redux
    const foundItem = list_sub_category?.find(item => item.id === Id);
    const dispatch = useDispatch();
    const initialValues = {
        category_id:"" ,
        title: "",
        url: "",
        status : ""
    }
    const validationSchema = yup.object({
        title: yup
            .string()
            .required('عنوان مقاله الزامی است')
            .min(2, 'عنوان باید حداقل 2 کاراکتر باشد')
            .max(100, 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
        url: yup
            .string()
            .required('آدرس URL الزامی است')
            .max(100, 'آدرس نباید بیشتر از ۱۰۰ کاراکتر باشد'),

    });
    const onSubmit = (values) => {
        if (Id) {
            dispatch(updateAsyncEditSubCategory(values));
        } else {
            dispatch(postAsyncAddSubCategory(values));
        }
    };

    const formik = useFormik({
        initialValues:  foundItem || initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true
    })

    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                open_close()
                reload()
                dispatch(SubcategoryClearResult())

            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(SubcategoryClearResult())
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
                                <span className="text-sm">{Id ? "ویرایش اطلاعات زیر دسته" : "ثبت اطلاعات  زیر دسته"}</span>
                            </div>
                        </div>
                        <div className='w-full h-px bg-cyan-300'></div>
                        <form onSubmit={formik.handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-2 space-y-5">
                            <div className="flex flex-col md:gap-4 gap-6">
                                {/* Inputs */}
                                <div className="w-full flex flex-col items-center justify-center gap-10">
                                    <Input formik={formik} maxLength={100} name="title" label="نام زیر دسته" />
                                    <Input formik={formik} maxLength={100} name="url" noPersian={true} label="url" />
                                    <SelectOption
                                        formik={formik}
                                        options={list_category_select}
                                        name="category_id"
                                        label="انتخاب دسته"
                                    />
                                </div>
                                <div className="w-full flex justify-end gap-4 md:gap-7">
                                    <div className="flex items-center justify-center">
                                        <InputCheckbox
                                            formik={formik}
                                            name="status"
                                            label="دسته فعال باشد؟"
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

export default AddSubCategory;