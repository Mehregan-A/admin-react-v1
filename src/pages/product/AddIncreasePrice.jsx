import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HiMiniXMark} from "react-icons/hi2";
import {LiaMoneyCheckSolid} from "react-icons/lia";
import {IncreasePriceOption, options} from "../../assets/data/Data.js";
import InputRadioButton from "../../components/inputs/InputRadioButton.jsx";
import * as yup from "yup";
import {postAsyncEditRules} from "../../feature/redux/RulesSlice.jsx";
import {useFormik} from "formik";
import IncreasePrices from "./IncreasePrice.jsx";
import {productAmazingSearchClearResult} from "../../feature/redux/AmazingProductSlice.jsx";
import {useNavigate} from "react-router";

const AddIncreasePrice = ({close}) => {
    const navigate = useNavigate();
    const initialValues = {
       value:""
    }
    const validationSchema = yup.object({
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        validateOnMount : true,
        enableReinitialize: true
    })
    return (
        <>
            <div className="fixed inset-0 z-20 flex items-center justify-center overflow-auto p-4">
                <div className={`absolute inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300 z-0 opacity-100`}/>

                <div  className="flex flex-col gap-2 w-full items-center">
                    <div className={`relative md:max-w-5xl w-full rounded-tr-4xl dark:shadow-gray-600 rounded-bl-4xl shadow-lg bg-gray-50 dark:bg-gray-800 transform transition-all duration-300 ease-in-out p-4 pt-1 opacity-100 scale-100 z-10`} >

                        <div className="h-8 flex items-center justify-between text-gray-800 m-2">
                            <button className="cursor-pointer hover:text-cyan-300 dark:text-gray-200 transition-colors" onClick={()=>{close()}}>
                                <HiMiniXMark className="w-6 h-6 cursor-pointer" />
                            </button>
                            <div className="flex gap-2 items-center dark:text-gray-200 rounded-3xl">
                                <LiaMoneyCheckSolid size={25} />
                                <span className="text-sm">افزایش قیمت</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-cyan-300"></div>
                        <div className="p-5">
                            <InputRadioButton
                                formik={formik}
                                name="value"
                                label="نوع افزایش قیمت:"
                                list={IncreasePriceOption}
                            />
                        </div>
                        <div className="w-full flex justify-center p-4">
                            {formik.values.value &&
                                <button onClick={()=>{close();navigate(`/product/increase/${formik.values.value}`)}} type="submit" className="w-full flex justify-center items-center gap-x-1 mt-1 px-2 md:py-2.5 py-2 rounded-lg md:rounded-lg disabled:bg-gray-500 bg-cyan-300 dark:bg-cyan-400 hover:bg-cyan-400 enabled:cursor-pointer text-gray-100 transition-colors">
                                    تایید
                                </button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddIncreasePrice;