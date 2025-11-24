import { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { PiChartPieSlice } from "react-icons/pi";
import { getAsyncListAttributeSelect } from "../../feature/redux/AttributeSlice.jsx";
import SelectOption from "../../components/inputs/SelectOption.jsx";
import {deleteAsyncCategoryAtt, postAsyncCategoryAddAtt} from "../../feature/redux/CategorySlice.jsx";

const AttributeCategory = ({ Id, list_category, open_close, reload, open_slider }) => {
    const dispatch = useDispatch();
    const myElementRef = useRef(null);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState([]);

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
        dispatch(getAsyncListAttributeSelect());
    }, [dispatch]);

    const { isLoading } = useSelector(state => state.category);
    const { list_attribute_select } = useSelector(state => state.attribute);

    const foundItem = list_category?.find(item => item.id === Id);

    useEffect(() => {
        if (foundItem?.attribute) {
            setSelectedAttributes(foundItem.attribute);
        }
    }, [foundItem]);

    const initialValues = { value: '' };

    const onSubmit = () => {
        console.log("ویژگی‌های انتخاب‌شده: ", selectedAttributes);
    };

    const formik = useFormik({
        initialValues: foundItem || initialValues,
        onSubmit,
        validateOnMount: true
    });

    const handleAddAttribute = (attr) => {
        if (!attr) return;

        if (!selectedAttributes.some(a => a.value === attr.value)) {
            setSelectedAttributes([...selectedAttributes, attr]);
            if(Id){
                dispatch(postAsyncCategoryAddAtt({ del: Id, value: attr }));
            }
        }

    };

    const handleRemoveAttribute = (value) => {
        setSelectedAttributes(selectedAttributes.filter(att => att.value !== value));
        if(Id){
            dispatch(deleteAsyncCategoryAtt({ del: Id, value: value }));
        }
    };

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
                className={`absolute inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 z-0 ${isOpenModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div ref={myElementRef} className="flex flex-col gap-2 w-full items-center">


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
                            <span className="text-sm">ویژگی دسته</span>
                        </div>
                    </div>

                    <div className='w-full h-px bg-cyan-300'></div>

                    <form onSubmit={formik.handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-2 space-y-5">

                        <div className="flex flex-col inset-shadow-sm dark:bg-gray-700/80 inset-shadow-cyan-300 bg-cyan-50 rounded-2xl h-60 md:flex-row md:gap-4 gap-6 p-4 overflow-auto">
                            <div className="flex flex-wrap gap-2">
                                {selectedAttributes.map((att) =>
                                    <div
                                        key={att.value}
                                        className="flex items-center gap-2 dark:bg-gray-800 dark:text-gray-100 bg-gray-50 drop-shadow-xl dark:drop-shadow-none p-2 rounded-xl h-10"
                                    >
                                        <span>{att.label}</span>
                                        <button type="button" onClick={() => handleRemoveAttribute(att.value)}>
                                            <HiMiniXMark className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-center justify-center gap-10">
                            <SelectOption
                                formik={formik}
                                options={list_attribute_select}
                                name="value"
                                label="ویژگی جدید"
                                onChange={handleAddAttribute}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                disabled={!formik.isValid || isLoading}
                                type="submit"
                                className="w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-2xl enabled:cursor-pointer disabled:bg-gray-500 bg-cyan-400 enabled:hover:bg-cyan-500 text-gray-50 text-sm transition-colors"
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
    );
};

export default AttributeCategory;
