import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { LuCirclePlus } from "react-icons/lu";
import Input from "../../components/inputs/Input.jsx";

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
        <div className="flex flex-col gap-4">
            {/* Variant attribute selector */}
            {variantAttributes.length>0 && variantAttributes?.map((attr) => (
                <div
                    key={attr.value}
                    onClick={() =>
                        setOpenVariant(openVariant === attr.value ? null : attr.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer"
                >
                    <span className="text-sm font-medium">{attr.label}</span>

                    <AnimatePresence>
                        {openVariant === attr.value && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-2 gap-2 mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                            >
                                {isLoadingOptions && (
                                    <div className="col-span-2 text-center text-sm text-gray-400">
                                        Loading options...
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
                        className={`rounded-xl p-4 transition ${
                            isActive
                                ? "bg-gray-100 dark:bg-gray-800"
                                : "bg-gray-200 dark:bg-gray-700 opacity-60"
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
                            <Input formik={formik} onlyNum name={`variants.${index}.price`} label="Price" />
                            <Input
                                formik={formik}
                                onlyNum
                                name={`variants.${index}.discount_price`}
                                label="Discount price"
                            />
                            <Input
                                formik={formik}
                                onlyNum
                                name={`variants.${index}.stock_qty`}
                                label="Stock quantity"
                            />
                            <Input formik={formik} onlyNum name={`variants.${index}.weight`} label="Weight" />
                            <Input
                                formik={formik}
                                onlyNum
                                name={`variants.${index}.stock_order_limit`}
                                label="Order limit"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductVariants;
