import { FiCheckCircle, FiClock } from "react-icons/fi";

const OrderTimeline = ({ status }) => {
    const steps = [
        { id: 1, title: "ثبت سفارش", key: "basket" },
        { id: 2, title: "پرداخت", key: "paid" },
        { id: 3, title: "ارسال", key: "shipped" },
        { id: 4, title: "تحویل مشتری", key: "delivered" },
    ];

    const activeStepIndex = steps.findIndex(s => s.key === status);

    return (
        <div className="flex items-center justify-between w-full mt-6 relative">
            {steps.map((step, index) => {
                const isActive = index <= activeStepIndex;
                const isLast = index === steps.length - 1;

                return (
                    <div key={step.id} className="flex-1 flex items-center relative">
                        {/* خط بین مراحل */}
                        {!isLast && (
                            <div
                                className={`absolute  -left-1/2 transform -translate-y-1/2 w-full h-1 ${
                                    index < activeStepIndex ? "bg-cyan-500" : "bg-gray-300"
                                } z-0`}

                            ></div>
                        )}

                        {/* آیکون و متن */}
                        <div className="relative z-10 flex flex-col items-center text-center w-24 mx-auto">
                            <div
                                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                                    isActive ? "bg-cyan-500 text-white" : "bg-gray-300 text-gray-600"
                                }`}
                            >
                                {isActive ? <FiCheckCircle /> : <FiClock />}
                            </div>
                            <span className={`text-xs mt-1 ${isActive ? "font-semibold text-gray-900 dark:text-gray-100" : "text-gray-400"}`}>
                {step.title}
              </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderTimeline;
