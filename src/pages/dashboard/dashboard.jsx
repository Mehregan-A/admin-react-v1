import React from 'react';
import {PiNewspaperClipping, PiPackage, PiTicket} from "react-icons/pi";
import Chart from 'react-apexcharts'
import {useNavigate} from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    const [state, setState] = React.useState({

        series: [{
            name: 'series1',
            data: [0, 40, 28, 51, 42, 109, 100]
        }, ],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },


    });
    return (
        <div className='w-full h-screen dark:bg-gray-700 bg-gray-50 rounded-4xl p-5'>
            <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 items-center justify-center gap-7 w-full p-2">
                <div onClick={() => navigate(`/product/add`)} className="relative flex flex-col justify-center p-3 hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-cyan-300 bg-cyan-400 dark:bg-cyan-500  rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -right-10 -top-10 shape1 bg-gradient-to-r from-gray-50/40 via-gray-50/5 to-cyan-400 dark:from-gray-50/30 dark:via-gray-50/5 dark:to-cyan-500"></div>
                    <div className="flex gap-3 items-center justify-center ">
                        <span className="text-gray-50 font-semibold text-lg">افزودن محصول</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiPackage size={27} />
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate(`/article/add`)} className="relative flex flex-col justify-center p-3 hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-orange-500 bg-orange-500 dark:bg-orange-600 rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -right-12 -bottom-8 shape2 bg-gradient-to-r from-gray-50/30 via-gray-50/5 to-orange-500 dark:from-gray-50/30 dark:via-gray-50/5 dark:to-orange-600"></div>
                    <div className="flex gap-3 items-center justify-center">
                        <span className="text-gray-50 font-semibold text-lg">افزودن مقاله</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiNewspaperClipping size={27} />
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate(`/coupon/add`)} className="relative flex flex-col justify-center hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-purple-500 p-3 bg-purple-600 dark:bg-purple-600  rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -left-14 -bottom-8 shape3 bg-gradient-to-r from-purple-600 via-gray-50/5 to-gray-50/30 dark:from-purple-600 dark:via-gray-50/5 dark:to-gray-50/30"></div>
                    <div className="flex gap-3 items-center justify-center ">
                        <span className="text-gray-50 font-semibold text-lg">افزودن کوپن</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiTicket size={27} />
                        </div>
                    </div>
                </div>
                <div onClick={() => navigate(`/amazing/add`)} className="relative flex flex-col justify-center p-3 hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-yellow-500 bg-yellow-400 dark:bg-yellow-500 rounded-4xl shadow-lg shadow-gray-300 dark:shadow-gray-600 w-[280px] h-32 overflow-hidden">
                    <div className="absolute -left-14 -top-14 shape1 bg-gradient-to-r from-yellow-400 via-gray-50/5 to-gray-50/40 dark:from-yellow-500 dark:via-gray-50/5 dark:to-gray-50/30"></div>
                    <div className="flex gap-3 items-center justify-center ">
                        <span className="text-gray-50 font-semibold text-lg">افزودن شگفت انگیز</span>
                        <div className="rounded-full text-white bg-gray-50/30 w-13 h-13 flex justify-center items-center">
                            <PiPackage size={27} />
                        </div>
                    </div>
                </div>
            </div>
            <div id="chart">
                <Chart options={state.options} series={state.series} type="area" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default Dashboard;