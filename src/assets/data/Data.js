
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
            {
                id: 46,
                icon: "PiCirclesThreeFill",
                label: "جستجو",
                link: "/decree/search/50/1",
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
        id: 3,
        icon_fill: "PiPackageFill",
        icon_outline: "PiPackage",
        label: "محصولات",
        link: "/product/list/50/1",
        sub: [],
    },
    {
        id: 4,
        icon_fill: "PiMedalFill",
        icon_outline: "PiMedalLight",
        label: "برند",
        link: "/brand/list/50/1",
        sub: [],
    },
    {
        id: 12,
        icon_fill: "PiCreditCardFill",
        icon_outline: "PiCreditCard",
        label: "پرداخت",
        link: "/payment/list/50/1",
        sub: [],
    },
    {
        id: 11,
        icon_fill: "PiChatsFill",
        icon_outline: "PiChatsLight",
        label: "سوالات متداول",
        link: "/faq/list/50/1",
        sub: [],
    },
    {
        id: 8,
        icon_fill: "PiUserGearFill",
        icon_outline: "PiUserGearLight",
        link: "/profile",
        label: "پروفایل",
        sub: [],
    },
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

