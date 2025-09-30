import {useEffect, useRef, useState} from 'react';
import {useFormik} from "formik";
// import Input from "../../components/input/Input.jsx";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark, HiPencilSquare} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {getAsyncListAttribute} from "../../feature/redux/AttributeSlice.jsx";
import {PiChartPieSlice} from "react-icons/pi";
import SelectOption from "../../components/inputs/SelectOption.jsx";


const AttributeCategory = ({Id,list_category,open_close,reload,open_slider}) => {
    const dispatch = useDispatch();
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
    useEffect(() => {
        dispatch(getAsyncListAttribute())
    },[])

    const {result,isLoading} = useSelector(state => state.category);
    const {list_attribute} = useSelector(state => state.attribute);

    // redux
    const foundItem = list_category?.find(item => item.id === Id);
    const initialValues = {
        value:'',
    }
    const validationSchema = yup.object({

    });
    const onSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues:  foundItem || initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true
    })
    //
    // useEffect(() => {
    //     if(result && result?.status){
    //         if(result.status === 200) {
    //             // toast
    //             Toast.success(`${result.data.message}`);
    //             open_close()
    //             reload()
    //             dispatch(categoryClearResult())
    //
    //         }else{
    //             // toast
    //             Toast.error(`${result.data.message}`);
    //             dispatch(categoryClearResult())
    //         }
    //     }
    // }, [result]);
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
                                <PiChartPieSlice className="w-5 h-5" />
                                <span className="text-sm">{"ویژگی دسته"}</span>
                            </div>
                        </div>
                        <div className='w-full h-px bg-cyan-300'></div>
                        <form onSubmit={formik.handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-2 space-y-5">
                            <div className="flex flex-col inset-shadow-sm dark:bg-gray-700/80 inset-shadow-cyan-300 bg-cyan-50 rounded-2xl h-60 md:flex-row md:gap-4 gap-6 p-4">

                                <div className="flex gap-2">
                                    {foundItem.attribute.map((att) =>
                                        <div className='dark:bg-gray-800 dark:text-gray-100 bg-gray-50 drop-shadow-xl dark:drop-shadow-none dark:drop-shadow-gray-500 p-2 rounded-xl h-10' key={att.value}>{att.label}</div>
                                    )}
                                </div>

                            </div>
                            <div className="w-full flex flex-col items-center justify-center gap-10">
                                <SelectOption formik={formik} options={list_attribute} name="value"  label="ویژگی جدبد" />
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

export default AttributeCategory;