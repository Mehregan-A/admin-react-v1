import { getIn } from "formik";
import { useEffect, useState } from "react";

const InputCheckbox = ({
                           formik,
                           name,
                           value,
                           label,
                           changesClass = "size-5",
                           type = "checkbox",
                           dir = "rtl",
                       }) => {
    const [checked, setChecked] = useState(() => {
        return formik.values[name] ? formik.values[name] === "active" : true;
    });

    useEffect(() => {
        const formValue = formik.values[name];
        const expectedValue = checked ? "active" : "inactive";

        if (formValue !== expectedValue) {
            formik.setFieldValue(name, expectedValue);
        }
    }, [checked, formik, name]);

    const handler = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className="flex flex-row gap-1">
            <input
                dir={dir}
                value={value}
                name={name}
                onChange={handler}
                checked={checked}
                type={type}
                id={name}
                className={`bg-gray-50  rounded-full accent-cyan-400 ${changesClass}`}
            />
            <label
                htmlFor={name}
                className="block text-xs font-medium text-gray-900 dark:text-gray-200 "
            >
                {label}
            </label>
            {getIn(formik.errors, name) && getIn(formik.touched, name) && (
                <p className="mt-2 text-rose-600 text-xs">{formik.errors[name]}</p>
            )}

        </div>
    );
};

export default InputCheckbox;