import React, { useEffect, useState } from "react";
import { getIn } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaPercentage } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const InputLimitCount = ({
                        formik,
                        defaultValue="",
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
                        tabIndex = false,
                        minLength = 0,
                        error = "left-1",
                        isPercent = false,
                        isAmount = false,
                    }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const [isAllBalance, setIsAllBalance] = useState(false);

    const isPasswordField = type === "password" || type === "password_check";
    const actualType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onKeyPressHandler = (e) => {
        if (isAllBalance) {
            e.preventDefault();
            return;
        }

        const persianRegex = /[\u0600-\u06FF]/;
        if (onlyNum && !/[0-9]/.test(e.key)) e.preventDefault();
        if (onlyChar && /[0-9]/.test(e.key)) e.preventDefault();
        if (noPersian && persianRegex.test(e.key)) e.preventDefault();
    };

    const formatAmount = (value) => {
        if (!value) return "";
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleChange = (e) => {
        if (isAllBalance) return;

        let value = e.target.value.replace(/,/g, "");

        if (isPercent) {
            const num = Math.max(0, Math.min(100, Number(value)));
            const finalValue = num ? num.toString() : "";
            setDisplayValue(finalValue);
            formik.setFieldValue(name, finalValue);
            return;
        }

        if (isAmount) {
            if (!/^\d*$/.test(value)) return;
            const formatted = formatAmount(value);
            setDisplayValue(formatted);
            formik.setFieldValue(name, value);
            return;
        }

        formik.handleChange(e);
        setDisplayValue(value);
    };

    useEffect(() => {

        const formikValue = getIn(formik.values, name);
        if (formikValue===1) setIsAllBalance(true)

        if (isAllBalance) {
            setDisplayValue("بدون محدودیت");
            return;
        }

        if (
            (formikValue === "" ||
                formikValue === null ||
                formikValue === undefined) &&
            defaultValue !== ""
        ) {
            if (isAmount) {
                setDisplayValue(formatAmount(defaultValue));
            } else {
                setDisplayValue(defaultValue);
            }
            return;
        }

        if (isAmount) {
            setDisplayValue(formatAmount(formikValue));
        } else {
            setDisplayValue(formikValue || "");
        }
    }, [formik.values, name, isAmount, isAllBalance, defaultValue]);


    let propsTabIndex = tabIndex ? { tabIndex } : {};

    return (
        <div className="w-full relative">
            <label
                htmlFor={name}
                className="mb-1 flex text-xs font-medium text-gray-900 dark:text-gray-100"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    {...propsTabIndex}
                    disabled={disabled}
                    readOnly={isAllBalance}
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
                        getIn(formik.errors, name) &&
                        getIn(formik.touched, name)
                            ? "border-red-500"
                            : "border-gray-300"
                    } pr-32 focus-visible:border-cyan-300 border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block w-full p-2`}
                    placeholder={placeholder || ""}
                />

                {(isPercent || isAmount) && (
                    <span className="absolute inset-y-0 left-2 flex items-center text-xs text-gray-500 pointer-events-none">
                        {isPercent ? (
                            <FaPercentage
                                className="text-cyan-400 dark:text-cyan-300"
                                size={14}
                            />
                        ) : (
                            "تومان"
                        )}
                    </span>
                )}

                {!isAllBalance && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsAllBalance(true);
                            setDisplayValue("بدون محدودیت");
                            formik.setFieldValue(name, 1);
                        }}
                        className="absolute bg-gray-100 dark:bg-gray-800 transition-all duration-300 shadow shadow-cyan-300 cursor-pointer p-2 rounded-lg inset-y-0 flex items-center text-cyan-500 text-[5px] hover:text-cyan-600"
                    >
                        بدون محدودیت
                    </button>
                )}

                {isAllBalance && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsAllBalance(false);
                            formik.setFieldValue(name, defaultValue || "");
                        }}
                        className="absolute inset-y-0 right-2 flex cursor-pointer items-center text-gray-400 hover:text-red-500"
                    >
                        <HiX size={18} />
                    </button>
                )}

                {isPasswordField && (
                    <div
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 left-8 flex items-center cursor-pointer text-gray-600"
                    >
                        {showPassword ? (
                            <HiEyeOff className="w-5 h-5" />
                        ) : (
                            <HiEye className="w-5 h-5" />
                        )}
                    </div>
                )}
            </div>

            {getIn(formik.errors, name) &&
                getIn(formik.touched, name) && (
                    <p
                        className={`text-red-500 text-[9px] absolute top-full mt-1 ${error}`}
                    >
                        {getIn(formik.errors, name)}
                    </p>
                )}
        </div>
    );
};

export default InputLimitCount;