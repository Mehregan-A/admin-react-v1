import React, {useEffect, useState} from 'react';
import {BiSolidError} from "react-icons/bi";
import PagingGetUrl from "../PagingGetUrl.jsx";
import PerPageSelector from "../RowSelector.jsx";
import useWindowSize from "../../customHook/UseWinowsSize.jsx";
import Loading from "../loading/Loading.jsx";
import Reject from "../loading/Reject.jsx";
import {useNavigate} from "react-router";


const DataTable = ({type,url,open,nameButton,columns,isError, data,isLoading, numberPage,icon,perPage=true,searchParams,user}) => {
    const {width} = useWindowSize();
    const navigate = useNavigate();
    const [typeDataTable, setTypeDataTable] = useState(<PcMode data={data} columns={columns}/>);
    useEffect(() => {
        if (width < 1024) setTypeDataTable(<MobileMode key="1234" data={data} columns={columns} numberPage={numberPage} searchParams={searchParams}/>);
        else setTypeDataTable(<PcMode key="1234" data={data} columns={columns} numberPage={numberPage} searchParams={searchParams} user={user}/>);
    }, [width, data])

    return (
        <div className={`flex bg-gray-50 dark:bg-gray-700/60  p-5 rounded-3xl  dark:drop-shadow-xl drop-shadow-gray-500 ${type==="amazing"?"":""}  flex-col lg:gap-2 w-full lg:mt-0`}>
            <div className={`${nameButton?"justify-between":"justify-end"} flex flex-row  items-center gap-1 px-4`}>
                {nameButton?
                    <div>
                        {url?
                            <button
                                onClick={() => navigate(`${url}`)}
                                className='dark:bg-gray-800 bg-gray-100 text-gray-700 cursor-pointer hover:text-cyan-400 transition-all rounded-2xl px-5 text-nowrap py-3 dark:text-gray-100 border border-cyan-400 duration-400 hover:shadow-[0px_0px_4px_4px_rgba(0,200,243,0.4)] hover:dark:shadow-[0px_0px_4px_4px_rgba(0,189,243,0.6)]'>{nameButton}</button>
                            :
                            <button
                                onClick={() => open("")}
                                className='dark:bg-gray-800 bg-gray-100 text-gray-700 cursor-pointer hover:text-cyan-400 transition-all rounded-2xl px-5 text-nowrap py-3 dark:text-gray-100 border border-cyan-400 duration-400 hover:shadow-[0px_0px_4px_4px_rgba(0,200,243,0.4)] hover:dark:shadow-[0px_0px_4px_4px_rgba(0,189,243,0.6)]'>{nameButton}</button>

                        }
                    </div>:
                ""
                }
                {perPage &&
                    <PerPageSelector searchParams={searchParams}/>
                }
            </div>
            <div className="flex flex-col w-full min-h-120">
                {isLoading
                    ?<Loading />
                    :isError
                        ?<Reject />
                        :data?.length > 0
                            ?typeDataTable
                            :<div className={`flex mt-40 flex-col gap-4 items-center justify-center`}>
                                <BiSolidError size={35} className={`text-cyan-300 animate-pulse`}/>
                                <span className={`font-semibold text-gray-700 dark:text-green-100`}>موردی برای نمایش وجود ندارد.</span>
                            </div>
                }
            </div>
        </div>
    );
};

export default DataTable;

const MobileMode = ({data, columns,numberPage,searchParams}) => {
    return (
        <div>
            {data && data.length > 0 && data.map((row, index) => {
                return (
                    <div key={index} className="flex flex-col gap-2 border border-gray-300 p-2 sm:p-4 rounded-xl my-2 w-full">
                        {columns && columns.length > 0 && columns.map((itemColumns, indexC) => {
                            if (itemColumns?.name !== undefined) {
                                return (
                                    <div key={indexC} className="flex gap-4 justify-between break-words odd:bg-gray-200 dark:even:bg-gray-700 even:bg-gray-200/70 dark:odd:bg-gray-800 rounded-lg px-5 text-gray-600 dark:text-gray-200">
                                        <span className="flex-shrink-0 items-center flex justify-center txst-xs  border-l-4 border-gray-100 w-16 text-xs font-bold pl-5">{itemColumns.name}</span>
                                        <span className="text-justify text-sm py-3 w-full">{[row].map(itemColumns.selector)}</span>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="hidden"></div>
                                )
                            }
                        })}
                    </div>
                )
            })}
            <div className='flex justify-end p-2 rounded-3xl mt-3'>
                <PagingGetUrl total_page={numberPage} searchParams={searchParams}/>
            </div>
        </div>
    )
}

const PcMode = ({columns, data, numberPage, searchParams,user}) => {

    const colors = [
        "#3b82f6",
        "#ef4444",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#14b8a6",
    ];

    return (
        <>
            <div className="sticky top-0 z-10 bg-cyan-400 rounded-t-lg h-2"></div>

            <table className="w-full text-sm text-right text-gray-500 dark:text-gray-200 border-t-4 border-t-cyan-300 rounded">
                <thead className="sticky top-1 z-10 text-xs text-gray-700 dark:text-gray-200 uppercase bg-gray-200 dark:bg-gray-700">
                <tr>
                    {columns.map((item, index) =>
                        item?.name ? (
                            <th key={index} className="py-4 px-6 text-nowrap">{item.name}</th>
                        ) : (
                            <th key={index} className="hidden"></th>
                        )
                    )}
                </tr>
                </thead>

                <tbody>
                {data && data.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className="
                        even:bg-gray-100
                        dark:even:bg-gray-800
                        odd:bg-gray-50
                        dark:odd:bg-gray-900/60
                        border-b border-gray-300 dark:border-gray-700
                    "
                        style={{
                            borderRight: user === 1 ? `5px solid ${colors[rowIndex % colors.length]}` : "none"
                        }}
                    >

                    {columns.map((col, colIndex) =>
                            col?.name !== undefined ? (
                                <td key={colIndex} className="py-4 px-5 text-[13px]">
                                    {[row].map(col.selector)}
                                </td>
                            ) : null
                        )}
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
