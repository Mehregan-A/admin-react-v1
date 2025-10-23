
import {IoCloseCircleOutline} from "react-icons/io5";
import {HiMiniXMark} from "react-icons/hi2";
import {HiOutlineExclamationCircle} from "react-icons/hi";

const Alert = ({setShowAlertPage , showAlertPage, label, title,onclick}) => {

    return (
        <div className={`${showAlertPage ? "" : "hidden"} absolute  inset-0 z-40  backdrop-blur flex flex-col items-center justify-center`}>
            <div className="absolute w-96 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 dark:border-gray-500 border-gray-300 shadow flex flex-col items-center justify-center p-6">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex items-center gap-1">
                        <span className="text-sm">تأیید عملیات</span>
                        <HiOutlineExclamationCircle className="w-5 h-5 text-cyan-400 " />
                    </div>
                    <button
                        className="cursor-pointer hover:text-cyan-600 transition-colors"
                        onClick={() => {setShowAlertPage(false)}}
                    >
                        <HiMiniXMark className="w-6 h-6" />
                    </button>
                </div>
                <div className="py-6 dark:text-gray-200">
                    {label}
                </div>
                <div className="flex flex-row gap-3 p-6 items-center justify-center">
                    <button
                        onClick={() => {
                            onclick()
                        }}
                        className="w-28 py-2 bg-cyan-400 hover:bg-cyan-300 text-white font-semibold rounded-xl shadow transition-colors cursor-pointer enabled:cursor-pointer disabled:bg-gray-500 flex items-center justify-center space-x-2"
                    >
                        بله
                    </button>
                    <button
                        onClick={() => {setShowAlertPage(false)}}
                        type="submit"
                        className="w-28 py-2 bg-gray-200  text-gray-800  font-semibold rounded-xl shadow hover:bg-gray-300 enabled:cursor-pointer disabled:bg-gray-500 transition-colors cursor-pointer"
                    >
                        خیر
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
