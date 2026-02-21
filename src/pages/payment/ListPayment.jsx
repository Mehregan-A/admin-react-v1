import {useLocation, useParams} from "react-router-dom";
import CategoryNotFound from "../../assets/image/category_not_found.png"
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    categoryClearResultDelete,
    deleteAsyncCategory,
    getAsyncListCategory, getAsyncStatusCategory,
} from "../../feature/redux/CategorySlice.jsx";
import {Config} from "../../config/Config.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
import DataTable from "../../components/dataTable/DataTable.jsx";
import {IoBanOutline, IoCreateOutline, IoListOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
import {PiChartPieSlice} from "react-icons/pi";
import {getAsyncListPayment, getAsyncStatusPayment} from "../../feature/redux/PaymentSlice.jsx";
import zarinpal from "../../assets/image/zarnpal.png"
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";


const ListPayment = () => {
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
    const { list_payment,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.payment);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListPayment({ row, page}));
            navigate(`/payment/list/${row}/${page}`);
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
    const

        handleActionRequest = useCallback((type, id) => {
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
                await dispatch(deleteAsyncCategory({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusPayment({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusPayment({ Id: id }));
            }

            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }, [modalData, dispatch]);
    useEffect(() => {
        if(result_delete && result_delete?.status){
            if(result_delete.status === 200) {
                Toast.success(`${result_delete.data.message}`);
                dispatch(categoryClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(categoryClearResultDelete())
            }
        }
    }, [result_delete]);
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
            name: "نام کاربر",
            selector: row => row.full_name,
        },
        {
            name: "شماره سفارش",
            selector: row => row.order_id,
        },
        {
            name: "مبلغ",
            selector: row => row.amount,
        },
        {
            name: "درگاه",
            selector: row => {
                if (row.gateway_name==="zarinpal"){
                    return <div className="flex items-center gap-2">
                        <div>
                            {row.gateway_name==="zarinpal"?"زرین پال":"-"}
                        </div>
                        <div>
                           <img src={zarinpal} className="w-6 h-7"/>
                        </div>
                    </div>
                }
            },
        },
        {
            name: "شماره پیگیری",
            selector: row => row.ref_id,
        },
        {
            name: "وضعیت",
            selector: row => {
                if (row.status === "successful") {
                    return <div className="text-green-500">پرداخت</div>;
                } else if (row.status === "initiated") {
                    return <div className="text-cyan-500">در انتظار</div>;
                } else {
                    return <div className="text-red-500">ناموفق</div>;
                }
            }
        },
    ];
    useEffect(() => {
        if (openModal) {
            setOpenAdd({ open: !openAdd.open })
        }
    }, [openModal]);

    return (
        <div className={`flex flex-col gap-2`}>
            <div className='flex justify-between items-center p-2'>
                <HeaderBox text1={"داشبورد"} text2={false}  text3={"پرداخت"}/>
            </div>
            <DataTable
                icon={''}
                isLoading={isLoading_list}
                isError={isError_list}
                title=""
                data={list_payment?.data}
                numberPage={list_payment?.page}
                columns={columns}
            />
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

export default ListPayment;