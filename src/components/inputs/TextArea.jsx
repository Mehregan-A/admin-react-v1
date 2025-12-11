import {getIn} from "formik";



const TextArea = ({formik, name, label, placeholder = null, dir = 'rtl', rows = 4,hidden = false , tabIndex = false}) => {
    let errorsStyle = getIn(formik.errors, name) && getIn(formik.touched, name) ? 'border-rose-500 bg-rose-100/30' : ''

    let propsTabIndex = tabIndex ? {tabIndex: tabIndex} : {};

    return (
        <div className="w-full relative" hidden={hidden}>
            <label htmlFor={name} className="mb-1 flex flex-row justify-start text-xs font-medium text-gray-900 dark:text-gray-100 ">{label}</label>
            <textarea
                {...propsTabIndex}
                dir={dir}
                {...formik.getFieldProps(name)}
                rows={rows}
                id={name}
                name={name}
                placeholder={placeholder}
                required={false}
                className={`${getIn(formik.errors, name) && getIn(formik.touched, name)
                    ? "border-red-500"
                    : "border-gray-300"
                } focus-visible:border-cyan-300 border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2`}
            />
            {getIn(formik.errors, name) && getIn(formik.touched, name) && (
                <p className="absolute mt-1 text-rose-600 text-[9px]  left-0">
                    {formik.errors[name]}
                </p>
            )}
        </div>
    )
}

export default TextArea;