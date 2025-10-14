import {useLocation, useNavigate, useParams} from "react-router-dom";


const PagingGetUrl = ({total_page,searchParams}) => {

    const {row, page} = useParams()
    let item = [];

    if (total_page === 1) { /* empty */
    } else if (total_page <= 5) {
        for (let i = 1; i <= total_page; i++) {
            item.push(<PageItem num = {i} searchParams={searchParams}/>)
        }
    } else {
        if (page - 6 > 0) {
            for (let i = 1; i <= 2; i++) {
                item.push(<PageItem num = {i} searchParams={searchParams}/>)
            }
            if (page - 7 > 0) {
                item.push(<PageItem num = "..." searchParams={searchParams}/>)
            }
        }
        for (let i = page - 4 <= 0 ? 1 : page - 4; i <= (page + 3 >= total_page ? total_page : page + 3); i++) {
            item.push(<PageItem num = {i} searchParams={searchParams}/>)
        }
        if (page + 4 < total_page - 1) {
            item.push(<PageItem num = "..." searchParams={searchParams}/>)
            for (let i = total_page - 1; i <= total_page; i++) {
                item.push(<PageItem num = {i} searchParams={searchParams}/>)
            }
        }
    }
    return (
        <ul className ="flex gap-1 items-center">
            {item}
        </ul>
    )
}

export default PagingGetUrl;


const PageItem = ({num,searchParams}) => {

    const { row, page } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const changePageNum = (input) => {
        const res = location.pathname.split("/").filter(Boolean);
        let newPath = "";

        if (row !== undefined && page !== undefined) {
            res.pop();
            newPath = `/${res.join("/")}/${input}`;

            res.pop();
            localStorage.setItem(res.join("/"), `${row}/${input}`);
        } else {
            newPath = `/${res[0]}/${res[1]}/${res[2]}/${input}`;
        }

        if (searchParams) {
            newPath += `${searchParams}`;
        }

        navigate(newPath);
    };

    return (
        <li>
            <div onClick = {() => changePageNum(num)}
                 className = {` flex items-center justify-center cursor-pointer p-1 size-7 border rounded-full
                 ${page == num ? "bg-cyan-400 text-gray-200 border-cyan-400" : " bg-white/70 dark:bg-gray-800 dark:text-gray-100 border-gray-300  text-gray-500 "}`}>
                {num}
            </div>
        </li>
    )
}