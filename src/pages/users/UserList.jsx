import {useLocation, useParams} from "react-router-dom";
import {HiTrash} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {useNavigate} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaRegEdit, FaRegTrashAlt, FaTasks, FaUsers} from "react-icons/fa";
import {VscCircleSlash} from "react-icons/vsc";
import AcceptMessage from "../../components/AcceptMessage.jsx";
import {FaCirclePlus, FaLinkSlash} from "react-icons/fa6";
import {deleteAsyncUser, getAsyncListUser, getAsyncStatusUser, userClearResultDelete} from "../../feature/redux/UserSlice.jsx";
import {Config} from "../../config/Config.jsx";
import UserImage from "../../assets/images/User.png";
import {Toast} from "../../components/toast/Toast.jsx";
import AddUser from "./AddUser.jsx";
import DataTable from "../../components/dataTable/DataTable.jsx";
import {FiEdit, FiList, FiTrash2} from "react-icons/fi";
import {MdOutlineDirectionsCar, MdOutlineGroups, MdOutlineSupervisorAccount} from "react-icons/md";
import {IoBanOutline, IoCreateOutline, IoListOutline, IoTrashOutline} from "react-icons/io5";
import UserWoman from "../../assets/images/UserWomen.png"
import HeaderBox from "../../components/header/HeaderBox.jsx";

const UserList = () => {
    const [openAdd ,setOpenAdd] = useState({open:false})
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
    const { list_user,result_delete,isLoading_list,isError_list,isLoading_action } = useSelector(state => state.user);
// Effects
    useEffect(() => {
        if (page) {
            dispatch(getAsyncListUser({ row, page}));
            navigate(`/user/list/${row}/${page}`);
        }
    }, [row,page, dispatch, navigate]);
    // Open user form with selected id
    const setOpenId = (id,action) => {
        setOpenAdd({ open: true });
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
                await dispatch(deleteAsyncUser({ del: id }));
            } else if (actionType === "inactive") {
                await dispatch(getAsyncStatusUser({ Id: id }));
            }else if (actionType === "active") {
                await dispatch(getAsyncStatusUser({ Id: id }));
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
                dispatch(userClearResultDelete());
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(userClearResultDelete())
            }
        }
    }, [result_delete]);
    // Cancel modal
    const handleReject = useCallback(() => {
        setShowModal(false);
    }, []);
    useEffect(() => {
        if (isIdsEdit.action ==="show") {
            navigate(`/user/information/${isIdsEdit.id}`);
        }
    }, [isIdsEdit.action]);
    const ButtonWithTooltip = ({ onClick, icon, text, hoverColor }) => (
        <div className="relative group">
            <button onClick={onClick} className={`w-7 h-7 rounded-full flex items-center justify-center ${hoverColor} text-gray-700 cursor-pointer`}>
                {icon}
            </button>
            <span className={`absolute mb-1 px-2 py-1 text-xs text-gray-50 bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 left-0`}>
                {text}
            </span>
        </div>
    );
    const columns = [
        {
            name: "تصویر",
            selector: row =>
                <div className="w-14 h-14 rounded-full border-2 border-sky-700">
                    <img
                        src={row.image ? Config.apiImage + row.image : row.gender === "female" ?UserWoman:UserImage}
                        className="w-full h-full rounded-full object-cover"
                        alt="user"
                    />
                </div>,
        },
        {
            name: "نام",
            selector: row => row.full_name,
        },
        {
            name: "کد ملی",
            selector: row => row.national_code,
        },
        {
            name: "موبایل",
            selector: row => row.mobile,
        },
        {
            name: "جنسیت",
            selector: row => row.gender === "female" ? "خانم" : "آقا",
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
                        text="ویرایش کارمند"
                        hoverColor="hover:text-green-600"
                    />
                    <ButtonWithTooltip
                        onClick={() => handleActionRequest(row.status, row.id)}
                        icon={<IoBanOutline className="w-5 h-5" />}
                        text={`${row.status === "active"?"غیرفعال":"فعال"}`}
                        hoverColor="hover:text-yellow-600"
                    />
                    <ButtonWithTooltip
                        onClick={() => handleActionRequest("delete", row.id)}
                        icon={<IoTrashOutline className="w-5 h-5" />}
                        text="حذف"
                        hoverColor="hover:text-red-600"
                    />
                    <ButtonWithTooltip
                        onClick={() => setIdsEdit({ id: row.id, action: "show" })}
                        icon={<IoListOutline className="w-6 h-6" />}
                        text="ماموریت‌ها"
                        hoverColor="hover:text-sky-600"
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
            {/* Header */}
            <HeaderBox
                icon={MdOutlineGroups}
                iconSize={30}
                title="لیست کارمندان"
                actionButton={
                    <button className="flex self-end gap-2 items-center py-1.5 px-3 bg-gray-50  border hover:text-sky-700 border-sky-600  rounded-3xl cursor-pointer"  onClick={() => setOpenId("")}>
                        <FaCirclePlus size={20} className='flex-shrink-0 text-sky-700 hidden md:block' />
                        <span className='text-nowrap text-sm'>افزودن کارمند جدید</span>
                    </button>
                }
            />
            <DataTable
                icon={''}
                isLoading={isLoading_list}
                isError={isError_list}
                title=""
                data={list_user?.data}
                numberPage={list_user?.page}
                columns={columns}
            />
            {openAdd.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <AddUser
                        open_slider={openAdd.open}
                        open_close={() => setOpenAdd({ open: !openAdd.open })}
                        reload={() => dispatch(getAsyncListUser({ row, page }))}
                        Id={isIdsEdit.id}
                        list_user={list_user.data}
                    />
                </div>
            )}
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

export default UserList;