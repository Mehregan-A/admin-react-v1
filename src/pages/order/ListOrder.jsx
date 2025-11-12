import {useLocation, useParams} from "react-router-dom";
import CategoryNotFound from "../../assets/image/category_not_found.png"
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Config} from "../../config/Config.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
import DataTable from "../../components/dataTable/DataTable.jsx";
import {IoBanOutline, IoCreateOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import {
    BrandClearResultDelete,
    deleteAsyncBrand,
    getAsyncListBrand,
    getAsyncStatusBrand
} from "../../feature/redux/BrandSlice.jsx";
import {getAsyncListOrder, getAsyncStatusOrder} from "../../feature/redux/OrderSlice.jsx";
import DataTableOrder from "../../components/dataTable/DataTableOrder.jsx";
import {persianDateNT} from "../../components/utility/persianDateNT.js";
import {HiOutlineDocumentMagnifyingGlass} from "react-icons/hi2";


const ListOrder = () => {
    const [openAdd ,setOpenAdd] = useState({open:false})
    const [openAtt ,setOpenAtt] = useState({open:false})
    const navigate = useNavigate();
    const location = useLocation();
    const openModal = location.state?.openModal;
    // AcceptMessage.jsx module
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ actionType: "", id: "", text: "" });
    const [isIdsEdit,setIdsEdit] = useState({id:"",action:""});
// Redux
    const dispatch = useDispatch();
    const { page,row } = useParams();
// List article selector
    const { list_order,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.order);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListOrder({ row, page}));
            navigate(`/order/list/${row}/${page}`);
        }
    }, [row,page, dispatch, navigate]);
    // Open user form with selected id
    const setOpenId = (id,action) => {
        setOpenAdd({ open: true });
        setIdsEdit({id,action});
    };
    const setOpenIdAtt = (id,action) => {
        setOpenAtt({ open: true });
        setIdsEdit({id,action});
    };
    // Handle delete or deactivate action
    const handleActionRequest = useCallback((type, id) => {
        if (type === "active"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را غیرفعال کنید؟"
            setModalData({ actionType: type, id, text });
        }else if (type === "inactive"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را فعال کنید؟"
            setModalData({ actionType: type, id, text });
        }else if (type === "delete"){
            const text = "آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟"
            setModalData({ actionType: type, id, text });
        }
        setShowModal(true);
    }, []);

    // Confirm delete/deactivate
    const handleAccept = useCallback(async () => {
        try {
            const { actionType, id } = modalData;

            if (actionType === "delete") {
                await dispatch(deleteAsyncBrand({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusOrder({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusOrder({ Id: id }));
            }

            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }, [modalData, dispatch]);
    // Cancel modal
    const handleReject = useCallback(() => {
        setShowModal(false);
    }, []);
    const ButtonWithTooltip = ({ onClick, icon, text, hoverColor }) => (
        <div className="relative group">
            <button onClick={onClick} className={`w-7 h-7 rounded-full flex items-center justify-center ${hoverColor} text-gray-700 dark:text-gray-100 cursor-pointer`}>
                {icon}
            </button>
            <span className={`absolute mb-1 px-2 py-1 text-xs text-gray-700 dark:text-gray-100 dark:bg-gray-800 bg-gray-100 rounded-lg drop-shadow-lg  drop-shadow-gray-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 left-0`}>
                {text}
            </span>
        </div>
    );
    const columns = [
        {
            name: "تصویر",
            selector: (row) => {
                const maxImages = 4;
                const items = row.order_items || [];
                const visibleItems = items.slice(0, maxImages);
                const extraCount = items.length - maxImages;
                const count = visibleItems.length;

                if (count < 3) {
                    return (
                        <div className="flex items-center justify-start">
                            {visibleItems.map((item, index) => (
                                <div key={index} className="hexagon-shadow">
                                    <img
                                        src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                        className="hexagon-img"
                                        alt="category"
                                    />
                                </div>
                            ))}
                        </div>
                    );
                }
                return (
                    <div className="flex flex-col justify-start">
                        <div className="flex gap-3 mb-[-40px] justify-start pl-0">
                            {visibleItems.slice(2, 3).map((item, index) => (
                                <div key={index} className="hexagon-shadow">
                                    <img
                                        src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                        className="hexagon-img"
                                        alt="category"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-start mr-14">
                            {visibleItems.slice(0, 1).map((item, index) => (
                                <div key={index} className="hexagon-shadow">
                                    <img
                                        src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                        className="hexagon-img"
                                        alt="category"
                                    />
                                </div>
                            ))}
                            {extraCount > 0 && (
                                <div className="w-5 h-5 mt-7 mr-1 flex items-center justify-center rounded-lg bg-cyan-400  text-gray-100">
                                    +{extraCount}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-[-40px] justify-start  pl-0">
                            {visibleItems.slice(1, 2).map((item, index) => (
                                <div key={index} className="hexagon-shadow">
                                    <img
                                        src={item.image ? Config.apiImage + item.image : CategoryNotFound}
                                        className="hexagon-img"
                                        alt="category"
                                    />
                                </div>
                            ))}
                        </div>


                    </div>
                );
            },
        },
        {
            name: "شماره سفارش",
            selector: row => row.order_no,
        },
        {
            name: "جمع کل مبلغ نهایی",
            selector: row => row.grand_total,
        },
        {
            name: "هزینه ارسال",
            selector: row => row.shipping_fee,
        },
        {
            name: "زمان ثبت سفارش",
            selector: row =>persianDateNT.date(row.placed_at) ,
        },
        {
            name: "وضعیت",
            selector: row => {
                if (row.status === "basket") {
                    return <div className={`text-white green-500 bg-cyan-400 rounded-lg p-1 w-14 text-xs`}>سبد خرید</div>
                } else if (row.status === "shipped") {
                    return <div className={`text-white green-500 bg-green-400 rounded-lg p-1 w-16 text-xs`}>ارسال شده</div>
                } else if (row.status === "cancelled") {
                    return <div className={`text-white green-500 bg-red-400 rounded-lg p-1 w-16 text-xs`}>کنسل شده</div>
                }
                else if (row.status === "paid") {
                    return <div className={`text-white green-500 bg-yellow-400 rounded-lg p-1 w-17 text-xs`}>پرداخت شده</div>
                }
                else if (row.status === "pending") {
                    return <div className={`text-white green-500 bg-purple-400 rounded-lg p-1 w-9 text-xs`}>انتظار</div>
                }else {
                    return <div className="text-red-500">ناموفق</div>;
                }
            }
        },
        {
            name: "عملیات",
            style: {
                width: '100px'
            },
            selector: row => (
                <div className="flex lg:justify-center gap-0.5">
                    <ButtonWithTooltip
                        onClick={() => navigate(`/order/detail/${row.id}`)}
                        icon={<HiOutlineDocumentMagnifyingGlass className="w-6 h-6" />}
                        text="مشاهده جزئیات"
                        hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                    />
                    <ButtonWithTooltip
                        onClick={() => handleActionRequest(row.status, row.id)}
                        icon={<IoBanOutline className="w-5 h-5" />}
                        text={`${row.status === "active"?"غیرفعال":"فعال"}`}
                        hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                    />
                </div>
            )
        }
    ];
    useEffect(() => {
        if (openModal) {
            setOpenAdd({ open: !openAdd.open })
        }
    }, [openModal]);

    return (
        <div className={`flex flex-col gap-2`}>
            <div className='flex justify-between items-center p-2'>
                <div className='flex justify-start gap-2 p-5'>
                    <div className="text-gray-400 dark:text-gray-300">  داشبورد   |  </div>
                    <div className="text-cyan-700 dark:text-cyan-400">سفارشات</div>
                </div>
            </div>
            <DataTableOrder
                icon={''}
                isLoading={isLoading_list}
                isError={isError_list}
                title=""
                data={list_order?.data}
                numberPage={list_order?.page}
                columns={columns}
            />
            {/*{openAdd.open && (*/}
            {/*    <div className="fixed inset-0 z-50 flex items-center justify-center">*/}
            {/*        <AddBrand*/}
            {/*            open_slider={openAdd.open}*/}
            {/*            open_close={() => setOpenAdd({ open: !openAdd.open })}*/}
            {/*            reload={() => dispatch(getAsyncListBrand({ row, page }))}*/}
            {/*            Id={isIdsEdit.id}*/}
            {/*            list_brand={list_brand.data}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{openAtt.open && (*/}
            {/*    <div className="fixed inset-0 z-50 flex items-center justify-center">*/}
            {/*        <AttributeCategory*/}
            {/*            open_slider={openAtt.open}*/}
            {/*            open_close={() => setOpenAtt({ open: !openAtt.open })}*/}
            {/*            reload={() => dispatch(getAsyncListCategory({ row, page }))}*/}
            {/*            Id={isIdsEdit.id}*/}
            {/*            list_brand={list_brand.data}*/}
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
        </div>
    );
};

export default ListOrder;