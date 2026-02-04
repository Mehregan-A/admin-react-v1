import React from 'react';
import {useNavigate} from "react-router";

const HeaderBox = ({text1,text2,text3}) => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex items-center justify-between py-2 px-6 dark:bg-gray-700/30 bg-gray-100 rounded-2xl shadow-lg dark:shadow dark:shadow-cyan-300">
            <div className='flex justify-start gap-2'>
                <div className="text-gray-400 dark:text-gray-300">  {text1}   |  </div>
                <div className={`text-gray-400 dark:text-gray-300 ${text2?"":"hidden"} `}>  {text2}   |  </div>
                <div className="text-cyan-700 dark:text-cyan-400">{text3}</div>
            </div>
            <div>
                <button className="dark:bg-gray-800 bg-gray-100 text-gray-600 cursor-pointer hover:text-cyan-400 transition-all rounded-2xl px-4.5 py-2.5 text-sm dark:text-gray-100 shadow-[0px_0px_4px_4px_rgba(0,200,243,0.4)] dark:shadow-[0px_0px_4px_4px_rgba(0,189,243,0.6)]" onClick={() => navigate(-1)}>بازگشت</button>
            </div>
        </div>
    );
};

export default HeaderBox;