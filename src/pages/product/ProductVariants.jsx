import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { LuCirclePlus } from "react-icons/lu";
import Input from "../../components/inputs/Input.jsx";
import {HiOutlineChevronDown} from "react-icons/hi";

// Empty variant template
const emptyVariant = {
    id: "",
    option_ids: [],
    option_labels: [],
    price: "",
    discount_price: "",
    stock_qty: "",
    weight: "",
    stock_order_limit: "",
    isConfirmed: false,
};

const ProductVariants = ({
                             variantAttributes = [],
                             formik,
                             isLoadingOptions,
                         }) => {
    const [openVariant, setOpenVariant] = useState(null);
    const [activeVariantIndex, setActiveVariantIndex] = useState(0);

    const variants = formik.values.variants || [];

    // Toggle option selection for a variant
    const handleOptionChange = (variantIndex, option, checked) => {
        const path = `variants.${variantIndex}`;
        const optionIds = variants[variantIndex].option_ids || [];
        const optionLabels = variants[variantIndex].option_labels || [];

        if (checked) {
            formik.setFieldValue(`${path}.option_ids`, [...optionIds, option.id]);
            formik.setFieldValue(`${path}.option_labels`, [...optionLabels, option.label]);
        } else {
            formik.setFieldValue(
                `${path}.option_ids`,
                optionIds.filter((id) => id !== option.id)
            );
            formik.setFieldValue(
                `${path}.option_labels`,
                optionLabels.filter((label) => label !== option.label)
            );
        }
    };

    // Confirm variant and create next empty one
    const confirmVariant = (index) => {
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

    return (
        <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-cyan-300/60 rounded-xl  p-4">
            <div className="flex items-center gap-3">
                <span className="text-gray-600 text-xs font-semibold">قیمت گذاری پیشرفته</span>
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
                        <span className="text-sm font-medium">{attr.label}</span>
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
                                className="w-full grid grid-cols-2 gap-2 mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                            >
                                {isLoadingOptions && (
                                    <div className="col-span-2 text-center text-sm text-gray-400">
                                        لطفا صبر کنید...
                                    </div>
                                )}

                                {!isLoadingOptions &&
                                    attr.options?.map((opt) => (
                                        <label
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
                                            <span>{opt.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={variants?.[activeVariantIndex]?.option_ids?.includes(
                                                    opt.id
                                                )}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        activeVariantIndex,
                                                        opt,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </label>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            {/* Variant items */}
            {variants.map((variant, index) => {
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
                                <LuCirclePlus
                                    size={22}
                                    className="text-cyan-400 cursor-pointer"
                                    onClick={() => {
                                        formik.setFieldValue("variants", [
                                            ...variants,
                                            { ...emptyVariant },
                                        ]);
                                        setActiveVariantIndex(variants.length);
                                    }}
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
                                name={`variants.${index}.stock_qty`}
                                label="تعداد"
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
