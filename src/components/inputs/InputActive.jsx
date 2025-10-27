import { useEffect, useState, useRef } from 'react';
import { BiChevronLeft } from "react-icons/bi";

const InputActivate = ({
                           formik,
                           formikAddress,
                           name,
                           options,
                           label,
                           require = false,
                           valueDefault = "",
                           tabIndex = false,
                           disabled = false,
                           ref
                       }) => {
    const [value, setValue] = useState(valueDefault);
    const [dropdown, setDropdown] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const optionsRef = useRef([]);

    const selectHandler = (input) => {
        formik.setFieldValue(name, input.value);
        setValue(input.label);
        setDropdown(null);
        setHighlightedIndex(-1);
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
    }, [dropdown]);

    useEffect(() => {
        if (formikAddress !== undefined) {
            if (formikAddress !== "") {
                let get = options?.find(item => item.value === formikAddress);
                if (get) setValue(get.label);
                else formik.setFieldValue(name, "");
            }
        }
    }, [formikAddress, options]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (document.activeElement.getAttribute("name") === name) {
                if (e.key === "Tab") {
                    e.preventDefault();
                    setDropdown(name);
                    setHighlightedIndex(0);
                }
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    if (dropdown === name) {
                        setHighlightedIndex(prev => (prev + 1) % options.length);
                    }
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    if (dropdown === name) {
                        setHighlightedIndex(prev => prev <= 0 ? options.length - 1 : prev - 1);
                    }
                }
                if (e.key === "Enter") {
                    if (dropdown === name && highlightedIndex >= 0) {
                        const selected = options[highlightedIndex];
                        selectHandler({ label: selected.label, value: selected.value });
                    }
                }
                if (e.key === "Escape") {
                    setDropdown(null);
                    setHighlightedIndex(-1);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [dropdown, highlightedIndex, name, options]);

    useEffect(() => {
        if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
            optionsRef.current[highlightedIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }, [highlightedIndex]);

    let propsTabIndex = tabIndex ? { tabIndex: tabIndex } : {};

    return (
        <div className="group relative w-full">
            <label
                htmlFor={name}
                className="flex flex-row gap-1 mb-1 text-xs font-medium text-gray-900 dark:text-gray-100 "
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
                    className={`focus-visible:border-cyan-300 border bg-gray-100 dark:bg-gray-800 dark:text-gray-100  text-gray-900 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 ${formik.touched[name] && formik.errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                    role="listbox"
                    aria-haspopup="true"
                    readOnly
                />

                <BiChevronLeft
                    data-id={name}
                    size={22}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 transition-transform duration-300 text-cyan-300 ${dropdown === name ? "-rotate-90" : ""}`}
                />

                {formik.touched[name] && formik.errors[name] && (
                    <div className="text-red-500 text-[9px]  absolute top-full mt-1 right-0">
                        {formik.errors[name]}
                    </div>
                )}

                <div
                    tabIndex={-1}
                    className={`z-30 absolute transition-[max-height,opacity] duration-300 ease-in-out w-full rounded-lg bg-gray-50 dark:text-gray-100 dark:bg-gray-700 shadow overflow-y-auto scrollbar ${
                        dropdown === name
                            ? "max-h-60 opacity-100 pointer-events-auto"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                >
                    {options && options.length > 0 ? (
                        options.map((item, index) => {
                            const isHighlighted = index === highlightedIndex;
                            return (
                                <div
                                    key={index}
                                    ref={(el) => (optionsRef.current[index] = el)}
                                    onClick={() => selectHandler({ label: item.label, value: item.value })}
                                    className={`cursor-pointer p-2 text-sm rounded-lg ${
                                        isHighlighted
                                            ? "bg-cyan-300 text-white"
                                            : "hover:bg-cyan-400 hover:text-white"
                                    }`}
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
                            );
                        })
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

export default InputActivate;