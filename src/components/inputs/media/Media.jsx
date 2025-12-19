import React, {useEffect, useRef, useState} from 'react';
import {FiTrash} from "react-icons/fi";
import {MdDelete} from "react-icons/md";
import GalleryMedia from "./GalleryMedia.jsx";
import {Config} from "../../../config/Config.jsx"
import {FaCloudUploadAlt} from "react-icons/fa";
import {BiChevronLeft, BiChevronRight, BiTrash} from "react-icons/bi";
import { motion } from "framer-motion";


const Media = ({formik, name,formikAddress,single=false,label,desc = false ,classImg, classDiv=""}) => {

    const refUpload = useRef()
    const [openGallery,setOpenGallery] = useState(false)
    const [selectedItem, setSelectedItem] = useState(formikAddress)
    const [displayValue, setDisplayValue] = useState("");
    const [editImage, setEditImage] = useState(0);
    const [changeGallery,setChangeGallery]=useState("simple");

    useEffect(() => {
        setSelectedItem(formikAddress)
    },[formikAddress])

    const removeMedia = (id) =>{
        if(single){
            setSelectedItem([])
            formik.setFieldValue(name , "")
        }else {
            const result = formikAddress.filter(val => val.id != id)
            setSelectedItem([...result])
            formik.setFieldValue(name , result)
        }
    }

    useEffect(() => {
        if(openGallery === true){
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '17px'
        }else{
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }
    }, [openGallery])

    const addFormikHandler = () => {
        if(single){
            formik.setFieldValue(name , selectedItem[0].url)
        }else {
            formik.setFieldValue(name , selectedItem)
        }
        setTimeout(()=>{
            setOpenGallery(false)
        },[300])
    }
    useEffect(()=>{

    },[displayValue])
    const [index, setIndex] = useState(0);

    const maxIndex = Math.max(0, selectedItem.length - 5);

    const next = () => {
        setIndex((prev) => Math.min(prev -1 , maxIndex));
    };

    const prev = () => {
        setIndex((prev) => Math.max(prev +1 , 0));
    };
    const translateX = Math.min(index * 88, maxIndex * 88);
    console.log(changeGallery)


    return (
        <div className=" mt-2 rounded-2xl  w-full h-full">
            {single ? (
                <div className="flex justify-center border-2 border-dashed dark:border-gray-400 border-gray-200 dark:bg-gray-800 bg-gray-50 rounded-2xl">
                    <div className={`flex flex-col gap-2 items-center justify-center size-56  rounded-md mt-3 py-4 ${classDiv}`}>
                        <div className="w-full flex items-center justify-center">
                            {formikAddress && formikAddress !== null && formikAddress !== undefined ? (
                                <div className="bg-gray-300 rounded-lg max-h-20 w-28 overflow-hidden relative">
                                    {typeof formikAddress !== "object" ? (
                                        <img src={Config.apiImage + formikAddress} alt="تصویر آپلود شده" className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={URL.createObjectURL(formikAddress)} alt="تصویر انتخاب شده" className="w-full h-full object-cover" />
                                    )}

                                    {formikAddress && (
                                        <div
                                            className="size-7 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-gray-50 shadow-xl hover:bg-red-500 transition-all duration-300 cursor-pointer flex flex-row items-center justify-center gap-2 p-1 absolute top-0 left-0"
                                            onClick={() => removeMedia()}
                                        >
                                            <BiTrash className="dark:text-gray-100" size={20} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-gray-100 dark:bg-gray-800 drop-shadow-md drop-shadow-cyan-500 rounded-2xl  w-28 h-20 overflow-hidden flex flex-col items-center justify-center text-gray-500 text-xs">
                                    <FaCloudUploadAlt className="text-2xl animate-bounce mb-1 text-cyan-500" />
                                    <span  className='text-[10px] dark:text-gray-200 text-gray-800'>تصویر بارگذاری کنید</span>
                                </div>
                            )}
                        </div>
                        <div onClick={() => {setOpenGallery(true)}} className="cursor-pointer inline-block  py-2  font-semibold  bg-cyan-400 rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)] hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)] active:scale-95 transition-all duration-400 ease-in-out select-none hover:text-white dark:hover:text-white text-xs text-gray-100 p-2 px-4">{label}</div>
                        {desc && (<div className="px-3  text-sm text-gray-400" ><p>{desc}</p></div>)}
                    </div>
                </div>
            ) : (
                <div className="border-2 bg-gray-50 dark:bg-gray-800 border-dashed border-gray-300/60 border-grayMe rounded-xl p-7">
                    <div className="flex gap-2 items-center">
                        <span className="text-xs text-gray-600 dark:text-green-100">نمایش پیشرفته</span>
                        <label className='flex cursor-pointer select-none items-center'>
                            <div className='relative'>
                                <input
                                    type='button'
                                    onClick={(e)=>changeGallery==="simple"?setChangeGallery("flex"):setChangeGallery("simple")}
                                    className='sr-only'
                                />
                                <div
                                    className={`box block h-6 w-11 border border-cyan-300 rounded-full ${
                                        changeGallery==="simple" ? 'bg-gray-300' : 'bg-cyan-400'
                                    }`}
                                ></div>
                                <div
                                    className={`absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${
                                        changeGallery==="simple" ? 'translate-x-full' : ''
                                    }`}
                                ></div>
                            </div>
                        </label>
                    </div>
                    {changeGallery==="simple" &&
                        <div>
                            <div onClick={() => {setOpenGallery(true)}} className="bg-cyan-400 rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)] hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)] active:scale-95 transition-all duration-400 ease-in-out cursor-pointer text-xs w-40 rounded-l-md p-2 mt-5 px-4 text-white">{label}</div>
                            {formikAddress && formikAddress.length > 0 && (
                                <div className="mt-6">
                                    <div className="gap-6 grid xl:grid-cols-2 grid-cols-1 p-4">
                                        {formikAddress?.map((item, index) => (
                                            <div key={index} className="flex relative items-center bg-gray-50 dark:bg-gray-800 dark:shadow-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                                <div className="relative overflow-hidden group p-1.5">
                                                    <img
                                                        src={Config.apiImage + item.url}
                                                        alt={item.alt || "تصویر محصول"}
                                                        className="w-32 h-24 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <button
                                                        onClick={() => removeMedia(item.id)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    >
                                                        <FiTrash size={18} />
                                                    </button>
                                                </div>
                                                <div className="p-3 w-full">
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alt:</label>
                                                    <input
                                                        {...formik.getFieldProps(`${name}[${index}]['alt']`)}
                                                        type="text"
                                                        className="w-full text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    {changeGallery === "flex" && (
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 px-4 w-full">

                            {/* Left section */}
                            <div className="w-full lg:w-1/2 py-4">
                                <div className="w-full flex flex-col gap-4 px-2">

                                    <div
                                        onClick={() => setOpenGallery(true)}
                                        className="bg-cyan-400 w-full sm:w-40 text-center rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)]
                     hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)]
                     active:scale-95 transition-all duration-300 cursor-pointer text-xs p-2 text-white"
                                    >
                                        {label}
                                    </div>

                                    {selectedItem.length > 0 && (
                                        <div className="flex flex-col gap-4">

                                            {/* Alt input */}
                                            <div className="flex flex-col gap-1">
                                                <label
                                                    htmlFor={name}
                                                    className="text-xs font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    alt:
                                                </label>
                                                <input
                                                    {...formik.getFieldProps(`${name}[${editImage}]['alt']`)}
                                                    type="text"
                                                    className="h-10 rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-800
                           text-sm text-gray-900 dark:text-gray-200 px-2
                           focus-visible:outline-0 focus-visible:border-cyan-300"
                                                />
                                            </div>

                                            {/* Thumbnails */}
                                            <div className="p-2 border border-gray-200 rounded-xl relative shadow-lg dark:shadow-gray-700">

                                                {selectedItem.length > 5 && (
                                                    <>
                                                        <button
                                                            onClick={next}
                                                            disabled={index === maxIndex}
                                                            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10
                               bg-white shadow rounded-full w-8 h-8 flex items-center justify-center"
                                                        >
                                                            <BiChevronRight size={20} />
                                                        </button>
                                                        <button
                                                            onClick={prev}
                                                            disabled={index === 0}
                                                            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10
                               bg-white shadow rounded-full w-8 h-8 flex items-center justify-center"
                                                        >
                                                            <BiChevronLeft size={20} />
                                                        </button>
                                                    </>
                                                )}

                                                <div className="overflow-hidden p-1">
                                                    <motion.div
                                                        className="flex gap-3"
                                                        animate={{
                                                            x: selectedItem.length > 5 ? translateX : 0,
                                                        }}
                                                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                                    >
                                                        {selectedItem.map((item, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={() => setEditImage(i)}
                                                                className="shrink-0 p-2 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800"
                                                            >
                                                                <img
                                                                    src={Config.apiImage + item.url}
                                                                    alt="تصویر"
                                                                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl cursor-pointer"
                                                                />
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right section (Preview image) */}
                            <div className="w-full lg:w-1/2 py-4 flex justify-center">
                                {selectedItem.length > 0 && (
                                    <img
                                        src={Config.apiImage + selectedItem[editImage].url}
                                        alt="تصویر آپلود شده"
                                        className="w-full max-w-md h-56 sm:h-64 lg:h-72 object-cover rounded-lg shadow-lg cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                    )}

                </div>
            )}

            {openGallery &&
                <GalleryMedia operator ={()=>{addFormikHandler()}}
                              single={single}
                              setOpenGallery = {setOpenGallery}
                              refUpload={refUpload}
                              selectedItem={selectedItem}
                              setSelectedItem={setSelectedItem}
                />
            }

        </div>
    );
};

export default Media;
