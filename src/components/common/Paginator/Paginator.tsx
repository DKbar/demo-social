import React, { useState } from "react"
import s from './Paginator.module.css'
import cn from 'classnames'


type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType>  =  ({ totalItemsCount, pageSize, currentPage, onPageChange, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {

        pages.push(i);
    }

    let portionsCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div className={s.paginator}>
            { portionNumber > 1 ? <button onClick={() => setPortionNumber(portionNumber - 1)} >prev</button> : null}
            {pages
                .filter(pages => pages >= leftPortionPageNumber && pages <= rightPortionPageNumber)
                .map(page => {
                    return <span className={cn({ [s.selectedPage]: currentPage === page }, s.pageNumber)}
                        key={page}
                        onClick={() => onPageChange(page)}>
                        {page + " "}
                    </span>
                })}
            {portionNumber < portionsCount ? <button onClick={() => setPortionNumber(portionNumber + 1)}>next</button> : null}
        </div>
    )
}

export default Paginator;