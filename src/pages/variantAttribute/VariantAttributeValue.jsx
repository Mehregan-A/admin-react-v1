import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import Input from "../../components/inputs/Input.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
import {BsListUl} from "react-icons/bs";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {BiSolidError} from "react-icons/bi";
import {
    deleteAsyncVariantAttributeVal,
    getAsyncListVariantAttributeVal,
    postAsyncAddVariantAttributeVal, variantAttributeValClearDelete, variantAttributeValClearResult
} from "../../feature/redux/VariantAttributeValueSlice.jsx";

const VariantAttributeValue = ({ Id, variantAttribute_list, open_close, reload, open_slider }) => {
    const dispatch = useDispatch();
    const myElementRef = useRef(null);
    const  [Color, setColor] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        if (open_slider) {
            setTimeout(() => setIsOpenModal(true), 300);
        }
    }, [open_slider]);

    function closeModal() {
        setIsOpenModal(false);
        setTimeout(() => open_close(), 300);
    }


    useEffect(() => {
        dispatch(getAsyncListVariantAttributeVal({Id}));
    }, []);

    const { list_variant_attribute_val,isLoading,isError_list,result,result_delete,isLoading_list,isLoading_action } = useSelector(state => state.variantAttributeValue);


    const initialValues = {
        label:'',
        value:''
    };

    const onSubmit = (values) => {
            dispatch(postAsyncAddVariantAttributeVal({ label: values.label , value:values.value, Id }));
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit,
        validateOnMount: true
    });


    const handleRemoveAttribute = (value) => {
        if(Id){
            dispatch(deleteAsyncVariantAttributeVal({ del: Id, variant_option_id: value }));
        }
    };
    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                dispatch(variantAttributeValClearResult())
                dispatch(getAsyncListVariantAttributeVal({Id}));
            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(variantAttributeValClearResult())
            }
        }
    }, [result]);

    useEffect(() => {
        if(result_delete && result_delete?.status){
            if(result_delete.status === 200) {
                Toast.success(`${result_delete.data.message}`);
                dispatch(variantAttributeValClearDelete());
                dispatch(getAsyncListVariantAttributeVal({Id}));
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(variantAttributeValClearDelete())
            }
        }
    }, [result_delete]);

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

    useEffect(() => {
        function handleClickOutside(event) {
            if (myElementRef.current && !myElementRef.current.contains(event.target)) {
                closeModal();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [myElementRef]);


    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center overflow-auto p-4">
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 z-0 ${
                    isOpenModal ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />

            <div ref={myElementRef} className="flex flex-col gap-2 w-full items-center">
                <div
                    className={`relative md:max-w-2xl w-full rounded-tr-4xl dark:shadow-gray-600 rounded-bl-4xl shadow-lg bg-gray-50 dark:bg-gray-800 transform transition-all duration-300 ease-in-out p-4 pt-1 ${
                        isOpenModal ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    } z-10`}
                >

                    {/* Header */}
                    <div className="h-8 flex items-center justify-between text-gray-800 m-2">
                        <button
                            className="cursor-pointer hover:text-cyan-300 dark:text-gray-200 transition-colors"
                            onClick={closeModal}
                        >
                            <HiMiniXMark className="w-6 h-6 cursor-pointer" />
                        </button>
                        <div className="flex gap-2 items-center dark:text-gray-200 rounded-3xl">
                            <BsListUl className="w-5 h-5" />
                            <span className="text-sm">ویژگی ها</span>
                        </div>
                    </div>
                    <div className="w-full h-px bg-cyan-300"></div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-2 space-y-5">

                        <div className="flex flex-col inset-shadow-sm dark:bg-gray-700/80 inset-shadow-cyan-300 bg-cyan-50 rounded-2xl h-60 md:flex-row md:gap-4 gap-6 p-4 overflow-auto">

                            {isLoading_action || isLoading_list ? (
                                <Loading />
                            ) : isError_list ? (
                                <Reject />
                            ) : list_variant_attribute_val.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {list_variant_attribute_val.map((att) => (
                                        <div
                                            key={att.value}
                                            className="flex items-center gap-2 dark:bg-gray-800 dark:text-gray-100 bg-gray-50 drop-shadow-xl dark:drop-shadow-none p-2 rounded-xl h-10"
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <span>{att.label}</span>
                                                <span className="text-sm">{att.value}</span>
                                            </div>
                                            <button type="button" onClick={() => handleRemoveAttribute(att.id)}>
                                                <HiMiniXMark className="w-5 h-5 text-red-500 cursor-pointer" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex mx-auto flex-col gap-4 items-center justify-center">
                                    <BiSolidError size={35} className="text-cyan-400 dark:text-cyan-300 animate-pulse" />
                                    <span className="font-semibold dark:text-green-100">موردی برای نمایش وجود ندارد.</span>
                                </div>
                            )}
                        </div>

                        <form onSubmit={formik.handleSubmit} className="w-full flex items-center justify-end gap-2"
                        >
                            <div className="flex flex-col w-full gap-3">
                                <Input
                                    formik={formik}
                                    name="label"
                                    label="افزودن ویژگی جدید"
                                />
                                <label className="bg-gray-100 dark:bg-gray-800 w-full inline-flex items-center mt-4.5 gap-3 px-4 py-1.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition relative">
                                    <input
                                        type="color"
                                        className="absolute w-6 h-6 opacity-0 cursor-pointer"
                                        onChange={(e) => setColor(e.target.value.slice(1))}
                                    />
                                    <span
                                        className="w-6 h-6 rounded-md border border-gray-300"
                                        style={{ backgroundColor: Color ? `#${Color}` : "#fff" }}
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-100">
                                                    انتخاب کنید
                                                </span>
                                </label>
                                <Input
                                    formik={formik}
                                    name="value"
                                    label="شرح ویژگی"
                                />
                            </div>
                            <button
                                disabled={!formik.values.label || isLoading}
                                type="submit"
                                className="flex mt-4 justify-center items-center gap-x-2 px-5 py-2.5 rounded-lg enabled:cursor-pointer disabled:bg-gray-500 bg-cyan-400 enabled:hover:bg-cyan-500 text-gray-50 text-sm transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        <span>افزودن...</span>
                                    </>
                                ) : (
                                    <span>افزودن</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default VariantAttributeValue;
