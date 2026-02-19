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
    productClearResultDelete
} from "../../feature/redux/ProductSlice.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";
import AddIncreasePrice from "./AddIncreasePrice.jsx";
import {getIn, useFormik} from "formik";

const IncreasePrices = () => {
    const { type } = useParams();
    const [openAdd, setOpenAdd] = useState({ open: false });
    const [changePrice, setChangePrice] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ actionType: "", id: "", text: "" });

    const location = useLocation();
    const openModal = location.state?.openModal;

    const dispatch = useDispatch();

    const { list_product_all, result_delete, isLoading } = useSelector(
        state => state.product
    );

    useEffect(() => {
        dispatch(getAsyncListProductAll());
    }, [dispatch]);

    // Toast result
    useEffect(() => {
        if (result_delete?.status) {
            if (result_delete.status === 200) {
                Toast.success(result_delete.data.message);
            } else {
                Toast.error(result_delete.data.message);
            }
            dispatch(productClearResultDelete());
        }
    }, [result_delete, dispatch]);

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
        initialValues: list_product_all || [],
        enableReinitialize: true,
        onSubmit: (values) => {

            const updated = values.map(product => ({...product, list: product.list?.map(item => ({...item, price: changePrice
                        ? (type === "percent"
                            ? Math.round(Number(item.price) + Number(item.price) * (Number(changePrice) / 100))
                            : Math.round(Number(item.price) + Number(changePrice)))
                        : item.price
                }))
            }));

            dispatch(postAsyncIncreaseProducts({data: updated}));
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

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center p-2">
                <HeaderBox text1="داشبورد" text2="محصولات" text3="افزایش قیمت" />
            </div>

            <div className="w-full gap-2 flex items-center justify-between py-2 px-6 bg-gray-50 rounded-2xl shadow-lg">
                <span className="text-sm w-24">
                    {type === "percent" ? "افزایش درصدی" : "افزایش عددی"}
                </span>

                <input
                    className={`focus-visible:border-cyan-300 border border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus-visible:outline-0 block w-full p-2 px-2 pr-2`}
                    value={changePrice}
                    onChange={e => setChangePrice(e.target.value)}
                />
                <button
                    type="button"
                    onClick={formik.handleSubmit}
                    disabled={isLoading}
                    className={`flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl enabled:cursor-pointer disabled:bg-gray-500  bg-cyan-400 enabled:hover:bg-cyan-500} 
                                            text-gray-50 text-sm transition-colors`}
                >
                    {isLoading ? "در حال ثبت..." : "ثبت"}
                </button>
            </div>

            {formik.values?.map((item) => (
                <div key={item.id} className="bg-gray-50 flex w-full mt-3 gap-4 items-center rounded-xl p-3">
                    <div className="w-18 h-18 flex items-center  justify-center">
                        <img
                            src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                            alt="amazing"
                            className="hexagon-img"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-semibold">{item.title}</span>

                        {item.list?.map((val) => (
                            <div key={val.id} className="flex items-center gap-3 text-sm">
                                <div>
                                    قیمت فعلی: {val.price} تومان
                                </div>

                                {changePrice && (
                                    <div className="text-green-600">
                                        قیمت جدید: {changePriceHandler(Number(val.price))}
                                    </div>
                                )}

                                <div className="text-xs text-gray-500">
                                    ({val.varient_label})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

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
