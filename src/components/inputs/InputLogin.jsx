import { useState, useEffect, useRef } from "react";
import { getIn } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";

const InputLogIn = ({
                        iconLable,
                        formik,
                        name,
                        label,
                        noPersian = false,
                        placeholder = null,
                        type = "text",
                        disabled = false,
                        dir = "rtl",
                        onlyNum = false,
                        maxLength = 30000,
                        nameSearch,
                        onClickSearch,
                        isLoading = false,
                        tabIndex = false,
                        minLength = 0,
                        type_error = "1",
                        error = "left-0",
                        autoFocusOnMount = false,
                    }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);

    const togglePassword = () => setShowPassword((prev) => !prev);

    const isPasswordField = type === "password";
    const currentType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type;

    const onKeyPressHandler = (e) => {
        const persianRegex = /[\u0600-\u06FF]/;

        if (onlyNum && !/[0-9]/.test(e.key)) {
            e.preventDefault();
        }

        if (noPersian && persianRegex.test(e.key)) {
            e.preventDefault();
        }
    };

    let propsTabIndex = tabIndex ? { tabIndex } : {};
    let errorsStyle =
        getIn(formik.errors, name) && getIn(formik.touched, name)
            ? "border-rose-500 bg-rose-100/30"
            : "";

    // فوکوس خودکار
    useEffect(() => {
        if (autoFocusOnMount && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocusOnMount]);

    return (
        <div className="flex items-center w-full relative border border-gray-100 rounded-lg">
            <div className="min-w-[70px] max-w-[120px] bg-gray-50 px-2 flex items-center justify-center text-center">
                <label
                    htmlFor={name}
                    title={label}
                    className="whitespace-nowrap text-xs font-medium text-gray-900"
                >
                    {label}
                    {iconLable}
                </label>
            </div>
            <div className="w-full flex flex-row relative items-center">
                {nameSearch && (
                    <div
                        className="rounded-l-lg bg-sky-800 px-8 py-2.5 absolute top-0 left-0 cursor-pointer"
                        onClick={onClickSearch}
                    >
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
                    type={currentType}
                    id={name}
                    name={name}
                    minLength={minLength}
                    ref={inputRef} // مرجع اضافه شد
                    className={`${errorsStyle}
                        ${
                        getIn(formik.errors, name) &&
                        getIn(formik.touched, name)
                            ? "focus-visible:ring-rose-500  border border-rose-300"
                            : "focus-visible:ring-sky-800 bg-gray-100 border border-gray-200"
                    }
                        bg-gray-200/40 text-gray-900 text-sm rounded-l-md
                        focus-visible:outline-0 focus-visible:ring-0 block w-full p-2`}
                    placeholder={placeholder}
                />
                {isPasswordField && (
                    <div
                        onClick={togglePassword}
                        className="absolute left-2 top-2.5 text-lg text-gray-600 cursor-pointer"
                        title={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                    >
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </div>
                )}
            </div>
            {getIn(formik.errors, name) && getIn(formik.touched, name) && (
                <p className={`absolute -bottom-5 text-rose-600  text-xs ${error}`}>
                    {getIn(formik.errors, name)}
                </p>
            )}
        </div>
    );
};

export default InputLogIn;