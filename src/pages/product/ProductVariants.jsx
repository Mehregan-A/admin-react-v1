import React, {useEffect, useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Input from "../../components/inputs/Input.jsx";
import {HiOutlineChevronDown} from "react-icons/hi";
import {Toast} from "../../components/toast/Toast.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteAsyncVariantAttributeVal,
    getAsyncListVariantAttributeVal,
    postAsyncAddVariantAttributeVal, variantAttributeValClearDelete, variantAttributeValClearResult
} from "../../feature/redux/VariantAttributeValueSlice.jsx";
import {getAsyncListVariantAttributeSelect} from "../../feature/redux/VariantAttributeSlice.jsx";
import {VscSettings} from "react-icons/vsc";

// Empty variant template
const emptyVariant = {
    id: "",
    option_ids: [],
    option_labels: [],
    price: "",
    discount_price: "",
    current_stock: "",
    weight: "",
    stock_order_limit: "",
    isConfirmed: false,
};

const ProductVariants = ({variantAttributes, formik, isLoadingOptions,}) => {
    const dispatch = useDispatch();
    const [label, setLabel] = useState("");
    const [value, setValue] = useState("");
    const { list_variant_attribute_val,isLoading,isError_list,result,result_delete,isLoading_list,isLoading_action } = useSelector(state => state.variantAttributeValue);

    const [openVariant, setOpenVariant] = useState(null);
    const [activeVariantIndex, setActiveVariantIndex] = useState(0);
    const variants = formik.values.variants;


    // Toggle option selection for a variant
    const handleOptionChange = (variantIndex, option, attributeValue) => {
        if (variants.length === 0) {
            const newVariant = {
                ...emptyVariant,
                option_ids: [option.id],
                option_labels: [option.label],
                id:attributeValue
            };

            formik.setFieldValue("variants", [newVariant]);
            setActiveVariantIndex(0);
            return;
        }

        const path = `variants.${variantIndex}`;

        const currentOptions = variants[variantIndex].option_ids || [];
        const currentLabels = variants[variantIndex].option_labels || [];

        const attributeOptions =
            variantAttributes.find(attr => attr.value === attributeValue)?.options || [];

        const filteredOptions = currentOptions.filter(
            id => !attributeOptions.some(opt => opt.id === id)
        );

        const filteredLabels = currentLabels.filter(
            label => !attributeOptions.some(opt => opt.label === label)
        );

        formik.setFieldValue(`${path}.option_ids`, [...filteredOptions, option.id]);
        formik.setFieldValue(`${path}.option_labels`, [...filteredLabels, option.label]);
    };

    // Confirm variant and create next empty one
    const confirmVariant = (index) => {
        if (variants[index].option_ids.length === 0) {
            Toast.warning(`حداقل یک ویژگی انتخاب شود`);
            return;
        }
        if (isDuplicateVariant(index)) {
            Toast.warning(`این ترکیب ویژگی‌ها قبلاً ثبت شده است`);
            return;
        }

        const updated = [...variants];
        updated[index].isConfirmed = true;

        if (index === updated.length - 1) {
            updated.push({ ...emptyVariant });
        }

        formik.setFieldValue("variants", updated);
        setActiveVariantIndex(index + 1);
    };


    // Remove variant
    const removeVariant = (index) => {
        const updated = variants.filter((_, i) => i !== index);
        formik.setFieldValue("variants", updated);
        setActiveVariantIndex(Math.max(0, index - 1));
    };
    const isDuplicateVariant = (currentIndex) => {
        const currentOptions = [...(variants[currentIndex].option_ids || [])].sort();

        return variants.some((variant, index) => {
            if (index === currentIndex) return false;
            if (!variant.isConfirmed) return false;

            const otherOptions = [...(variant.option_ids || [])].sort();

            return (
                currentOptions.length === otherOptions.length &&
                currentOptions.every((id, i) => id === otherOptions[i])
            );
        });
    };
    useEffect(() => {
        if(result && result?.status){
            if(result.status === 200) {
                // toast
                Toast.success(`${result.data.message}`);
                dispatch(getAsyncListVariantAttributeSelect())
                // dispatch(getAsyncListVariantAttributeVal({Id:openVariant}));
                dispatch(variantAttributeValClearResult())
            }else{
                // toast
                Toast.error(`${result.data.message}`);
                dispatch(variantAttributeValClearResult())
            }
        }
    }, [result]);
    useEffect(() => {
        if(result_delete && result_delete?.status){
            if(result_delete.status === 200) {
                Toast.success(`${result_delete.data.message}`);
                dispatch(variantAttributeValClearDelete());
                dispatch(getAsyncListVariantAttributeSelect())
            }else{
                // toast
                Toast.error(`${result_delete.data.message}`);
                dispatch(variantAttributeValClearDelete())
            }
        }
    }, [result_delete]);


    return (
        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl  p-4">
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-start gap-3">
                    <div className="flex gap-2 items-center dark:text-gray-100 text-gray-700 py-2 pt-2">
                        <VscSettings size={20}/>
                        <span className="text-sm">قیمت گذاری</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-gray-600 text-xs font-semibold dark:text-gray-100">قیمت گذاری پیشرفته</span>
                        <label className='flex cursor-pointer select-none items-center'>
                            <div className='relative'>
                                <input
                                    type='button'
                                    onClick={(e)=>formik.setFieldValue("pricing_type",formik.values.pricing_type==="simple"?"flex":"simple")}
                                    className='sr-only'
                                />
                                <div
                                    className={`box block h-6 w-11 border border-cyan-300 rounded-full ${
                                        formik.values.pricing_type==="simple" ? 'bg-gray-300' : 'bg-cyan-400'
                                    }`}
                                ></div>
                                <div
                                    className={`absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${
                                        formik.values.pricing_type==="simple" ? 'translate-x-full' : ''
                                    }`}
                                ></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            {/* Variant attribute selector */}
            {variantAttributes.length>0 && variantAttributes?.map((attr) => (
                <div
                    key={attr.value}
                    onClick={() =>
                        setOpenVariant(openVariant === attr.value ? null : attr.value)
                    }
                    className="w-full  items-center border border-gray-300 p-2 rounded-lg cursor-pointer"
                >
                    <div className="w-full flex justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-100">{attr.label}</span>
                        <HiOutlineChevronDown
                            className={`text-cyan-300 transition-transform duration-300 
                                                                 ${openVariant === attr.value ? "rotate-180" : ""}`}
                        />
                    </div>

                    <AnimatePresence>
                        {openVariant === attr.value && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="w-full grid grid-cols-2 gap-2 mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg"
                            >
                                {isLoadingOptions && (
                                    <div className="col-span-2 text-center text-sm text-gray-400">
                                        لطفا صبر کنید...
                                    </div>
                                )}
                                <form
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full col-span-2"
                                >
                                    <div className="flex w-full items-center gap-2">

                                        <div className="w-full">
                                            <label className="block text-xs mb-1 text-gray-600 dark:text-gray-200">
                                                نام ویژگی
                                            </label>
                                            <input
                                                type="text"
                                                value={label}
                                                onChange={(e) => setLabel(e.target.value)}
                                                className="w-full h-9.5 px-3 rounded-lg border border-gray-300  bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                            />
                                        </div>

                                        <div className="w-full">
                                            {attr.label === "رنگ" ? (
                                                <label className="bg-gray-100 dark:bg-gray-800 w-full inline-flex items-center mt-4.5 gap-3 px-4 py-1.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition relative">
                                                    <input
                                                        type="color"
                                                        className="absolute w-6 h-6 opacity-0 cursor-pointer"
                                                        onChange={(e) => setValue(e.target.value.slice(1))}
                                                    />
                                                    <span
                                                        className="w-6 h-6 rounded-md border border-gray-300"
                                                        style={{ backgroundColor: value ? `#${value}` : "#fff" }}
                                                    />
                                                    <span className="text-sm text-gray-600 dark:text-gray-100">
                                                    انتخاب کنید
                                                </span>
                                                </label>
                                            ) : (
                                                <>
                                                    <label className="block text-xs mb-1 text-gray-500 dark:text-gray-200">
                                                        مقدار ویژگی
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => setValue(e.target.value)}
                                                        className="w-full h-10 px-3 rounded-lg border border-gray-300  bg-white dark:bg-gray-800  text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                                    />
                                                </>
                                            )}
                                        </div>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    disabled={isLoading}
                                                    onClick={() => {
                                                        if (!label.trim()) return;

                                                        dispatch(
                                                            postAsyncAddVariantAttributeVal({
                                                                label: label.trim(),
                                                                value: value.trim(),
                                                                Id: attr.value,
                                                            })
                                                        );

                                                        setLabel("");
                                                        setValue("");
                                                    }}
                                                    className="flex h-10 text-xs justify-center items-center gap-x-2 px-2 py-0.5 rounded-lg enabled:cursor-pointer disabled:bg-gray-500 bg-cyan-400 enabled:hover:bg-cyan-500 text-gray-50 transition-colors"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            <span>افزودن...</span>
                                                        </>
                                                    ) : (
                                                        <span>افزودن</span>
                                                    )}
                                                </button>
                                            </div>

                                    </div>
                                </form>


                                {!isLoadingOptions &&
                                    attr.options?.map((opt) => (
                                        <form
                                            key={opt.value}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-2 text-sm cursor-pointer"
                                        >
                                            {attr.label === "رنگ" && (
                                                <span
                                                    className="w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: `#${opt.value}` }}
                                                />
                                            )}
                                            <span className="text-gray-700 dark:text-gray-100">{opt.label}</span>
                                            <input
                                                type="radio"
                                                name={`variant-${activeVariantIndex}-${attr.value}`}
                                                checked={variants?.[activeVariantIndex]?.option_ids?.includes(opt.id)}
                                                onChange={() =>
                                                    handleOptionChange(activeVariantIndex, opt, attr.value)
                                                }
                                            />
                                            <button
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => {

                                                    dispatch(
                                                        deleteAsyncVariantAttributeVal({
                                                            variant_option_id:opt.id,
                                                            del: attr.value
                                                        })
                                                    );
                                                }}
                                                className="cursor-pointer hover:text-red-400 transition-color text-gray-700 dark:text-gray-100"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                        <IoTrashOutline size={16}/>
                                                    </>
                                                ) : (
                                                    <IoTrashOutline size={16}/>
                                                )}
                                            </button>

                                        </form>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
            <div className="w-full h-px dark:bg-cyan-200 my-4 bg-gray-300"></div>
            {/* Variant items */}
            {[...variants].reverse().map((variant, reversedIndex) => {
                const index = variants.length - 1 - reversedIndex;
                const isActive = index === activeVariantIndex;

                return (
                    <div
                        key={index}
                        className={`rounded-xl p-4 transition border-2 border-dashed border-gray-200 dark:border-gray-400  ${
                            isActive
                                ? "bg-gray-50 dark:bg-gray-800"
                                : "bg-gray-100 dark:bg-gray-700 opacity-60"
                        }`}
                    >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-cyan-500">
                            {variant.option_labels.join(" / ")}
                          </span>

                            <div className="flex gap-2">
                                <IoIosCheckmarkCircleOutline
                                    size={22}
                                    className="text-green-400 cursor-pointer"
                                    onClick={() => confirmVariant(index)}
                                />
                                <IoCreateOutline
                                    size={22}
                                    className="text-yellow-400 cursor-pointer"
                                    onClick={() => setActiveVariantIndex(index)}
                                />
                                <IoTrashOutline
                                    size={20}
                                    className="text-red-400 cursor-pointer"
                                    onClick={() => removeVariant(index)}
                                />
                            </div>
                        </div>

                        {/* Pricing inputs */}
                        <div className="grid grid-cols-2 gap-3">
                            <Input formik={formik} onlyNum name={`variants.${index}.price`} label="قیمت" />
                            <Input
                                formik={formik}
                                onlyNum
                                name={`variants.${index}.discount_price`}
                                label="مبلغ پس از تخفیف"
                            />
                            <Input
                                formik={formik}
                                onlyNum
                                name={`variants.${index}.current_stock`}
                                label="تعداد فروش"
                            />
                            <Input formik={formik} onlyNum name={`variants.${index}.weight`} label="وزن" />
                            <Input
                                formik={formik}
                                onlyNum
                                name={`variants.${index}.stock_order_limit`}
                                label="حداکثر سفارش"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductVariants;
