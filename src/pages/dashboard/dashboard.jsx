import React, { useEffect } from 'react';
import {
    PiNewspaperClipping,
    PiNewspaperClippingFill,
    PiPackage,
    PiPackageFill, PiStarFour, PiStarFourFill,
    PiTicket,
    PiTicketFill
} from "react-icons/pi";
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from "react-redux";
import { getAsyncListOrder } from "../../feature/redux/OrderSlice.jsx";
import { useNavigate } from "react-router";
import { persianDateNT } from "../../components/utility/persianDateNT.js";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list_order } = useSelector(state => state.order);
    const { theme } = useSelector(state => state.theme);
    const isDark = theme === "true";

    useEffect(() => {
        dispatch(getAsyncListOrder({ row: 100, page: 1 }));
    }, [dispatch]);

    const filteredOrders = (list_order?.data || []).filter(o => o.status !== 'basket');

    const ordersPerDay = filteredOrders.reduce((acc, o) => {
        const d = persianDateNT.date(o.placed_at, 'No time').split(' ')[1]; // فقط تاریخ شمسی
        acc[d] = (acc[d] || 0) + 1;
        return acc;
    }, {});

    const chartCategories = Object.keys(ordersPerDay).reverse();
    const chartData = Object.values(ordersPerDay).reverse();

    const chartSeries = [{ name: 'تعداد سفارش', data: chartData }];

    const chartOptions = {
        chart: { type: 'area', toolbar: { show: false }, foreColor: isDark ? '#e0f7fa' : '#0369a1' },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: {
            categories: chartCategories,
            title: {
                text: 'روز',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }
        },
        yaxis: {
            title: {
                text: 'تعداد سفارش',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }
        },

        tooltip: { theme: isDark ? 'dark' : 'light', x: { format: 'yyyy-MM-dd' } },
        grid: { borderColor: isDark ? '#4dd0e1' : '#bae6fd' },
        fill: { colors: [isDark ? '#4dd0e1' : '#22d3ee'] },
        colors: [isDark ? '#06b6d4' : '#0ea5e9'],
        legend: { labels: { colors: isDark ? '#e0f7fa' : '#0369a1' } }
    };

    return (
        <div className='w-full h-screen dark:bg-gray-700/50 bg-gray-50 rounded-4xl p-5'>
            <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 items-center justify-center gap-7 w-full p-2">
                <div onClick={() => navigate(`/product/add`)} className="group relative flex flex-col justify-center p-3 hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-cyan-300 bg-cyan-400 dark:bg-cyan-500 rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -right-10 -top-10 shape1 bg-gradient-to-r from-gray-50/40 via-gray-50/5 to-cyan-400 dark:from-gray-50/40 dark:via-gray-50/5 dark:to-cyan-500"></div>
                    <div className="flex gap-3 items-center justify-center">
                        <span className="text-gray-50 font-semibold text-lg">افزودن محصول</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiPackage className="group-hover:hidden" size={27} />
                            <PiPackageFill className="hidden group-hover:block" size={27} />
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate(`/article/add`)} className="group relative flex flex-col justify-center p-3 hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-orange-500 bg-orange-500 dark:bg-orange-600 rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -right-12 -bottom-8 shape2 bg-gradient-to-r from-gray-50/30 via-gray-50/5 to-orange-500 dark:from-gray-50/30 dark:via-gray-50/5 dark:to-orange-600"></div>
                    <div className="flex gap-3 items-center justify-center">
                        <span className="text-gray-50 font-semibold text-lg">افزودن مقاله</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiNewspaperClipping className="group-hover:hidden" size={27} />
                            <PiNewspaperClippingFill className="hidden group-hover:block" size={27} />
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate(`/coupon/add`)} className="group relative flex flex-col justify-center hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-purple-500 p-3 bg-purple-600 dark:bg-purple-600 rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -left-14 -bottom-8 shape3 bg-gradient-to-r from-purple-600 via-gray-50/5 to-gray-50/30 dark:from-purple-600 dark:via-gray-50/5 dark:to-gray-50/30"></div>
                    <div className="flex gap-3 items-center justify-center">
                        <span className="text-gray-50 font-semibold text-lg">افزودن کوپن</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiTicket className="group-hover:hidden" size={27} />
                            <PiTicketFill className="hidden group-hover:block" size={27} />
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate(`/amazing/add`)} className="group relative flex flex-col justify-center p-3 hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-yellow-500 bg-yellow-400 dark:bg-yellow-500 rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -left-14 -top-14 shape1 bg-gradient-to-r from-yellow-400 via-gray-50/5 to-gray-50/40 dark:from-yellow-500 dark:via-gray-50/5 dark:to-gray-50/50"></div>
                    <div className="flex gap-3 items-center justify-center">
                        <span className="text-gray-50 font-semibold text-lg">افزودن شگفت انگیز</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiStarFour className="group-hover:hidden" size={27} />
                            <PiStarFourFill className="hidden group-hover:block" size={27} />
                        </div>
                    </div>
                </div>

            </div>
            <div id="chart">
                <Chart
                    key={theme}
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    );
};

export default Dashboard;



