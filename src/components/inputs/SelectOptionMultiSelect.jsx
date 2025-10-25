import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { TbCheck } from "react-icons/tb";
import { FaXmark } from "react-icons/fa6";

const SelectOptionMultiSelect = ({
                                     formik,
                                     formikAddress = [],
                                     name,
                                     options = [],
                                     label,
                                     require = false,
                                 }) => {
    const [value, setValue] = useState([]);

    const [dropdown, setDropdown] = useState(false);

    // انتخاب آیتم
    const selectHandler = (input) => {
        if (!formik || !formik.setFieldValue) return;

        const current = Array.isArray(formikAddress) ? formikAddress : [];
        const exist = current.includes(input.value);

        let newValues;
        if (exist) {
            newValues = current.filter((val) => val !== input.value);
        } else {
            newValues = [...current, input.value];
        }

        formik.setFieldValue(name, newValues);

        // بروزرسانی labelهای انتخاب‌شده در state داخلی
        const newLabels = options
            .filter((item) => newValues.includes(item.value))
            .map((x) => x.label);

        setValue(newLabels);
    };

    // مقداردهی اولیه فقط یکبار
    useEffect(() => {
        if (Array.isArray(formikAddress) && Array.isArray(options)) {
            const initialLabels = options
                .filter((item) => formikAddress.includes(item.value))
                .map((x) => x.label);
            setValue(initialLabels);
        }
        // فقط در mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // بستن دراپ‌دان بیرون از کامپوننت
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(`[data-select="${name}"]`)) {
                setDropdown(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [name]);

    return (
        <div className="relative w-full" data-select={name}>
            <label
                htmlFor={name}
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label} {require && <span className="text-red-500">*</span>}
            </label>

            <div
                onClick={() => setDropdown(!dropdown)}
                className="justify-between border border-gray-300 focus:border-cyan-300 rounded-lg p-2 bg-gray-100 dark:bg-gray-800 cursor-pointer flex flex-wrap gap-1 items-center"
            >
                {value.length > 0 ? (
                    value.map((val, i) => (
                        <span
                            key={i}
                            className="bg-sky-100 dark:bg-gray-800 border border-cyan-400 text-gray-200 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                        >
              {val}
                            <span
                                className="cursor-pointer text-xs hover:text-red-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const item = options.find((x) => x.label === val);
                                    if (item) selectHandler(item);
                                }}
                            >
                <FaXmark />
              </span>
            </span>
                    ))
                ) : (
                    <span className="text-gray-400 text-sm">انتخاب کنید...</span>
                )}

                <BiChevronDown
                    size={20}
                    className={`transition-transform text-cyan-300 ${
                        dropdown ? "rotate-180" : ""
                    }`}
                />
            </div>

            {/* Dropdown */}
            {dropdown && (
                <div className="absolute z-20 left-0 right-0 bg-white dark:bg-gray-800 border dark:text-gray-100 border-gray-200 dark:border-gray-700 mt-1 rounded-lg shadow-lg overflow-hidden transition-all duration-200">
                    <div className="max-h-60 overflow-y-auto">
                        {options.length > 0 ? (
                            options.map((item, index) => {
                                const selected =
                                    Array.isArray(formikAddress) &&
                                    formikAddress.includes(item.value);
                                return (
                                    <div
                                        key={index}
                                        onClick={() => selectHandler(item)}
                                        className={`flex justify-between items-center px-3 py-2 text-sm cursor-pointer rounded-lg hover:bg-cyan-400 hover:text-white transition-colors duration-200 dark:hover:bg-cyan-400 ${
                                            selected ? "bg-sky-50 dark:bg-gray-800" : ""
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        {selected && <TbCheck className="text-cyan-400" size={18} />}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-gray-400 text-sm p-2">
                                در حال بارگذاری گزینه‌ها...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectOptionMultiSelect;
