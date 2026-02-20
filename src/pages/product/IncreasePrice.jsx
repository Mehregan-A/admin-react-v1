import { useLocation, useParams } from "react-router-dom";
import CategoryNotFound from "../../assets/image/category_not_found.png";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Config } from "../../config/Config.jsx";
import { Toast } from "../../components/toast/Toast.jsx";
import AcceptMessage from "../../AcceptMessage.jsx";
import {
    getAsyncListProductAll,
    postAsyncIncreaseProducts,
    productClearResultDelete, productClearResultIncrease
} from "../../feature/redux/ProductSlice.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import AddIncreasePrice from "./AddIncreasePrice.jsx";
import {getIn, useFormik} from "formik";
import login from "../auth/Login.jsx";

const IncreasePrices = () => {
    const { type } = useParams();
    const [openAdd, setOpenAdd] = useState({ open: false });
    const [changePrice, setChangePrice] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ actionType: "", id: "", text: "" });

    const location = useLocation();
    const openModal = location.state?.openModal;

    const dispatch = useDispatch();

    const { list_product_all, result, isLoading,result_increase } = useSelector(
        state => state.product
    );

    useEffect(() => {
        dispatch(getAsyncListProductAll());
    }, [dispatch]);

    // Toast result
    useEffect(() => {
        if (result_increase?.status) {
            if (result_increase.status === 200) {
                Toast.success(result_increase.data.message);
                dispatch(getAsyncListProductAll());
                setChangePrice("")
            } else {
                Toast.error(result_increase.data.message);
            }
            dispatch(productClearResultIncrease());
        }
    }, [result_increase, dispatch]);

    const changePriceHandler = (value) => {
        if (!changePrice) return value;

        if (type === "percent") {
            const increase = value * (Number(changePrice) / 100);
            return Math.round(value + increase);
        } else {
            return Math.round(value + Number(changePrice));
        }
    };

    const formik = useFormik({
        initialValues: {
            data: list_product_all || []
        },
        enableReinitialize: true,
        onSubmit: (values) => {

            const updated = values.data.map(product => ({
                ...product,
                list: product.list.map(item => {
                    if (!item.checked) return item;

                    return {
                        ...item,
                        price: changePrice
                            ? (type === "percent"
                                ? Math.round(Number(item.price) + Number(item.price) * (Number(changePrice) / 100))
                                : Math.round(Number(item.price) + Number(changePrice)))
                            : item.price
                    };
                })
            }));

            dispatch(postAsyncIncreaseProducts({ data:updated }));
        }
    });

    const handleReject = useCallback(() => {
        setShowModal(false);
    }, []);

    useEffect(() => {
        if (openModal) {
            setOpenAdd({ open: true });
        }
    }, [openModal]);
    const handleCheckBox = (productId, skuCode) => {
        const updated = formik.values.data.map(product => {
            if (product.id !== productId) return product;


            return {
                ...product,
                list: product.list.map(item =>
                    item.sku_code === skuCode
                        ? { ...item, checked: !item.checked }
                        : item
                )
            };
        });
        formik.setFieldValue("data", updated);
    };
    const allSelected = formik.values.data?.every(product =>
        product.list.every(item => item.checked)
    );
    const handleSelectAll = () => {
        const updated = formik.values.data.map(product => ({
            ...product,
            list: product.list.map(item => ({
                ...item,
                checked: !allSelected
            }))
        }));

        formik.setFieldValue("data", updated);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center p-2">
                <HeaderBox text1="داشبورد" text2="محصولات" text3="افزایش قیمت" />
            </div>

            <div className="w-full gap-2 flex items-center justify-between py-2 px-6 bg-gray-50 dark:bg-gray-700 dark:shadow-gray-600 rounded-2xl shadow-md">
                <span className="text-sm w-24 dark:text-gray-100 text-gray-700">
                    {type === "percent" ? "افزایش درصدی" : "افزایش عددی"}
                </span>

                <input
                    className={`focus-visible:border-cyan-300 border border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 pr-2`}
                    value={changePrice}
                    onChange={e => setChangePrice(e.target.value)}
                    maxLength={type === "percent" ? 3 : 10000000000000000000}
                />
                <button
                    type="button"
                    onClick={formik.handleSubmit}
                    disabled={isLoading}
                    className={`flex justify-center items-center gap-x-3 px-4 py-2 rounded-xl enabled:cursor-pointer disabled:bg-gray-500  bg-cyan-400 enabled:hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                >
                    {isLoading ? "در حال ثبت..." : "ثبت"}
                </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 my-2 rounded-2xl ">
                <div className="grid grid-cols-4 gap-4 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            className="hidden peer"
                        />
                        <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-cyan-300 peer-checked:border-cyan-300 transition">
                        <svg
                            className="w-3 h-3 text-white scale-0 peer-checked:scale-100 transition"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                        <span className="text-sm text-nowrap text-gray-700 dark:text-gray-100">{allSelected ? "لغو انتخاب همه" : "انتخاب همه"}</span>
                    </label>
                </div>
                {formik.values.data?.map((item) => (
                    <div key={item.id} className="bg-gray-200/70 dark:bg-gray-800 flex w-full mt-3 gap-4 items-center rounded-xl p-3">
                        <div className="w-18 h-18 flex items-center  justify-center">
                            <img
                                src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                alt="amazing"
                                className="hexagon-img"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-semibold dark:text-gray-100 text-gray-700">{item.title}</span>

                            {item.list?.map((val) => (
                                <div key={val.id} className="flex items-center gap-3 dark:text-gray-100 text-gray-700 text-sm">
                                    <div>
                                        قیمت فعلی: {val.price} تومان
                                    </div>

                                    {changePrice && val.checked && (
                                        <div className="text-green-600">
                                            قیمت جدید: {changePriceHandler(Number(val.price))}
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-500">
                                        ({val.varient_label})
                                    </div>
                                    <div>
                                        <div key={val.id} className="grid grid-cols-4 gap-4 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm">
                                            <label key={val.id} className="flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={val.checked || false}
                                                    onChange={() => handleCheckBox(item.id, val.sku_code)}
                                                    className="hidden peer"
                                                />
                                                <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-cyan-300 peer-checked:border-cyan-300 transition">
                                                                <svg className="w-3 h-3 text-white scale-0 peer-checked:scale-100 transition" viewBox="0 0 20 20" fill="currentColor">
                                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                                </svg>
                                                              </span>
                                                <span className="text-sm text-nowrap">{val.sku_code}</span>
                                            </label>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            {showModal && (
                <AcceptMessage
                    text={modalData.text}
                    accept={() => {}}
                    reject={handleReject}
                    open_close={() => setShowModal(false)}
                    showModal={showModal}
                />
            )}

            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddIncreasePrice close={() => setOpenAdd({ open: false })} />
                </div>
            )}
        </div>
    );
};

export default IncreasePrices;
