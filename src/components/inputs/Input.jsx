import React, { useEffect, useState } from "react";
import { getIn } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {FaPercentage} from "react-icons/fa";

const Input = ({
                   iconLable,
                   formik,
                   name,
                   label,
                   placeholder = null,
                   type = "text",
                   disabled = false,
                   dir = "rtl",
                   onlyNum = false,
                   onlyChar = false,
                   noPersian = false,
                   maxLength = 30000,
                   nameSearch,
                   onClickSearch,
                   isLoading = false,
                   tabIndex = false,
                   minLength = 0,
                   type_error = "1",
                   error = "left-1",

                   // 🔹 حالت‌های جدید
                   isPercent = false,
                   isAmount = false,
               }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [displayValue, setDisplayValue] = useState("");

    const isPasswordField = type === "password" || type === "password_check";
    const actualType = isPasswordField ? (showPassword ? "text" : "password") : type;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onKeyPressHandler = (e) => {
        const persianRegex = /[\u0600-\u06FF]/;
        if (onlyNum && !/[0-9]/.test(e.key)) e.preventDefault();
        if (onlyChar && /[0-9]/.test(e.key)) e.preventDefault();
        if (noPersian && persianRegex.test(e.key)) e.preventDefault();
    };

    // 🔹 تابع فرمت برای مبلغ
    const formatAmount = (value) => {
        if (!value) return "";
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // 🔹 هندل تغییر مقدار
    const handleChange = (e) => {
        let value = e.target.value.replace(/,/g, "");

        // درصدی
        if (isPercent) {
            const num = Math.max(0, Math.min(100, Number(value)));
            value = num ? num.toString() : "";
            setDisplayValue(value);
            formik.setFieldValue(name, value);
            return;
        }

        // مبلغ ثابت
        if (isAmount) {
            if (!/^\d*$/.test(value)) return;
            const formatted = formatAmount(value);
            setDisplayValue(formatted);
            formik.setFieldValue(name, value);
            return;
        }

        // حالت عادی
        formik.handleChange(e);
        setDisplayValue(value);
    };

    // 🔹 همگام‌سازی مقدار اولیه فرمیک
    useEffect(() => {
        const formikValue = getIn(formik.values, name) || "";
        if (isAmount) {
            setDisplayValue(formatAmount(formikValue));
        } else {
            setDisplayValue(formikValue);
        }
    }, [formik.values, name]);

    let propsTabIndex = tabIndex ? { tabIndex: tabIndex } : {};

    return (
        <div className="w-full relative">
            <label
                htmlFor={name}
                className="mb-1 flex flex-row justify-start text-xs font-medium text-gray-900 dark:text-gray-100"
            >
                {label}
            </label>

            <div className="flex flex-col relative">
                {nameSearch && (
                    <div
                        className="rounded-l-lg bg-cyan-400 px-8 py-2.5 absolute top-0 left-0 cursor-pointer"
                        onClick={onClickSearch}
                    >
                        {nameSearch}
                    </div>
                )}

                <input
                    {...propsTabIndex}
                    disabled={disabled}
                    dir={dir}
                    value={displayValue}
                    onChange={handleChange}
                    onKeyPress={onKeyPressHandler}
                    type={actualType}
                    id={name}
                    name={name}
                    minLength={minLength}
                    maxLength={maxLength}
                    className={`${
                        getIn(formik.errors, name) && getIn(formik.touched, name)
                            ? "border-red-500"
                            : "border-gray-300"
                    } focus-visible:border-cyan-300 border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 pr-2`}
                    placeholder={placeholder || ""}
                />

                {(isPercent || isAmount) && (
                    <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 text-xs pointer-events-none">
            {isPercent ?  <FaPercentage className="text-cyan-400 dark:text-cyan-300" size={15} /> : "تومان"}
          </span>
                )}

                {isPasswordField && (
                    <div
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 left-2 flex items-center cursor-pointer text-gray-600"
                    >
                        {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                    </div>
                )}
            </div>

            {!(type === "search") &&
                getIn(formik.errors, name) &&
                getIn(formik.touched, name) && (
                    <p
                        className={`text-red-500 text-[9px] absolute top-full mt-1 left-0 ${error}`}
                    >
                        {getIn(formik.errors, name)}
                    </p>
                )}
        </div>
    );
};

export default Input;
