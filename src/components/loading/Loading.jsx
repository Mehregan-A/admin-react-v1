

export default function Loading() {
    return (
        <div className="unique-preloader flex flex-col items-center justify-center w-full text-center">
            <svg
                className="unique-preloader__cart w-32 h-32 mb-6"
                role="img"
                aria-label="Shopping cart line animation"
                viewBox="0 0 128 128"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                    <g className="unique-preloader__cart-track stroke-gray-200 dark:stroke-gray-700 transition-colors duration-300">
                        <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                        <circle cx="43" cy="111" r="13" />
                        <circle cx="102" cy="111" r="13" />
                    </g>
                    <g className="unique-preloader__cart-lines stroke-cyan-400 animate-cartLines">
                        <polyline
                            className="unique-preloader__cart-top animate-cartTop"
                            points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                            strokeDasharray="338 338"
                            strokeDashoffset="-338"
                        />
                        <g className="unique-preloader__cart-wheel1 animate-cartWheel1" transform="rotate(-90,43,111)">
                            <circle
                                className="unique-preloader__cart-wheel-stroke animate-cartWheelStroke"
                                cx="43"
                                cy="111"
                                r="13"
                                strokeDasharray="81.68 81.68"
                                strokeDashoffset="81.68"
                            />
                        </g>
                        <g className="unique-preloader__cart-wheel2 animate-cartWheel2" transform="rotate(90,102,111)">
                            <circle
                                className="unique-preloader__cart-wheel-stroke animate-cartWheelStroke"
                                cx="102"
                                cy="111"
                                r="13"
                                strokeDasharray="81.68 81.68"
                                strokeDashoffset="81.68"
                            />
                        </g>
                    </g>
                </g>
            </svg>

            {/* Tailwind Animations */}
            <style jsx>{`
        @keyframes msg {
          from { opacity: 1; visibility: visible; }
          99.9% { opacity: 0; visibility: visible; }
          to { opacity: 0; visibility: hidden; }
        }
        .animate-msg { animation: msg 0.3s 13.7s linear forwards; }
        .animation-reverse { animation-direction: reverse; animation-delay: 14s; }

        @keyframes cartLines {
          from, to { opacity: 0; }
          8%, 92% { opacity: 1; }
        }
        .animate-cartLines { animation: cartLines 2s ease-in-out infinite; }

        @keyframes cartTop {
          from { stroke-dashoffset: -338; }
          50% { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 338; }
        }
        .animate-cartTop { animation: cartTop 2s ease-in-out infinite; }

        @keyframes cartWheel1 {
          from { transform: rotate(-0.25turn); }
          to { transform: rotate(2.75turn); }
        }
        .animate-cartWheel1 { animation: cartWheel1 2s linear infinite; transform-origin: 43px 111px; }

        @keyframes cartWheel2 {
          from { transform: rotate(0.25turn); }
          to { transform: rotate(3.25turn); }
        }
        .animate-cartWheel2 { animation: cartWheel2 2s linear infinite; transform-origin: 102px 111px; }

        @keyframes cartWheelStroke {
          from, to { stroke-dashoffset: 81.68; }
          50% { stroke-dashoffset: 40.84; }
        }
        .animate-cartWheelStroke { animation: cartWheelStroke 2s ease-in-out infinite; }
      `}</style>
        </div>
    );
}