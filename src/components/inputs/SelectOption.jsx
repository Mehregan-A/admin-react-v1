import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

const
    SelectOption = ({
                          formik,
                          formikAddress,
                          name,
                          options,
                          label,
                          require = false,
                          valueDefault = "",
                          tabIndex = false,
                          disabled = false,
                          ref,
                          onChange,
                      }) => {
    const [value, setValue] = useState("");
    const [dropdown, setDropdown] = useState(null);

    const selectHandler = (input) => {
        if (!input) return;

        formik.setFieldValue(name, input.value);
        setValue(input.label);
        setDropdown(null);

        if (onChange) {
            onChange(input);
        }
    };


    const handleDropdown = (id) => {
        if (dropdown === id || (dropdown && id === undefined)) {
            setDropdown(null);
        } else {
            setDropdown(id);
        }
    };

    useEffect(() => {
        const handleClick = ({ target }) => {
            handleDropdown(target.dataset.id);
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    useEffect(() => {
        let selected = null;

        if (formikAddress) {
            selected = options?.find((item) => item.value === formikAddress);
        }

        if (!selected && valueDefault) {
            selected = options?.find((item) => item.value === valueDefault);
        }

        if (!selected && options?.length > 0) {
            selected = options[0];
        }

        if (selected) {
            setValue(selected.label);
            formik.setFieldValue(name, selected.value);
        }
    }, [formikAddress, valueDefault, options]);

    const propsTabIndex = tabIndex ? { tabIndex: tabIndex } : {};

    return (
        <div className="group relative w-full">
            <label
                htmlFor={name}
                className="flex flex-row gap-1 mb-1 text-xs font-medium text-gray-900 dark:text-gray-100"
            >
                {label}
                {require && <span className="text-red-500">*</span>}
            </label>

            <div className="relative w-full">
                <input
                    ref={ref}
                    {...propsTabIndex}
                    disabled={disabled}
                    data-id={name}
                    value={value}
                    id={name}
                    name={name}
                    type="text"
                    className={`focus-visible:border-cyan-300 border bg-gray-100 dark:bg-gray-800 dark:text-gray-100  text-gray-900 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 ${
                        formik.touched[name] && formik.errors[name]
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    role="listbox"
                    aria-haspopup="true"
                    readOnly
                    onClick={() => handleDropdown(name)}
                />

                <BiChevronLeft
                    data-id={name}
                    size={22}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 transition-transform duration-300 text-cyan-300 ${
                        dropdown === name ? "-rotate-90" : ""
                    }`}
                    onClick={() => handleDropdown(name)}
                />

                {formik.touched[name] && formik.errors[name] && (
                    <div className="text-red-500 text-xs absolute top-full mt-1 right-0">
                        {formik.errors[name]}
                    </div>
                )}

                <div
                    tabIndex={-1}
                    className={`z-30 absolute transition-[max-height,opacity] duration-300 ease-in-out w-full rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-600 shadow overflow-y-auto scrollbar ${
                        dropdown === name
                            ? "max-h-60 opacity-100 pointer-events-auto"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                >
                    {options?.length > 0 ? (
                        options.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => selectHandler(item)}
                                className="cursor-pointer p-2 text-sm rounded-lg hover:bg-cyan-400 hover:text-white transition-colors duration-200"
                            >
                                {item.icon ? (
                                    <div className="flex flex-row gap-2 items-center">
                                        {item.icon}
                                        {item.label}
                                    </div>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500 text-center p-2">
                            موردی برای نمایش وجود ندارد
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectOption;
