
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
        icon_fill: "PiCubeFill",
        icon_outline: "PiCube",
        label: "محصولات",
        sub: [
            {
                id: 42,
                icon: "PiCirclesThreeFill",
                label: "ثبت جدید",
                link: "/dashboard",
            },
            {
                id: 43,
                icon: "PiCirclesThreeFill",
                label: "لیست ماموریت",
                link: "/decree/list/50/1",
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
        id: 2,
        icon_fill: "PiShoppingCartSimpleFill",
        icon_outline: "PiShoppingCartSimpleLight",
        label: "سفارش ها",
        link: "/car/list/10/1",
        sub: [],
    },
    {
        id: 9,
        icon_fill: "PiUsersThreeFill",
        icon_outline: "PiUsersThreeLight",
        label: "مشتریان",
        link: "/user/list/50/1",
        sub: [],
    },
    {
        id: 3,
        icon_fill: "PiMoneyWavyFill",
        icon_outline: "PiMoneyWavyLight",
        label: "مالی",
        link: "/admin/list/10/1",
        sub: [],
    },
    {
        id: 4,
        icon_fill: "PiWrenchFill",
        icon_outline: "PiWrenchLight",
        label: "تنظیمات",
        link: "/profile",
        sub: [],
    },
    {
        id: 8,
        icon_fill: "PiUserGearFill",
        icon_outline: "PiUserGearLight",
        label: "پروفایل",
        sub: [
            {
                id: 50,
                icon: "MdOutlinePersonAdd",
                label: "تنظیمات سیستم",
                link: "/setting/system",
            },
            // ...(Config.decree_Setting
            //     ? [{
            //         id: 51,
            //         icon: "MdOutlineList",
            //         label: "تنظیمات چاپ",
            //         link: "/setting/print",
            //     }]
            //     : []),
        ],
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

