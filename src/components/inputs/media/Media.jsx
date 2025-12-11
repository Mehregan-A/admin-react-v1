import React, {useEffect, useRef, useState} from 'react';
import {FiTrash} from "react-icons/fi";
import {MdDelete} from "react-icons/md";
import GalleryMedia from "./GalleryMedia.jsx";
import {Config} from "../../../config/Config.jsx"
import {FaCloudUploadAlt} from "react-icons/fa";
import {BiTrash} from "react-icons/bi";
import Input from "../Input.jsx";


const Media = ({formik, name,formikAddress,single=false,label,desc = false ,classImg, classDiv=""}) => {

    const refUpload = useRef()
    const [openGallery,setOpenGallery] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [displayValue, setDisplayValue] = useState("");


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
    const handleChange = (e) => {
        let value = e.target.value
        selectedItem.map((item)=>{
            item.alt = value;
            setDisplayValue(item.alt);

        })
        formik.handleChange(e);
        console.log(selectedItem);

    };

    const x = {
        seo_title : "ali",
        gallery : [
            {url : "dddd" , name : "ddd" ,alt : "Dddd"}, //0
            {url : "dddd" , name : "ddd" ,alt : "Dddd"}, //1
            {url : "dddd" , name : "ddd" ,alt : "Dddd"}, //2
            {url : "dddd" , name : "ddd" ,alt : "Dddd"}, //3
        ]
    }

    ///name : "seo_title"
    //name : gallery[1].alt
    //name : gallery[index][alt]


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
                <div className="border-2 bg-gray-50 dark:bg-gray-800 border-dashed border-gray-300/60 border-grayMe rounded-xl py-5">
                    <div onClick={() => {setOpenGallery(true)}} className="bg-cyan-400 rounded-lg shadow-[0_3px_10px_rgba(14,165,233,0.6)] hover:bg-cyan-500 hover:shadow-[0_4px_15px_rgba(14,165,233,0.8)] active:scale-95 transition-all duration-400 ease-in-out cursor-pointer text-xs w-40 rounded-l-md p-2 mt-5 px-4 text-white">{label}</div>
                    {desc && (<div className=" px-2 mt-5 text-sm text-gray-400"><p>{desc}</p></div>)}
                    { Boolean(formikAddress) && formikAddress.length > 0 && (
                        <div className="flex flex-row flex-wrap gap-2 mt-5 rounded p-2">
                            {(formikAddress) && formikAddress.length > 0 && formikAddress.map(($value,index)=>{
                                return(
                                    <div className="flex flex-row gap-2">
                                        <div key={index+2} className={` ${classImg} flex w-32 h-32 object-center container justify-center overflow-hidden border-2 border-grayMe  p-1 bg-gray-100  rounded-md  hover:bg-gray-300 cursor-pointer relative`}>
                                            <img className={`object-center container rounded-md object-cover `} src={Config.apiImage + $value.url} alt=""/>
                                            {formikAddress.find(value => value.id === $value.id) && (
                                                <FiTrash onClick={() => {removeMedia($value.id)}} size={20} className="absolute left-1 top-1 text-white bg-red-500 rounded-full p-0.5 "/>
                                            )}

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    <div className="grid grid-cols-4 p-2 gap-2">
                        {selectedItem.map((item,index)=>{
                            return (
                                <div className=" rounded-lg items-center bg-gray-50 dark:bg-gray-800 border border-cyan-300 p-2 flex flex-col max-w-56 gap-5 ">
                                    <img src={Config.apiImage + item.url} alt="تصویر آپلود شده" className="w-28 h-full object-cover rounded-2xl" />
                                    <div>
                                        <label
                                            htmlFor={name}
                                            className="mb-1 flex flex-row justify-start text-xs font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            alt:
                                        </label>
                                        <input {...formik.getFieldProps(`${name}[${index}]['alt']`)} type="text" className="focus-visible:border-cyan-300 border border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block h-10 p-2 px-2 pr-2"/>
                                     </div>
                                </div>

                            )
                        })}
                    </div>
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
