import React, {useEffect, useState} from 'react';
import {HiOutlinePencilAlt, HiOutlineX} from "react-icons/hi";
import {FiCheckCircle, FiTrash} from "react-icons/fi";
import {Config} from "../../../config/Config.jsx"
import http from "../../../services/Services.jsx";
import {Toast} from "../../toast/Toast.jsx";
import {HiMiniXMark} from "react-icons/hi2";
import {TfiGallery} from "react-icons/tfi";
import {BiTrash} from "react-icons/bi";
import AcceptMessage from "../../../AcceptMessage.jsx";
import Alert from "./Alert.jsx";

const GalleryMedia = ({setOpenGallery,refUpload,single,operator,selectedItem,setSelectedItem}) => {



    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(false);
    const [page, setPage] = useState(false);
    console.log(selectedItem)

    const [perPage, setPerPage] = useState(21);
    const [numberPage, setNumberPage] = useState(1);

    const GetMedia = async () => {
        setIsLoading(true);
        setIsError(false);
        setError(null);
        try {
            const result = await http.get(`/admin/media/list/${perPage}/${numberPage}`);
            setData(result.data.result.data);
            setCount(result.data.result.count);
            setPage(result.data.result.page);
        } catch (err) {
            setIsError(true);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        GetMedia();
    }, [numberPage]);

    const selectHandler = (input) => {
        if(single){
            setSelectedItem([input])
        }else {
            if (!selectedItem.some(val => val.id === input.id)) {
                setSelectedItem([...selectedItem, input])
            } else {
                const result = selectedItem.filter(val => val.id !== input.id)
                setSelectedItem([...result])
            }
        }
    }


    const addFileHandler = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size < 11000000) {
                UploadMediaAxios({file: e.target.files[0]}).then((res) => {
                    if (res.status === 200) {
                        Toast.success(res.data?.message)
                        setUploadPercent(100)
                        GetMedia()
                        setTimeout(() => {
                            setUploadPercent(0)
                        }, 1000)
                    } else {
                        Toast.warning(res.data?.message)
                        setUploadPercent(0)
                    }
                }).catch((err)=>{
                    Toast.warning(err.response.data?.message)
                    setUploadPercent(0)
                })
                refUpload.current.value = ""
            } else {
                Toast.warning("حجم فایل نباید بیشتر از 11mb باشد.")
            }
        }
    };

    const [uploadPercent, setUploadPercent] = useState(0)

    const UploadMediaAxios = async (payload) => {
        return await http.post("/admin/media/upload" ,payload)
    }


    const [showAlertPage, setShowAlertPage] = useState(false)
    const [showAlertValue, setShowAlertValue] = useState("")
    const showAlert = (input) => {
        setShowAlertPage(true)
        setShowAlertValue(input)
    }



    const removeMediaFunc = () => {
        removeMediaAxios({id : showAlertValue}).then((res) => {
            if (res.status === 200) {
                Toast.success(res.data?.message)
                GetMedia()
                setSelectedItem([])
                setShowAlertPage(false)
            } else {
                Toast.warning(res.data?.message)
                setShowAlertPage(false)
            }
        })
    }

    const removeMediaAxios = async (payload) => {
        return await http.delete("/admin/media/delete/"+ payload.id)
    }


    return (
        <div className={`fixed  inset-0 z-50   backdrop-blur flex flex-col items-center justify-center`}>
            <div className="bg-gray-50 shadow-lg dark:shadow-gray-500 rounded-tr-4xl rounded-bl-4xl dark:bg-gray-800 rounded p-5 max-w-[780px] lg:w-[780px] md:m-10 ">
                <div className="h-8 flex items-center justify-between text-gray-800 m-2">
                    <button
                        className="cursor-pointer hover:text-cyan-300 dark:text-gray-200 transition-colors"
                        onClick={() => {
                            setOpenGallery(false)
                        }}
                    >
                        <HiMiniXMark className="w-6 h-6 cursor-pointer" />
                    </button>
                    <div className="flex gap-2 items-center dark:text-gray-200 rounded-3xl">
                        <TfiGallery className="w-5 h-5" />
                        <span className="text-sm">انتخاب تصویر</span>
                    </div>
                </div>
                <div className='w-full h-px bg-cyan-300'></div>
                <div className="mt-3 border-2 border-dashed border-gray-300/60 items-center flex justify-center rounded-tr-2xl rounded-bl-2xl">
                    {/*p-8 border-4 border-separate dark:border-gray-500 mt-5 rounded border-dashed*/}
                    <div>
                        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
                            <label className="text-gray-700 text-sm font-bold dark:text-gray-200">
                                رسانه خود را انتخاب کنید
                            </label>

                            <input
                                ref={refUpload}
                                type="file"
                                id="hiddenFileInput"
                                onChange={(event) => addFileHandler(event)}
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => document.getElementById("hiddenFileInput").click()}
                                className="cursor-pointer inline-block  py-2  font-semibold  bg-cyan-400 rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)] hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)] active:scale-95 transition-all duration-400 ease-in-out select-none hover:text-white dark:hover:text-white text-xs text-gray-100 p-2 px-4"
                            >
                                انتخاب فایل
                            </button>
                        </div>
                    </div>
                    <div className="h-10">
                        {uploadPercent > 0 && (
                            <div className="w-full bg-neutral-200 dark:bg-neutral-600 my-5 rounded-full">
                                <div className="bg-cyan-300 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full" style={{width: `${uploadPercent}%`}}>
                                    {uploadPercent}%
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3 p-2 h-80  overflow-y-auto">
                    {/*{isLoading && (<Loading/>)}*/}
                    {/*{isError && (<Error isError={isError}/>)}*/}
                    {!isLoading && !isError && data && (
                        <div className="grid md:grid-cols-5 grid-cols-3 gap-5">
                            {data?.map((value, index) => {
                                return (
                                    <div key={index + 1} onClick={() => {
                                        selectHandler({id: parseInt(value.id), type: value.type, url: value.url ,alt : ""})
                                    }} className=" group  container object-center justify-center overflow-y-auto p-1 bg-white dark:bg-gray-700 drop-shadow-lg drop-shadow-gray-300 dark:drop-shadow-cyan-200 dark:hover:drop-shadow-cyan-300 hover:drop-shadow-gray-500 transition-all duration-350 rounded-2xl cursor-pointer relative">
                                        <img className="object-center container object-cover rounded-2xl" src={Config.apiImage + value.url} alt=""/>

                                        {/*{selectedItem && selectedItem?.length>0 && selectedItem?.find(item => item.id === parseInt(value.id)) && (*/}
                                        {/*    <FiCheckCircle size={30} className="absolute left-1/2 top-1/2 transition -translate-x-1/2 -translate-y-1/2 text-cyan-400 bg-white/40 rounded-full "/>*/}
                                        {/*)}*/}
                                        <div
                                            onClick={() => {
                                                showAlert(value.id)
                                            }}
                                            className="size-8 rounded-lg  text-gray-700 hover:text-gray-50  transition-all duration-300 cursor-pointer flex flex-row items-center justify-center gap-2 p-1 absolute top-0 left-0"
                                        >
                                            <BiTrash size={21} className="invisible group-hover:visible p-0.5 absolute left-1 top-1 text-cyan-300 bg-gray-50 hover:text-red-500 rounded-lg "/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    )}
                    <Alert showAlertPage={showAlertPage} setShowAlertPage={setShowAlertPage} title="اخطار" label="آیا برای حذف این فایل مطمئن هستید‌؟" onclick={removeMediaFunc}/>
                </div>
                <nav className="flex flex-col md:flex-row w-full gap-2 bg-slate-100/70 dark:bg-gray-800 shadow-md shadow-cyan-400 mt-3 justify-between items-center p-2 px-4 rounded-xl" aria-label="Table navigation">
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <span className="text-xs lg:font-normal text-slate-600 dark:text-slate-200">درحال نمایش </span>
                        <span className="text-xs md:font-bold text-slate-800 dark:text-white">{((parseInt(numberPage) - 1) * parseInt(perPage)) + 1}-{parseInt(perPage) * parseInt(numberPage) < count ? parseInt(perPage) * parseInt(numberPage) : count}</span>
                        <span className="text-xs lg:font-normal text-slate-600 dark:text-slate-200">از </span>
                        <span className="text-xs md:font-bold text-slate-900 dark:text-white">{count}</span>
                    </div>
                    {/*<Paging page={page} setNumberPage={setNumberPage} numberPage={numberPage}/>*/}
                </nav>
                <div className="py-3 flex justify-center">
                    <div onClick={() => {operator()}} className="cursor-pointer inline-block  py-2  font-semibold  bg-cyan-400 rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)] hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)] active:scale-95 transition-all duration-400 ease-in-out select-none hover:text-white dark:hover:text-white text-xs text-gray-100 p-2 px-4">
                        افزودن رسانه
                    </div>
                </div>

            </div>

        </div>
    );
};

export default GalleryMedia;