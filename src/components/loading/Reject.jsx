import {FaCircleXmark} from "react-icons/fa6";

export default function Reject() {
    return (
        <div className="mt-20 flex flex-col gap-5 items-center justify-center animate-pulse">
            <FaCircleXmark className={`text-sky-700`} size={35}/>
            <p className="font-semibold">خطا در دریافت اطلاعات</p>
        </div>
    );
}