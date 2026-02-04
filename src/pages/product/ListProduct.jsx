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
import {deleteAsyncProduct, getAsyncListProduct, productClearResultDelete} from "../../feature/redux/ProductSlice.jsx";
import {persianDateNT} from "../../components/utility/persianDateNT.js";
import ColoredShadowImage from "../../components/shadow/DynamicShadowImage.jsx";
import HeaderBox from "../../components/headerBox/HeaderBox.jsx";


const ListProduct = () => {
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
    const { list_product,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.product);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListProduct({ row, page}));
            navigate(`/product/list/${row}/${page}`);
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
         if (type === "delete"){
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
                await dispatch(deleteAsyncProduct({ del: id }));
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
            selector: row => (
                <ColoredShadowImage
                    src={row.image ? Config.apiImage + row.image : CategoryNotFound}
                />
            ),
        },



        {
            name: "نام محصول",
            selector: row => row.title,
        },
        {
            name: "url",
            selector: row => row.url,
        },
        {
            name: "چکیده",
            selector: row => row.abstract,
        },
        {
            name: " وضعیت انتشار",
            selector: row => row.status === "published" ? <div className={`text-green-500`}>انتشار</div> :  <div className={`text-yellow-400`}>پیش نویس</div>
        },
        {
            name: "زمان انتشار",
            selector: row => persianDateNT.unixWithoutTime(row.publish_at),
        },
        {
            name: "عملیات",
            style: {
                width: '100px'
            },
            selector: row => (
                <div className="flex lg:justify-center gap-0.5">
                    <ButtonWithTooltip
                        onClick={() => navigate(`/product/add/${row.id}`)}
                        icon={<IoCreateOutline className="w-5 h-5" />}
                        text="ویرایش محصول"
                        hoverColor="hover:text-green-600 dark:hover:text-emerald-400"
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
                <HeaderBox text1={"داشبورد"} text2={false}  text3={"محصولات"}/>
            </div>
            <DataTable
                url={'/product/add'}
                nameButton={"افزودن محصول"}
                isLoading={isLoading_list}
                isError={isError_list}
                title=""
                data={list_product?.data}
                numberPage={list_product?.page}
                columns={columns}
            />
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
        </div>
    );
};

export default ListProduct;