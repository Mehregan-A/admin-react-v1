
export const SideItem = [
    {
        id: 1,
        icon: "MdOutlineHome",
        label: "پیشخوان",
        link: "/dashboard",
        sub: [],
    },
    {
        id: 14,
        icon: "MdOutlineDescription",
        label: "حکم ماموریت",
        sub: [
            {
                id: 42,
                icon: "MdOutlinePersonAdd",
                label: "ثبت جدید",
                link: "/decree/add",
            },
            {
                id: 43,
                icon: "MdOutlineList",
                label: "لیست ماموریت",
                link: "/decree/list/50/1",
            },
            {
                id: 46,
                icon: "MdOutlineList",
                label: "جستجو",
                link: "/decree/search/50/1",
            },
        ],
    },
    {
        id: 2,
        icon: "MdOutlineDirectionsCar",
        label: "لیست خودرو ها",
        link: "/car/list/10/1",
        sub: [],
    },
    {
        id: 9,
        icon: "MdOutlineGroups",
        label: "لیست کارمندان",
        link: "/user/list/50/1",
        sub: [],
    },
    {
        id: 3,
        icon: "MdOutlineSupervisorAccount",
        label: "مدیران",
        link: "/admin/list/10/1",
        sub: [],
    },
    {
        id: 4,
        icon: "MdOutlinePerson",
        label: "پروفایل کاربری",
        link: "/profile",
        sub: [],
    },
    {
        id: 8,
        icon: "MdOutlineSettings",
        label: "تنظیمات",
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
    {
        id: 10,
        icon: "MdOutlineLock",
        label: "گزارش ورود به سیستم",
        sub: [
            {
                id: 45,
                icon: "MdOutlineList",
                label: "ورود موفق",
                link: "/logs/success/50/1",
            },
            {
                id: 44,
                icon: "MdOutlinePersonAdd",
                label: "ورود ناموفق",
                link: "/logs/field/50/1",
            },
        ],
    },
]

