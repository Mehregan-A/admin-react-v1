import { useRef } from 'react';
import { getIn } from "formik";
import { BiTrash } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Config } from "../../config/Config.jsx";

const InputImageUpload = ({ formik, label, formikAddress, name, changesClass }) => {

    let errorsStyle = getIn(formik.errors, name) && getIn(formik.touched, name) ? 'border-rose-500' : '';
    const ref = useRef();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            formik.setFieldValue(name, e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        formik.setFieldValue(name, "");
        ref.current.value = "";
    };

    return (
        <div className={`flex bg-gray-50/70 dark:bg-gray-800 h-full  flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-300/60 p-3 mt-2 rounded-2xl w-full ${changesClass}`}>
            <div className="relative">
                {formikAddress && formikAddress !== null && formikAddress !== undefined ? (
                    <div className="bg-gray-300 rounded-lg h-20 w-28 overflow-hidden relative">
                        {typeof formikAddress !== "object" ? (
                            <img src={Config.apiImage + formikAddress} alt="تصویر آپلود شده" className="w-full h-full object-cover" />
                        ) : (
                            <img src={URL.createObjectURL(formikAddress)} alt="تصویر انتخاب شده" className="w-full h-full object-cover" />
                        )}

                        {formikAddress && (
                            <div
                                className="size-7 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-gray-50 shadow-xl hover:bg-red-500 transition-all duration-300 cursor-pointer flex flex-row items-center justify-center gap-2 p-1 absolute top-0 left-0"
                                onClick={removeSelectedImage}
                            >
                                <BiTrash className="dark:text-gray-100" size={20} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-100 dark:bg-gray-800 drop-shadow-md drop-shadow-cyan-500 rounded-2xl h-20 w-28 overflow-hidden flex flex-col items-center justify-center text-gray-500 text-xs">
                        <FaCloudUploadAlt className="text-2xl animate-bounce mb-1 text-cyan-500" />
                        <span  className='text-[10px] dark:text-gray-200 text-gray-800'>تصویر بارگذاری کنید</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 justify-center items-center">
                <label htmlFor={name} className="text-xs dark:text-gray-200">{label}</label>

                <label
                    htmlFor={name}
                    className="inline-block cursor-pointer px-3.5 py-2 text-xs font-semibold text-white bg-cyan-400 rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)] hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)] active:scale-95 transition-all duration-400 ease-in-out select-none"
                >
                    انتخاب تصویر
                </label>
                <input
                    ref={ref}
                    id={name}
                    name={name}
                    type="file"
                    onChange={imageChange}
                    className="hidden"
                />

                {getIn(formik.errors, name) && getIn(formik.touched, name) && (
                    <p className="mt-2 text-rose-600 text-[9px]">{formik.errors[name]}</p>
                )}
            </div>
        </div>
    );
};

export default InputImageUpload;