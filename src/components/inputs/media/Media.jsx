import {useEffect, useRef, useState} from 'react';
import {FiTrash} from "react-icons/fi";
import {MdDelete} from "react-icons/md";
import GalleryMedia from "./GalleryMedia.jsx";
import {Config} from "../../../config/Config.jsx"
import {FaCloudUploadAlt} from "react-icons/fa";
import {BiTrash} from "react-icons/bi";


const Media = ({formik, name,formikAddress,single=false,label,desc = false ,classImg, classDiv=""}) => {

    const refUpload = useRef()
    const [openGallery,setOpenGallery] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])


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

    return (
        <div className="border-2 border-dashed border-gray-300/60 p-3 mt-2 rounded-2xl bg-gray-50 dark:bg-gray-800 w-full h-full">
            {single ? (
                <div className="flex justify-center">
                    <div className={`flex flex-col gap-2 items-center justify-center size-56  rounded-md mt-3 py-4 ${classDiv}`}>
                        <div className="w-full flex items-center justify-center">
                            {formikAddress && formikAddress !== null && formikAddress !== undefined ? (
                                <div className="bg-gray-300 rounded-lg max-h-20 w-full overflow-hidden relative">
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
                                <div className="bg-gray-100 dark:bg-gray-800 drop-shadow-md drop-shadow-cyan-500 rounded-2xl h-20 w-28 overflow-hidden flex flex-col items-center justify-center text-gray-500 text-xs">
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
                <div className="mt-10 border border-grayMe rounded-xl py-5">
                    <div onClick={() => {setOpenGallery(true)}} className="bg-green-500 hover:bg-green-700 cursor-pointer text-xs w-40 rounded-l-md p-2 mt-5 px-4 text-white">{label}</div>
                    {desc && (<div className=" px-2 mt-5 text-sm text-gray-400"><p>{desc}</p></div>)}
                    { Boolean(formikAddress) && formikAddress.length > 0 && (
                        <div className="flex flex-row flex-wrap gap-2 mt-5 rounded p-2 ">
                            {(formikAddress) && formikAddress.length > 0 && formikAddress.map(($value,index)=>{
                                return(
                                    <div key={index+2} className={` ${classImg} flex w-32 h-32 object-center container justify-center overflow-hidden border-2 border-grayMe  p-1 bg-gray-100  rounded-md  hover:bg-gray-300 cursor-pointer relative`}>
                                        <img className={`object-center container rounded-md object-cover `} src={Config.apiImage + $value.url} alt=""/>
                                        {formikAddress.find(value => value.id === $value.id) && (
                                            <FiTrash onClick={() => {removeMedia($value.id)}} size={20} className="absolute left-1 top-1 text-white bg-red-500 rounded-full p-0.5 "/>
                                        )}
                                    </div>
                                )
                            })}
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
