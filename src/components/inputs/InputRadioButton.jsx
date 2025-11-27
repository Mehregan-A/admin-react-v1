import {useEffect, useState} from 'react';


const InputRadioButton = ({formik, name, label, list, defaultValue = false}) => {

    const [cols, setCols] = useState('grid-cols-2')

    useEffect(() => {
        if (list.length === 2) {
            setCols('grid-cols-1 lg:grid-cols-2')
        }

        if (list.length === 3) {
            setCols('grid-cols-1 lg:grid-cols-3')
        }


    }, [defaultValue])

    return (
        <div className="flex flex-col w-full ">
            {label &&
                <label className="text-xs dark:text-gray-300">
                    {label}
                </label>
            }
            <div className={`flex flex-row  bg-gray-100  rounded-md gap-2 dark:bg-gray-600 w-full`}>
                {list && list.map((item) => {
                    return (
                        <div key={item.id} className="bg-gray-200 dark:bg-gray-500 shadow rounded-lg w-full">
                            <input disabled={item.id == 2 ? true : false} key={item.id} {...formik.getFieldProps(name)} type="radio" name={name} id={item.label}
                                   value={item.value} checked={formik.values[name] === item.value} className="peer hidden"/>
                            <label htmlFor={item.label}
                                   className="dark:text-gray-100 text-xs  block cursor-pointer select-none rounded-lg
                                  p-2 text-center peer-checked:bg-cyan-300 dark:peer-checked:bg-cyan-400 peer-checked:font-bold peer-checked:text-gray-100">
                                {item.label}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default InputRadioButton;