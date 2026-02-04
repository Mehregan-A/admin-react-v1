import React, {useEffect, useState} from 'react';
import {BiSolidError} from "react-icons/bi";
import PagingGetUrl from "../PagingGetUrl.jsx";
import PerPageSelector from "../RowSelector.jsx";
import useWindowSize from "../../customHook/UseWinowsSize.jsx";
import Loading from "../loading/Loading.jsx";
import Reject from "../loading/Reject.jsx";
import {useNavigate} from "react-router";

const DataTableArticle = ({title,url,open,nameButton,columns,isError, data,isLoading, numberPage,icon,perPage=true,searchParams}) => {
    const {width} = useWindowSize();
    const navigate = useNavigate();
    const [typeDataTable, setTypeDataTable] = useState(<PcMode data={data} columns={columns}/>);

    useEffect(() => {
        if (width < 1024)
            setTypeDataTable(<MobileMode key="1234" data={data} columns={columns} numberPage={numberPage} searchParams={searchParams}/>);
        else
            setTypeDataTable(<PcMode key="1234" data={data} columns={columns} numberPage={numberPage} searchParams={searchParams}/>);
    }, [width, data]);

    return (
        <div className="flex bg-gray-50 dark:bg-gray-700/60 p-5 rounded-3xl dark:drop-shadow-xl flex-col lg:gap-2 w-full">
            <div className="flex flex-row justify-between items-center gap-1 px-4">
                {url?
                    <button
                        onClick={() => navigate(`${url}`)}
                        className='dark:bg-gray-800 bg-gray-100 text-gray-700 cursor-pointer hover:text-cyan-400 transition-all rounded-2xl px-5 text-nowrap py-3 dark:text-gray-100 border border-cyan-400 duration-400 hover:shadow-[0px_0px_4px_4px_rgba(0,200,243,0.4)] hover:dark:shadow-[0px_0px_4px_4px_rgba(0,189,243,0.6)]'>{nameButton}</button>
                    :
                    <button
                        onClick={() => open("")}
                        className='dark:bg-gray-800 bg-gray-100 text-gray-700 cursor-pointer hover:text-cyan-400 transition-all rounded-2xl px-5 text-nowrap py-3 dark:text-gray-100 border border-cyan-400 duration-400 hover:shadow-[0px_0px_4px_4px_rgba(0,200,243,0.4)] hover:dark:shadow-[0px_0px_4px_4px_rgba(0,189,243,0.6)]'>{nameButton}</button>

                }
                {perPage && <PerPageSelector searchParams={searchParams}/>}
            </div>

            <div className="flex flex-col w-full min-h-120">
                {isLoading ? (
                    <Loading />
                ) : isError ? (
                    <Reject />
                ) : data?.length > 0 ? (
                    typeDataTable
                ) : (
                    <div className="flex mt-40 flex-col gap-4 items-center justify-center">
                        <BiSolidError size={35} className="text-cyan-700 animate-pulse"/>
                        <span className="font-semibold">موردی برای نمایش وجود ندارد.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataTableArticle;

const MobileMode = ({data, columns,numberPage,searchParams}) => {
    const [expanded, setExpanded] = useState(null);

    return (
        <div>
            {data?.map((row, index) => (
                <div key={index} className="flex flex-col gap-2 border border-gray-300 p-4 rounded-xl my-2 w-full">
                    {columns?.map((col, i) => {
                        if (!col?.name) return null;
                        const content = [row].map(col.selector);
                        const isAbstract = col.name.includes("چکیده");

                        return (
                            <div key={i} className="flex flex-col gap-2 odd:bg-gray-100 dark:odd:bg-gray-800 rounded-lg p-2">
                                <span className="font-bold text-xs text-cyan-700">{col.name}</span>
                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    {isAbstract ? (
                                        <>
                                            {expanded === row.id ? content : String(row.abstract).slice(0, 100) + (row.abstract.length > 100 ? "..." : "")}
                                            {row.abstract.length > 100 && (
                                                <button
                                                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                                                    className="text-cyan-600 text-xs mr-2"
                                                >
                                                    {expanded === row.id ? "نمایش کمتر" : "نمایش بیشتر"}
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        content
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}
            <div className='flex justify-end p-2 rounded-3xl mt-3'>
                <PagingGetUrl total_page={numberPage} searchParams={searchParams}/>
            </div>
        </div>
    );
};

const PcMode = ({columns, data,numberPage,searchParams}) => {
    const [expandedRow, setExpandedRow] = useState(null);

    return (
        <>
            <div className="sticky top-0 z-10 bg-cyan-400 rounded-t-lg h-2"></div>
            <table className="w-full text-sm text-right text-gray-500 dark:text-gray-200 border-t-4 border-t-cyan-300 rounded">
                <thead className="sticky top-1 z-10 text-xs uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                    {columns?.map((col, i) =>
                        col?.name ? (
                            <th key={i} className="py-4 px-6">{col.name}</th>
                        ) : null
                    )}
                </tr>
                </thead>
                <tbody>
                {data?.map((row, index) => (
                    <tr key={index} className="even:bg-gray-100 dark:even:bg-gray-800 odd:bg-gray-50 dark:odd:bg-gray-900/60 border-b border-cyan-300">
                        {columns?.map((col, ci) => {
                            if (!col?.name) return null;
                            const isAbstract = col.name.includes("چکیده");
                            const content = [row].map(col.selector);

                            return (
                                <td key={ci} className="py-4 px-5 text-[13px] align-top">
                                    {isAbstract ? (
                                        <div className="flex flex-col gap-2">
                                            <div className="whitespace-pre-line">
                                                {expandedRow === row.id
                                                    ? row.abstract
                                                    : String(row.abstract).slice(0, 100) + (row.abstract.length > 100 ? "..." : "")}
                                            </div>
                                            {row.abstract.length > 100 && (
                                                <button
                                                    onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                                                    className="w-18 top-0 text-nowrap text-[10px] mt-1"
                                                >
                                                    <div className="relative border rounded-lg dark:border-gray-300 border-cyan-300 cursor-pointer p-1">
                                                        <div className="absolute -top-1 -right-1 flex size-2">
                                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                                            <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
                                                            <span className="absolute inline-flex size-2 rounded-full bg-sky-400 opacity-75"></span>
                                                        </div>
                                                        <span> {expandedRow === row.id ? "نمایش کمتر" : "نمایش بیشتر"}</span>
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        content
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className='flex justify-end p-2 rounded-3xl mt-3'>
                <PagingGetUrl total_page={numberPage} searchParams={searchParams}/>
            </div>
        </>
    );
};
