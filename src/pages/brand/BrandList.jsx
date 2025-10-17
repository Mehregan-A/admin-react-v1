import {useLocation, useParams} from "react-router-dom";
import CategoryNotFound from "../../assets/image/category_not_found.png"
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    categoryClearResultDelete
} from "../../feature/redux/CategorySlice.jsx";
import {Config} from "../../config/Config.jsx";
import {Toast} from "../../components/toast/Toast.jsx";
import DataTable from "../../components/dataTable/DataTable.jsx";
import {IoBanOutline, IoCreateOutline, IoListOutline, IoTrashOutline} from "react-icons/io5";
import AcceptMessage from "../../AcceptMessage.jsx";
// import AddCategory from "./AddCategory.jsx";
import {PiChartPieSlice} from "react-icons/pi";
import {
    BrandClearResultDelete,
    deleteAsyncBrand,
    getAsyncListBrand,
    getAsyncStatusBrand
} from "../../feature/redux/BrandSlice.jsx";
import AddBrand from "./AddBrand.jsx";
// import AttributeCategory from "./AttributeCategory.jsx";


const BrandList = () => {
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
    const { list_brand,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.brand);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListBrand({ row, page}));
            navigate(`/brand/list/${row}/${page}`);
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
                await dispatch(getAsyncStatusBrand({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusBrand({ Id: id }));
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
                dispatch(BrandClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(BrandClearResultDelete())
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
            name: "تصویر",
            selector: row =>
                <div className="w-14 h-14 rounded-full shadow-lg shadow-cyan-300 ">
                    <img
                        src={row.logo ? Config.apiImage + row.logo : CategoryNotFound}
                        className="w-full h-full rounded-b-4xl rounded-t-lg object-cover"
                        alt="category"
                    />
                </div>,
        },
        {
            name: "نام برند",
            selector: row => row.title,
        },
        {
            name: "url",
            selector: row => row.url,
        },
        {
            name: " وضعیت",
            selector: row => row.status === "active" ? <div className={`text-green-500`}>فعال</div> :  <div className={`text-red-500`}>غیرفعال</div>
        },
        {
            name: "عملیات",
            style: {
                width: '100px'
            },
            selector: row => (
                <div className="flex lg:justify-center gap-0.5">
                    <ButtonWithTooltip
                        onClick={() => setOpenId(row.id, "edit")}
                        icon={<IoCreateOutline className="w-5 h-5" />}
                        text="ویرایش برند"
                        hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
                    />
                    <ButtonWithTooltip
                        onClick={() => handleActionRequest(row.status, row.id)}
                        icon={<IoBanOutline className="w-5 h-5" />}
                        text={`${row.status === "active"?"غیرفعال":"فعال"}`}
                        hoverColor="hover:text-yellow-600 dark:hover:text-yellow-400"
                    />
                    <ButtonWithTooltip
                        onClick={() => handleActionRequest("delete", row.id)}
                        icon={<IoTrashOutline className="w-5 h-5" />}
                        text="حذف"
                        hoverColor="hover:text-red-600 dark:hover:text-red-400"
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
                    <div className="text-cyan-700 dark:text-cyan-400">برند</div>
                </div>
                <button
                    onClick={() => setOpenId("")}
                    className='flex justify-center items-center gap-2 p-3 bg-gray-100 dark:hover:bg-gray-800/90 hover:bg-gray-200 dark:bg-gray-800 border dark:border-0 border-cyan-300 dark:inset-shadow-sm inset-shadow-gray-900 dark:inset-shadow-cyan-400  drop-shadow-lg dark:drop-shadow-gray-500 dark:hover:drop-shadow-cyan-400 transition-all cursor-pointer rounded-2xl w-32 dark:text-gray-200 text-sm'>افزودن دسته بندی</button>

            </div>
            <DataTable
                icon={''}
                isLoading={isLoading_list}
                isError={isError_list}
                title=""
                data={list_brand?.data}
                numberPage={list_brand?.page}
                columns={columns}
            />
            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddBrand
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListBrand({ row, page }))}
                        Id={isIdsEdit.id}
                        list_brand={list_brand.data}
                    />
                </div>
            )}
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

export default BrandList;