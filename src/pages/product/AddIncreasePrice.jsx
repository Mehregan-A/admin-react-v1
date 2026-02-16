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
import {LiaMoneyCheckSolid} from "react-icons/lia";
import {IncreasePrice, options} from "../../assets/data/Data.js";
import InputRadioButton from "../../components/inputs/InputRadioButton.jsx";
import * as yup from "yup";
import {postAsyncEditRules} from "../../feature/redux/RulesSlice.jsx";
import {useFormik} from "formik";

const AddIncreasePrice = ({close}) => {
    const initialValues = {
       value:""
    }
    const validationSchema = yup.object({
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit,
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
                        <div>
                            <InputRadioButton
                                formik={formik}
                                name="status"
                                label="نوع افزایش قیمت:"
                                list={IncreasePrice}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddIncreasePrice;