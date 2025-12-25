import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark} from "react-icons/hi2";
import {FaMagnifyingGlass, FaXmark} from "react-icons/fa6";
import {postAsyncSearchAmazingProduct} from "../../feature/redux/AmazingProductSlice.jsx";
import {BsListUl} from "react-icons/bs";

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
        console.log("result",result)
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
                            <button
                                className="cursor-pointer hover:text-cyan-300 dark:text-gray-200 transition-colors"
                                onClick={()=>{close()}}
                            >
                                <HiMiniXMark className="w-6 h-6 cursor-pointer" />
                            </button>
                            <div className="flex gap-2 items-center dark:text-gray-200 rounded-3xl">
                                <BsListUl className="w-5 h-5" />
                                <span className="text-sm">ویژگی ها</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-cyan-300"></div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-2 space-y-5">

                            <div className="flex w-full items-center gap-2">
                                <div className="w-full relative">
                                    <input value={inputSearch} onChange={(e)=>{setInputSearch(e.target.value)}} type="text" className="p-2 bg-gray-200 rounded "/>

                                    <FaMagnifyingGlass className="absolute right-1.5 -translate-y-6.5 text-sm text-gray-400" />

                                    {/* clean search */}
                                    <button
                                        tabIndex={-1}
                                        type="button"
                                        onClick={()=>{setInputSearch("")}}
                                        className="absolute left-2 -translate-y-7 text-cyan-300 cursor-pointer"
                                    >
                                        <FaXmark size={20} />
                                    </button>
                                </div>

                                {/* search button */}
                                <button
                                    onClick={()=>{onSubmit()}}
                                    type="submit"
                                    className=" w-32 flex justify-center items-center gap-x-1 mt-1  px-2 md:py-2.5 py-2 rounded-lg md:rounded-lg disabled:bg-gray-500 bg-cyan-300 hover:bg-cyan-400 enabled:cursor-pointer text-gray-200 transition-colors"
                                >
                                    {isLoading_search ? (
                                        <>
                                            <span className="text-xs md:text-sm text-gray-50">جست و جو</span>
                                            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        </>
                                    ) : (
                                        <span className="text-xs md:text-sm text-gray-50">جست و جو</span>
                                    )}
                                </button>
                            </div>

                            {search?.data && search?.data?.result && search?.data?.result?.length > 0  && search?.data?.result?.map((val,index) => (
                                <div key={index}>
                                    <div>{val.title}</div>
                                    {val.list?.map((item, index) => (
                                        <div onClick={()=>{handleCheckBox(item)}} key={index}>{item.sku_code}</div>
                                    ))}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchProductAmazing;