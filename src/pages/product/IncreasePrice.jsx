import {useLocation, useParams} from "react-router-dom";
import CategoryNotFound from "../../assets/image/category_not_found.png"
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Config} from "../../config/Config.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
import AcceptMessage from "../../AcceptMessage.jsx";
import {
    getAsyncListProductAll, postAsyncIncreaseProducts,
    productClearResultDelete
} from "../../feature/redux/ProductSlice.jsx";

import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import AddIncreasePrice from "./AddIncreasePrice.jsx";

import {useFormik} from "formik";
import * as yup from "yup";


const IncreasePrices = () => {
    const { type } = useParams();
    const [openAdd ,setOpenAdd] = useState({open:false})
    const navigate = useNavigate();
    const location = useLocation();
    const openModal = location.state?.openModal;
    // AcceptMessage.jsx module
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ actionType: "", id: "", text: "" });
    const [changePrice, setChangePrice] = useState();

// Redux
    const dispatch = useDispatch();
    const initialValues = {
        title:'',
        url:'',
        logo:'',
        is_featured:"",
        status: ""
    }
    const validationSchema = yup.object({
        title: yup
            .string()
            .required('عنوان برند الزامی است')
            .min(2, 'عنوان باید حداقل 2 کاراکتر باشد')
            .max(30, 'عنوان نباید بیشتر از 30 کاراکتر باشد'),
        url: yup
            .string()
            .required('آدرس URL الزامی است')
            .max(50, 'آدرس نباید بیشتر از 50 کاراکتر باشد'),

    });
    const onSubmit = (values) => {
        dispatch(postAsyncIncreaseProducts(values))
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit,
        validateOnMount : true
    })
// List article selector
    const { list_product_all,result_delete,isLoading_action,isLoading } = useSelector(state => state.product);
// Effects
    useEffect(() => {
            dispatch(getAsyncListProductAll());
    }, [dispatch, navigate]);
    useEffect(() => {
        if(result_delete && result_delete?.status){
            if(result_delete.status === 200) {
                Toast.success(`${result_delete.data.message}`);
                dispatch(productClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(productClearResultDelete())
            }
        }
    }, [result_delete]);
    // Cancel modal
    const handleReject = useCallback(() => {
        setShowModal(false);
    }, []);
    useEffect(() => {
        if (openModal) {
            setOpenAdd({ open: !openAdd.open })
        }
    }, [openModal]);

    const changePriceHandler = (value) => {
        if (type==="percent"){
            const priceIncrease=value*(changePrice/100)
            return priceIncrease+value
        }else {
            return value+Number(changePrice)
        }
    }

    return (
        <div className={`flex flex-col gap-2`}>
            <div className='flex justify-between items-center p-2'>
                <HeaderBox text1={"داشبورد"} text2={"محصولات"}  text3={"افزایش قیمت"}/>
            </div>
            <div className="w-full flex items-center justify-between py-2 px-6 dark:bg-gray-700/30 bg-gray-50 rounded-2xl shadow-lg dark:shadow dark:shadow-cyan-300">
                <span className="text-sm w-24 text-gray-700 dark:text-gray-100">{type==="percent"?"افزایش درصدی":"افزایش عددی"}</span>
                <input maxLength={type==="percent"?100:10000000000} className={`focus-visible:border-cyan-300 border bg-gray-100 border-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 pr-2`}
                         value={changePrice} onChange={e => setChangePrice(e.target.value)} />
                {/* Submit */}
                <div className="flex justify-center">
                    <button
                        disabled={!formik.isValid || isLoading}
                        type="submit"
                        className={`w-full flex justify-center items-center gap-x-2 px-4 py-2 rounded-2xl enabled:cursor-pointer disabled:bg-gray-500  bg-cyan-400 enabled:hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                <span>در حال ثبت...</span>
                            </>
                        ) : (
                            <span>ثبت</span>
                        )}
                    </button>
                </div>
            </div>
            {list_product_all && list_product_all?.map((item,index)=>{
                return (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 flex w-full mt-3 gap-4 items-center rounded-xl p-3">
                        <div className="flex flex-col md:flex-row gap-4 items-center ">
                            <div className="w-18 h-18 flex items-center  justify-center">
                                <img
                                    src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                    alt="amazing"
                                    className="hexagon-img"
                                />
                            </div>
                            <div className="flex text-gray-800 dark:text-gray-100 flex-col gap-1">
                                <span className=" text-lg font-semibold">{item.title}</span>
                                <div className="items-center flex gap-1 text-sm">
                                    <span className="">قیمت فعلی:</span>
                                    <span className="">{item.list?.map((val,index)=>{
                                        return (
                                            <div className="flex items-center justify-between gap-3">
                                                <div key={index}>
                                                    {val.price}تومان

                                                </div>
                                                {changePrice &&
                                                    <div>
                                                        قیمت افزایش یافته:{changePriceHandler(val.price)}
                                                    </div>
                                                }
                                                <div className="text-xs">
                                                    ({val.varient_label})
                                                </div>
                                            </div>
                                        )
                                    })}
                                    </span>
                                </div>
                                <div className="items-center flex gap-0.5 text-sm">
                                    <span className="">{item.sku_code}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {/*{openAtt.open && (*/}
            {/*    <div className="fixed inset-0 z-50 flex items-center justify-center">*/}
            {/*        <AttributeCategory*/}
            {/*            open_slider={openAtt.open}*/}
            {/*            open_close={() => setOpenAtt({ open: !openAtt.open })}*/}
            {/*            reload={() => dispatch(getAsyncListCategory({ row, page }))}*/}
            {/*            Id={isIdsEdit.id}*/}
            {/*            list_product={list_product.data}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
            {showModal && (
                <AcceptMessage
                    isLoading={isLoading_action}
                    text={modalData.text}
                    accept={handleAccept}
                    reject={handleReject}
                    open_close={() => setShowModal(!showModal)}
                    showModal={showModal}
                />
            )}
            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddIncreasePrice close={() => setOpenAdd({ open: false })}/>
                </div>
            )}
        </div>
    );
};

export default IncreasePrices;