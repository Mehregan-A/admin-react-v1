import {useEffect, useState} from 'react';
import {BiSolidError} from "react-icons/bi";
import PagingGetUrl from "../PagingGetUrl.jsx";
import PerPageSelector from "../RowSelector.jsx";
import useWindowSize from "../../customHook/UseWinowsSize.jsx";
import Loading from "../loading/Loading.jsx";
import Reject from "../loading/Reject.jsx";


const DataTable = ({title,columns,isError, data,isLoading, numberPage,icon,perPage=true,searchParams}) => {
    const {width} = useWindowSize();
    const [typeDataTable, setTypeDataTable] = useState(<PcMode data={data} columns={columns}/>);
    useEffect(() => {
        if (width < 1024) setTypeDataTable(<MobileMode key="1234" data={data} columns={columns} numberPage={numberPage} searchParams={searchParams}/>);
        else setTypeDataTable(<PcMode key="1234" data={data} columns={columns} numberPage={numberPage} searchParams={searchParams}/>);
    }, [width, data])

    return (
        <div className="flex bg-gray-50 dark:bg-gray-800  p-5 rounded-3xl  drop-shadow-xl drop-shadow-gray-500 inset-shadow-sm inset-shadow-cyan-400 flex-col lg:gap-2 w-full lg:mt-0">
            <div className="flex flex-row justify-between items-center gap-1 px-4">
                <div className="flex flex-row gap-2 items-center">
                    {icon}
                    <span className='text-gray-800'>{title}</span>
                </div>
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
                                <BiSolidError size={35} className={`text-cyan-700 animate-pulse`}/>
                                <span className={`font-semibold`}>موردی برای نمایش وجود ندارد.</span>
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
                                    <div key={indexC} className="flex gap-4 justify-between break-words odd:bg-gray-200 even:bg-gray-200/70  rounded-lg px-5 text-gray-600 ">
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

const PcMode = ({columns, data,numberPage,searchParams}) => {
    return (
        <>
            <div className="sticky top-0 z-10 bg-cyan-400 rounded-t-lg h-2"></div>
            <table className="w-full text-sm text-right text-gray-500  border-t-4 border-t-cyan-300 rounded">
                <thead className="sticky top-1 z-10 text-xs text-gray-700 dark:text-gray-200 uppercase bg-gray-200 dark:bg-gray-800 ">
                <tr>
                    {columns && columns.length > 0 && columns.map((item, index) => {
                        if (item?.name) {
                            return (
                                <th key={index + 312} scope="col" className="last:flex last:justify-center py-4 px-6 text-nowrap ">{item.name}</th>
                            )
                        } else {
                            return (
                                <th key={index + Math.floor(Math.random() * 1) + 1} scope="col" className="hidden"></th>
                            )
                        }
                    })}
                </tr>
                </thead>
                <tbody>
                {data && data.length > 0 && data.map((row, index) => {
                    return (
                        <tr key={index + 2000} className={`even:bg-gray-100 dark:even:bg-gray-800 odd:bg-gray-50 dark:odd:bg-gray-900/60 border-b border-cyan-300 dark:border-gray-300`}>
                            {columns && columns.length > 0 && columns.map((itemColumns, indexColumns) => {
                                if (itemColumns?.name !== undefined) {
                                    return (
                                        <td key={indexColumns + 313} className="py-4 px-5 text-[13px]" style={itemColumns.style}>
                                            {[row].map(itemColumns.selector)}
                                        </td>
                                    )
                                } else {
                                    // return <th key={index + 3 * Math.floor(Math.random() * 10)} scope="col" className="hidden"></th>
                                    return null
                                }
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className='flex justify-end p-2 rounded-3xl mt-3'>
                <PagingGetUrl total_page={numberPage} searchParams={searchParams}/>
            </div>
        </>
    )
}