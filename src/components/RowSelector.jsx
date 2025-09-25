import { useLocation, useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";

const PerPageSelector = ({ searchParams }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const pathParts = location.pathname.split("/").filter(Boolean);
    const perPageFromUrl = pathParts[pathParts.length - 2];
    const perPage = parseInt(perPageFromUrl) || 10;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const options = [2, 5, 10, 50, 100, 150, 200];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const changeRowNum = (input) => {
        const newPathParts = [...pathParts];
        newPathParts[newPathParts.length - 2] = input;
        newPathParts[newPathParts.length - 1] = "1";
        let newPath = `/${newPathParts.join("/")}`;

        if (searchParams) {
            newPath += `${searchParams}`;
        }

        navigate(newPath);
        localStorage.setItem(newPathParts.slice(0, -2).join("/"), `${input}/1,`);
        setDropdownOpen(false);
    };

    return (
        <div className="flex justify-end py-3">
            <div ref={dropdownRef} className="group relative w-full max-w-[160px]">
                <div
                    className="cursor-pointer border bg-gray-100 text-gray-900 text-sm rounded-lg block w-full p-2 pl-8 border-gray-300 relative focus-visible:outline-0"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    role="listbox"
                    aria-haspopup="true"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setDropdownOpen((prev) => !prev);
                        }
                    }}
                >
                    {perPage} عدد

                    <BiChevronLeft
                        size={22}
                        className={`absolute left-2 top-1/2 transform -translate-y-1/2 transition-transform duration-300 text-sky-800 ${
                            dropdownOpen ? "-rotate-90" : ""
                        }`}
                    />
                </div>

                <div
                    tabIndex={-1}
                    className={`z-30 absolute top-full left-0 right-0 transition-[max-height,opacity] duration-300 ease-in-out w-full rounded-lg bg-gray-50 shadow h-64 overflow-hidden scrollbar${
                        dropdownOpen
                            ? "max-h-60 opacity-100 pointer-events-auto mt-0.5"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                >
                    {options.map((num) => (
                        <div
                            key={num}
                            onClick={() => changeRowNum(num)}
                            className="cursor-pointer p-2 text-sm rounded-lg hover:bg-sky-700 hover:text-white transition-colors duration-200"
                        >
                            {num} عدد
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PerPageSelector;