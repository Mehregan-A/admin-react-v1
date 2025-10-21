import { useEffect, useState } from 'react';
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FiCalendar } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const InputCalendar = ({
                           formik,
                           name,
                           error = false,
                           helperText = "",
                           require = false,
                           tabIndex = false,
                           label,
                           type = "normal",
                           formikAddress,
                           classLable,
                           minDate = null
                       }) => {
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
        if ((!formik.values[name] || formik.values[name] === 0) && !formikAddress) {
            const nowUnix = Math.floor(Date.now() / 1000);
            formik.setFieldValue(name, nowUnix);
        }
    }, [formik, name, formikAddress]);

    let propsTabIndex = tabIndex ? { tabIndex: tabIndex } : {};

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <div {...propsTabIndex} className="flex flex-col gap-1  w-full" dir="ltr">
            <label
                htmlFor={name}
                className={`gap-1 text-xs text-gray-900 dark:text-gray-100 flex flex-row-reverse ${classLable}`}
            >
                {label}
                {require && <AiFillStar size={8} className="text-red-600" />}
            </label>

            <div className="flex flex-col  w-full relative">
                <DatePicker
                    style={{ backgroundColor: '#161616', color: '#fff' }}
                    value={
                        formikAddress > 0
                            ? new Date(formikAddress * 1000)
                            : new Date(formik.values[name] * 1000)
                    }
                    onChange={(value) => {
                        formik.setFieldValue(name, value?.unix);
                        value !== ""
                            ? formik.setFieldTouched(name, true, true)
                            : formik.setFieldTouched(name, false, false);
                    }}
                    format="YYYY/MM/DD HH:mm:ss"
                    minDate={minDate}
                    formattingIgnoreList={["Date"]}
                    plugins={type === "normal" ? [<TimePicker  position="bottom" key="timepicker" />] : []}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    render={(value, openCalendar) => (
                        <input
                            value={value}
                            onFocus={openCalendar}
                            onKeyDown={handleKeyDown}
                            className={`focus-visible:border-cyan-300 border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 ${formik.touched[name] && formik.errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                    )}
                />

                <FiCalendar
                    size={25}
                    className="hidden sm:block absolute transform -translate-y-1/2 top-1/2 right-2 text-cyan-300"
                />
                {formik.touched[name] && formik.errors[name] && (
                    <span className="text-red-600 mt-1 absolute top-9 md:left-0 text-[9px]">{formik.errors[name]}</span>
                )}
            </div>
        </div>
    );
};

export default InputCalendar;