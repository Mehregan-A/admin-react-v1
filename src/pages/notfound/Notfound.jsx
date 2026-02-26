import {FaExclamationTriangle} from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className="mt-20 flex flex-col gap-5 items-center justify-center animate-pulse">
            <FaExclamationTriangle  className={`text-cyan-300`} size={35}/>
            <p className="font-semibold text-gray-600 dark:text-gray-100">صفحه مورد نظر یافت نشد</p>
        </div>
    );
};

export default NotFoundPage;