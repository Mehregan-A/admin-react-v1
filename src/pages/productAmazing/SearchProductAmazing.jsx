import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark} from "react-icons/hi2";
import {FaMagnifyingGlass, FaXmark} from "react-icons/fa6";
import {
    postAsyncSearchAmazingProduct,
    productAmazingSearchClearResult
} from "../../feature/redux/AmazingProductSlice.jsx";
import {BsListUl} from "react-icons/bs";
import Loading from "../../components/loading/Loading.jsx";
import Reject from "../../components/loading/Reject.jsx";
import {BiSolidError} from "react-icons/bi";
import {Config} from "../../config/Config.jsx";
import CategoryNotFound from "../../assets/image/category_not_found.png";

const SearchProductAmazing = ({close,formik}) => {
    const [inputSearch,setInputSearch] = useState("");

    const {isLoading_search,search} = useSelector(state => state.amazingProduct);
    const dispatch = useDispatch();


    const onSubmit = () => {
        if(inputSearch && inputSearch !== "" && inputSearch.trim() !== "") {
            dispatch(postAsyncSearchAmazingProduct({ search: inputSearch }));
        }
    };

    const handleCheckBox=(input)=>{
        const result = formik.values.list.find(val => val.sku_code === input.sku_code)
        if(!result){
            formik.setFieldValue('list',[...formik.values.list,input]);
        }else {
            const data = formik.values.list.filter(val => val.sku_code !== input.sku_code)
            formik.setFieldValue('list',data);
        }
    }
    return (
        <>
            <div className="fixed inset-0 z-20 flex items-center justify-center overflow-auto p-4">
                <div className={`absolute inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 z-0 opacity-100`}/>

                <div  className="flex flex-col gap-2 w-full items-center">
                    <div className={`relative md:max-w-5xl w-full rounded-tr-4xl dark:shadow-gray-600 rounded-bl-4xl shadow-lg bg-gray-50 dark:bg-gray-800 transform transition-all duration-300 ease-in-out p-4 pt-1 opacity-100 scale-100 z-10`} >

                        <div className="h-8 flex items-center justify-between text-gray-800 m-2">
                            <button className="cursor-pointer hover:text-cyan-300 dark:text-gray-200 transition-colors" onClick={()=>{close();dispatch(productAmazingSearchClearResult());}}>
                                <HiMiniXMark className="w-6 h-6 cursor-pointer" />
                            </button>
                            <div className="flex gap-2 items-center dark:text-gray-200 rounded-3xl">
                                <BsListUl className="w-5 h-5" />
                                <span className="text-sm">ویژگی ها</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-cyan-300"></div>

                        <div className="h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-3xl p-2 space-y-5">

                            <div className="flex w-full items-center gap-2">
                                <div className="w-full relative">
                                    <input value={inputSearch} onChange={(e)=>{setInputSearch(e.target.value)}} type="text" className="focus-visible:border-cyan-300 border-gray-300 border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 pr-6"/>
                                    <FaMagnifyingGlass className="absolute right-1.5 -translate-y-6.5 text-sm text-gray-400" />
                                    {/* clean search */}
                                    <button tabIndex={-1} type="button" onClick={()=>{setInputSearch("")}} className="absolute left-2 -translate-y-7 text-cyan-300 cursor-pointer">
                                        <FaXmark size={20} />
                                    </button>
                                </div>

                                {/* search button */}
                                <button onClick={()=>{onSubmit()}} type="submit" className=" w-32 flex justify-center items-center gap-x-1 mt-1  px-2 md:py-2.5 py-2 rounded-lg md:rounded-lg disabled:bg-gray-500 bg-cyan-300 hover:bg-cyan-400 enabled:cursor-pointer text-gray-200 transition-colors">
                                    {isLoading_search ? (
                                        <>
                                            <span className="text-xs md:text-sm text-gray-50">جست و جو</span>
                                            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        </>
                                    ) : (
                                        <span className="text-xs md:text-sm text-gray-50">جست و جو</span>
                                    )}
                                </button>
                                <button onClick={()=>{close();dispatch(productAmazingSearchClearResult());}} type="submit" className=" w-32 flex justify-center items-center gap-x-1 mt-1  px-2 md:py-2.5 py-2 rounded-lg md:rounded-lg disabled:bg-gray-500 bg-cyan-300 hover:bg-cyan-400 enabled:cursor-pointer text-gray-100 transition-colors">
                                    تایید
                                </button>
                            </div>

                                <div >
                                    {/*pc*/}
                                <div className="hidden md:flex flex-col gap-3">

                            {/* Header */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-bold">
                                <div>تصویر</div>
                                <div>نام محصول</div>
                                <div>url</div>
                                <div>کد</div>
                            </div>

                            {/* Body */}
                            {isLoading_search ? (
                                <Loading />
                            ): search?.data?.result?.length > 0 ? (
                                    search?.data?.result?.map((row, rowIndex) => (
                                        <div key={rowIndex} className="grid grid-cols-4 gap-4 px-4 py-3 items-center rounded-xl bg-gray-50 dark:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-900 text-sm">
                                            <div className="w-18  flex items-center justify-center">
                                                <div className="hexagon-shadow">
                                                    <img src={row.image ? Config.apiImage + row.image : CategoryNotFound} alt="category" className="hexagon-img" />
                                                </div>
                                            </div>

                                            <div>{row.title}</div>

                                            <div>{row.url}</div>

                                            <div className="flex flex-col gap-2 items-center">
                                                {row.list?.map((item, index) => (
                                                    <div key={index} className="grid grid-cols-4 gap-4 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm">
                                                        <label key={index} className="flex items-center gap-2 cursor-pointer select-none">
                                                            <input type="checkbox" onChange={() => handleCheckBox(item)} className="hidden peer" />
                                                            <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-cyan-300 peer-checked:border-cyan-300 transition">
                                                                <svg className="w-3 h-3 text-white scale-0 peer-checked:scale-100 transition" viewBox="0 0 20 20" fill="currentColor">
                                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                                </svg>
                                                              </span>
                                                            <span className="text-sm text-nowrap">{item.sku_code}</span>
                                                        </label>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="flex flex-col items-center py-20 gap-3 text-gray-500">
                                    <BiSolidError size={32} />
                                    <span>موردی برای نمایش وجود ندارد</span>
                                </div>
                            )}

                        </div>
                        {/* mobile*/}
                                    <div className="block md:hidden">
                                        {search?.data?.result?.map((row, index) => (
                                            <div key={index} className="flex flex-col gap-2 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <div key={index} className="flex flex-col  gap-4">
                                                    <div className="hexagon-shadow">
                                                        <img src={row.image ? Config.apiImage + row.image : CategoryNotFound} alt="category" className="hexagon-img" />
                                                    </div>
                                                    <span className="flex bg-gray-100 p-3 rounded-xl items-center gap-4 text-xs font-bold text-gray-700">
                                                  <div>نام محصول:</div>
                                                        {row.title}
                                              </span>
                                                    <span className="flex bg-gray-100 p-3 rounded-xl items-center gap-4 text-xs font-bold text-gray-700">
                                                 <div>url :</div>
                                                        {row.url}
                                              </span>
                                                </div>
                                                <div className="flex flex-col gap-2 ">
                                                    {row.list?.map((item, index) => (
                                                        <div key={index} className=" flex gap-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm">
                                                            <div>کد :</div>
                                                            <label key={index} className="flex items-center gap-2 cursor-pointer select-none">
                                                                <span className="text-sm text-nowrap">{item.sku_code}</span>
                                                                <input type="checkbox" onChange={() => handleCheckBox(item)} className="hidden peer" />
                                                                <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-cyan-300 peer-checked:border-cyan-300 transition">
                                                                <svg className="w-3 h-3 text-white scale-0 peer-checked:scale-100 transition" viewBox="0 0 20 20" fill="currentColor">
                                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                                </svg>
                                                              </span>
                                                            </label>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                    </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchProductAmazing;