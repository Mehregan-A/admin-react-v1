export default function Loading() {
    return (
        <div className="mt-20 gap-5 flex flex-col items-center justify-center w-full text-gray-800 ">
            <div className="w-8 h-8 border-4 border-t-gray-700  border-cyan-100 dark:border-cyan-400 rounded-full animate-spin"></div>
            <p className="font-semibold">در حال بارگذاری صفحه...</p>
        </div>
    );
}