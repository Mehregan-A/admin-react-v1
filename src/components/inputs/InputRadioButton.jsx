import { useEffect, useState } from "react";

const InputRadioButton = ({
                              formik,
                              name,
                              label,
                              list,
                              disabledValues = [],
                          }) => {
    const [cols, setCols] = useState("grid-cols-2");

    useEffect(() => {
        if (list?.length === 2) {
            setCols("grid-cols-1 lg:grid-cols-2");
        } else if (list?.length === 3) {
            setCols("grid-cols-1 lg:grid-cols-3");
        }
    }, [list]);

    const handleChange = (value) => {
        // 🔹 تبدیل value به عدد
        formik.setFieldValue(name, Number(value));
        console.log(name, Number(value));
    };

    return (
        <div className="flex flex-col w-full gap-1">
            {label && (
                <label className="text-xs dark:text-gray-300">{label}</label>
            )}

            <div
                className={`grid ${cols} bg-gray-100 dark:bg-gray-600 rounded-md gap-2 p-1`}
            >
                {list?.map((item) => {
                    const inputId = `${name}-${item.value}`;

                    return (
                        <div
                            key={item.value}
                            className="bg-gray-200 dark:bg-gray-500 shadow rounded-lg w-full"
                        >
                            <input
                                type="radio"
                                id={inputId}
                                name={name}
                                // 🔹 value رو هم عدد بده
                                value={item.value}
                                checked={formik.values[name] === Number(item.value)}
                                disabled={disabledValues.includes(Number(item.value))}
                                onChange={() => handleChange(item.value)}
                                className="peer hidden"
                            />

                            <label
                                htmlFor={inputId}
                                className="block cursor-pointer select-none rounded-lg p-2 text-center text-xs
                  dark:text-gray-100
                  peer-checked:bg-cyan-300 dark:peer-checked:bg-cyan-400
                  peer-checked:font-bold peer-checked:text-gray-100"
                            >
                                {item.label}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InputRadioButton;


