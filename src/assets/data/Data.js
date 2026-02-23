
export const SideItem = [
    {
        id: 1,
        icon_fill: "PiHouseFill",
        icon_outline: "PiHouseLight",
        label: "داشبورد",
        link: "/dashboard",
        sub: [],
    },
    {
        id: 3,
        icon_fill: "PiPackageFill",
        icon_outline: "PiPackage",
        label: "محصولات",
        link: "/product/list/50/1",
        sub: [],
    },
    {
        id: 3,
        icon_fill: "PiStarFourFill",
        icon_outline: "PiStarFour",
        label: "محصولات شگفت انگیز",
        link: "/product-amazing/list/50/1",
        sub: [],
    },
    {
        id: 18,
        icon_fill: "PiShoppingCartSimpleFill",
        icon_outline: "PiShoppingCartSimple",
        label: "سفارشات",
        link: "/order/list/50/1",
        sub: [],
    },
    {
        id: 19,
        icon_fill: "PiTruckFill",
        icon_outline: "PiTruckLight",
        label: "روش های ارسال",
        sub: [
            {
                id: 53,
                icon: "PiCirclesThreeFill",
                label: "روش های ارسال",
                link: "/shipping-methods/list/50/1",
            },
            {
                id: 54,
                icon: "PiCirclesThreeFill",
                label: "ارسال رایگان",
                link: "/free-shipping/list",
            },
        ],
    },
    {
        id: 14,
        icon_fill: "PiTreeViewFill",
        icon_outline: "PiTreeViewLight",
        label: "تعاریف",
        sub: [
            {
                id: 42,
                icon: "PiCirclesThreeFill",
                label: "دسته",
                link: "/category/list/50/1",
            },
            {
                id: 43,
                icon: "PiCirclesThreeFill",
                label: "زیر دسته",
                link: "/category/sub/list/50/1",
            },
            // {
            //     id: 46,
            //     icon: "PiCirclesThreeFill",
            //     label: "جستجو",
            //     link: "/decree/search/50/1",
            // },
            {
                id: 47,
                icon_fill: "PiMedalFill",
                icon_outline: "PiMedalLight",
                label: "برند",
                link: "/brand/list/50/1",
            },
        ],
    },
    {
        id: 15,
        icon_fill: "PiNewspaperClippingFill",
        icon_outline: "PiNewspaperClipping",
        label: "مقاله",
        sub: [
            {
                id: 47,
                icon: "PiCirclesThreeFill",
                label: "لیست مقالات",
                link: "/article/list/50/1",
            },
            {
                id: 48,
                icon: "PiCirclesThreeFill",
                label: "افزودن مقاله",
                link: "/article/add",
            },
        ],
    },
    {
        id: 16,
        icon_fill: "PiTicketFill",
        icon_outline: "PiTicket",
        label: "کوپن",
        sub: [
            {
                id: 49,
                icon: "PiCirclesThreeFill",
                label: "لیست کوپن",
                link: "/coupon/list/50/1",
            },
            {
                id: 50,
                icon: "PiCirclesThreeFill",
                label: "افزودن کوپن",
                link: "/coupon/add",
            },
        ],
    },
    {
        id: 22,
        icon_fill: "PiSwatchesFill",
        icon_outline: "PiSwatches",
        label: "ویژگی های غیر موثر برقیمت",
        link: "/attribute/list/10/1",
        sub: [],
    },
    {
        id: 23,
        icon_fill: "PiTagFill",
        icon_outline: "PiTag",
        label: "ویژگی های موثر برقیمت",
        link: "/variant-attribute/list/10/1",
        sub: [],
    },
    {
        id: 2,
        icon_fill: "PiUsersFill",
        icon_outline: "PiUsers",
        label: "مدیران",
        link: "/admin/list/10/1",
        sub: [],
    },
    {
        id: 9,
        icon_fill: "PiUsersThreeFill",
        icon_outline: "PiUsersThreeLight",
        label: "کاربران",
        link: "/user/list/50/1",
        sub: [],
    },
    {
        id: 10,
        icon_fill: "PiAlignLeftSimpleFill",
        icon_outline: "PiAlignLeftSimple",
        label: "بنر",
        link: "/slider/list/50/1",
        sub: [],
    },
    {
        id: 12,
        icon_fill: "PiCreditCardFill",
        icon_outline: "PiCreditCard",
        label: "پرداخت",
        sub: [
            {
                id: 56,
                icon: "PiCirclesThreeFill",
                label: "پرداخت",
                link: "/payment/list/50/1",
            },
            {
                id: 57,
                icon: "PiCirclesThreeFill",
                label: "درگاه پرداخت",
                link: "/gateway/list",
            },
        ],
    },
    {
        id: 17,
        icon_fill: "PiGearSixFill",
        icon_outline: "PiGearSix",
        label: "تنظیمات",
        sub: [
            {
                id: 51,
                icon: "PiCirclesThreeFill",
                label: "تنظیمات کلی",
                link: "/setting",
            },
            {
                id: 52,
                icon: "PiCirclesThreeFill",
                label: "تنظیمات پیامک",
                link: "/sms-setting",
            },
            {
                id: 53,
                icon: "PiCirclesThreeFill",
                label: "سئو سایت",
                link: "/seo-site",
            },
            {
                id: 54,
                icon: "PiCirclesThreeFill",
                label: "قوانین",
                link: "/rules",
            },
            {
                id: 55,
                icon: "PiCirclesThreeFill",
                label: "شبکه های اجتماعی",
                link: "/social-network",
            },
        ],
    },
    // {
    //     id: 8,
    //     icon_fill: "PiUserGearFill",
    //     icon_outline: "PiUserGearLight",
    //     link: "/profile",
    //     label: "پروفایل",
    //     sub: [],
    // },
    // {
    //     id: 10,
    //     icon: "MdOutlineLock",
    //     label: "گزارش ورود به سیستم",
    //     sub: [
    //         {
    //             id: 45,
    //             icon: "MdOutlineList",
    //             label: "ورود موفق",
    //             link: "/logs/success/50/1",
    //         },
    //         {
    //             id: 44,
    //             icon: "MdOutlinePersonAdd",
    //             label: "ورود ناموفق",
    //             link: "/logs/field/50/1",
    //         },
    //     ],
    // },
]
export const optionsActive = [
    { value: '1', label: 'صفحه اول' },
    { value: '0', label: 'صفحه غیر اول' },
];
export const gender = [
    { value: 'male', label: 'آقا' },
    { value: 'female', label: 'خانم' },
];
export const role = [
    { value: 'employee', label: 'کارمند' },
    { value: 'accountant', label: 'حسابدار' },
];
export const status = [
    { value: 'draft', label: 'پیش نویس' },
    { value: 'published', label: 'انتشار' },
];
export const coupon = [
    { value: 'percent', label: 'درصدی' },
    { value: 'fixed', label: 'مبلغ ثابت' },
];
export const options = [
    { value: 'active', label: 'فعال' },
    { value: 'inactive', label: 'غیرفعال' },
];
export const IncreasePriceOption = [
    { value: 'percent', label: 'درصدی' },
    { value: 'constant', label: 'ثابت' },
];
export const gateway = [
    { value: 'zarinpal', label: 'زرین پال' },
    { value: 'zibal', label: 'زیبال' },
];
export const optionsMethod = [
    { value: 'prepaid', label: ' پس کرایه' },
    { value: 'cash_on_delivery', label: 'پیش کرایه' },
    { value: 'free', label: 'رایگان' },
];
export const data_type = [
    { value: 'text', label: 'نوشتاری' },
    { value: 'decimal', label: 'عددی' },
    { value: 'bool', label: 'دو گزینه ای' },
];
export const filter = [
    { value: 1, label: 'فعال' },
    { value: 0, label: 'غیرفعال' },
];
export const is_spec = [
    { value: 1, label: 'فعال' },
    { value: 0, label: 'غیرفعال' },
];


