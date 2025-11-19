import {FaCircleXmark} from "react-icons/fa6";

export default function Reject() {
    return (
        <div className="mt-20 w-full flex flex-col gap-5 items-center justify-center animate-pulse">
            <FaCircleXmark className={`text-cyan-300`} size={35}/>
            <p className="font-semibold dark:text-gray-100">خطا در دریافت اطلاعات</p>
        </div>
    );
}