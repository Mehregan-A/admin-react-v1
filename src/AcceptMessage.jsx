import { HiMiniXMark } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import {HiOutlineExclamationCircle} from "react-icons/hi";

const AcceptMessage = ({ text, accept, reject, open_close, showModal,isLoading }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setIsOpenModal(true);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setIsOpenModal(false);
        }
    }, [showModal]);

    function closeModal() {
        setIsOpenModal(false);
        setTimeout(() => {
            open_close();
        }, 300);
    }

    useEffect(() => {
        const scrollBar = document.querySelector(".scroll-bar");
        const scrollBarStyle = document.querySelector(".scroll-bar-style");

        if (isOpenModal) {
            document.body.style.overflow = "hidden";
            scrollBar?.classList.remove("scroll-bar");
            scrollBarStyle?.classList.remove("scroll-bar-style");
        } else {
            document.body.style.overflow = "";
            scrollBar?.classList.add("scroll-bar");
            scrollBarStyle?.classList.add("scroll-bar-style");
        }

        return () => {
            document.body.style.overflow = "";
            scrollBar?.classList.add("scroll-bar");
            scrollBarStyle?.classList.add("scroll-bar-style");
        };
    }, [isOpenModal]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        }

        if (isOpenModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenModal]);


    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 z-0 ${isOpenModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div ref={modalRef} className="flex flex-col gap-1.5">
                {/* Header */}
                <div
                    className={`relative md:max-w-md md:w-full mx-5 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 dark:drop-shadow-md drop-shadow-gray-500 transform transition-all duration-300 ease-in-out ${
                        isOpenModal
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                    } z-10`}
                >
                    <div className="h-10 flex items-center justify-between text-gray-800 dark:text-gray-200  px-4 py-2">
                        <button
                            className="cursor-pointer hover:text-cyan-600 transition-colors"
                            onClick={closeModal}
                        >
                            <HiMiniXMark className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-1">
                            <span className="text-sm">تأیید عملیات</span>
                            <HiOutlineExclamationCircle className="w-5 h-5 text-cyan-400 " />
                        </div>

                    </div>
                </div>
                {/* Body */}
                <div
                    className={`relative md:max-w-md md:w-full mx-5 rounded-xl shadow-xl bg-gray-50 dark:bg-gray-800  dark:drop-shadow-lg drop-shadow-gray-500 transform transition-all duration-300 ease-in-out p-6 ${
                        isOpenModal
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                    } z-10`}
                >
                    <div className="flex flex-col items-center gap-6">
            <span className="text-center text-base font-medium text-gray-800 dark:text-gray-200 ">
              {text}
            </span>
                        <div className="flex gap-4">
                            <button
                                onClick={reject}
                                type="submit"
                                className="w-28 py-2 bg-gray-200  text-gray-800  font-semibold rounded-xl shadow hover:bg-gray-300 enabled:cursor-pointer disabled:bg-gray-500 transition-colors cursor-pointer"
                            >
                                خیر
                            </button>
                            <button
                                disabled={isLoading}
                                onClick={accept}
                                className="w-28 py-2 bg-cyan-400 hover:bg-cyan-300 text-white font-semibold rounded-xl shadow transition-colors cursor-pointer enabled:cursor-pointer disabled:bg-gray-500 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                                        <span className='text-xs'>در حال انجام...</span>
                                    </>
                                ) : (
                                    <span>بله</span>
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptMessage;