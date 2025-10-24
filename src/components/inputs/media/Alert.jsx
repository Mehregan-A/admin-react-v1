import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Alert = ({ setShowAlertPage, showAlertPage, label, onclick }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (showAlertPage) {
            const timer = setTimeout(() => setIsOpenModal(true), 100);
            return () => clearTimeout(timer);
        } else {
            setIsOpenModal(false);
        }
    }, [showAlertPage]);

    function closeModal() {
        setIsOpenModal(false);
        setTimeout(() => {
            setShowAlertPage(false);
        }, 300);
    }

    const modalContent = (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 ${
                    isOpenModal ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />
            <div ref={modalRef} className="flex flex-col gap-1.5 z-[101]">
                {/* Header */}
                <div
                    className={`relative md:max-w-md md:w-full mx-5 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 transition-all duration-300 ease-in-out ${
                        isOpenModal
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                    <div className="h-10 flex items-center justify-between text-gray-800 dark:text-gray-200 px-4 py-2">
                        <button
                            className="cursor-pointer hover:text-cyan-600 transition-colors"
                            onClick={closeModal}
                        >
                            <HiMiniXMark className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-1">
                            <span className="text-sm">تأیید عملیات</span>
                            <HiOutlineExclamationCircle className="w-5 h-5 text-cyan-400" />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div
                    className={`relative md:max-w-md md:w-full mx-5 rounded-xl shadow-xl bg-gray-50 dark:bg-gray-800 transform transition-all duration-300 ease-in-out p-6 ${
                        isOpenModal
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                    <div className="flex flex-col items-center gap-6">
            <span className="text-center text-base font-medium text-gray-800 dark:text-gray-200">
              {label}
            </span>
                        <div className="flex gap-4">
                            <button
                                onClick={closeModal}
                                className="w-28 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition-colors cursor-pointer"
                            >
                                خیر
                            </button>
                            <button
                                onClick={onclick}
                                className="w-28 py-2 bg-cyan-400 hover:bg-cyan-300 text-white font-semibold rounded-xl shadow transition-colors cursor-pointer"
                            >
                                بله
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return showAlertPage ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default Alert;

