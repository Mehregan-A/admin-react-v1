import {useEffect, useState} from "react";
import { getIn } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {Toast} from "../toast/Toast.jsx";

const Input = ({
                   iconLable,
                   formik,
                   name,
                   label,
                   placeholder = null,
                   type = "text",
                   disabled = false,
                   dir = 'rtl',
                   onlyNum = false,
                   onlyChar=false,
                   noPersian = false,
                   maxLength = 30000,
                   nameSearch,
                   onClickSearch,
                   isLoading = false,
                   tabIndex = false,
                   minLength = 0,
                   type_error = "1",
                   error = "left-1",
               }) => {

    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password" || type === "password_check";
    const actualType = isPasswordField ? (showPassword ? "text" : "password") : type;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onKeyPressHandler = (e) => {
        const persianRegex = /[\u0600-\u06FF]/;

        if (onlyNum && !/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
        if (onlyChar && /[0-9]/.test(e.key)) {
            e.preventDefault();
        }
        if (noPersian && persianRegex.test(e.key)) {
            e.preventDefault();
        }
    };

    let propsTabIndex = tabIndex ? { tabIndex: tabIndex } : {};

    return (
        <div className="w-full relative">
            <label htmlFor={name}
                   className="mb-1 flex flex-row justify-start text-xs font-medium text-gray-900 dark:text-gray-100">
                {label}
            </label>

            <div className="flex flex-col relative">
                {nameSearch && (
                    <div className="rounded-l-lg bg-cyan-400 px-8 py-2.5 absolute top-0 left-0 cursor-pointer"
                         onClick={onClickSearch}>
                        {nameSearch}
                    </div>
                )}
                <input
                    {...propsTabIndex}
                    disabled={disabled}
                    dir={dir}
                    {...formik.getFieldProps(name)}
                    maxLength={maxLength}
                    onKeyPress={onKeyPressHandler}
                    type={actualType}
                    id={name}
                    name={name}
                    minLength={minLength}
                    className={`${getIn(formik.errors, name) && getIn(formik.touched, name)
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus-visible:border-cyan-300 border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 ${type==="search"?"pr-7":""} `}
                    placeholder={placeholder || ""}
                />

                {isPasswordField && (
                    <div
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 left-2 flex items-center cursor-pointer text-gray-600 "
                    >
                        {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                    </div>
                )}
            </div>
            {!(type === "search") && getIn(formik.errors, name) && getIn(formik.touched, name) && (
                <p className={`text-red-500 text-[9px] absolute top-full mt-1 left-0 ${error}`}>
                    {getIn(formik.errors, name)}
                </p>
            )}


        </div>
    );
};

export default Input;