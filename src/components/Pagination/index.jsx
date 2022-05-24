import { useCallback } from "react";

const PaginationComponent = ({
    pageIndex,
    pageCount,
    itemCount,
    totalCount,
    setPageIndex,
}) => {
    const goToPrevious = useCallback(() => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    }, [pageIndex]);

    const goToNext = useCallback(() => {
        if (pageIndex < pageCount - 1) {
            setPageIndex(pageIndex + 1);
        }
    }, [pageIndex, pageCount]);

    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 text-gray-400">
                Showing&nbsp;
                <span className="font-semibold text-gray-900 text-white">
                    {itemCount === -1
                        ? 1
                        : 1 + pageIndex * itemCount <= totalCount
                        ? 1 + pageIndex * itemCount
                        : totalCount}
                </span>
                &nbsp;to&nbsp;
                <span className="font-semibold text-gray-900 text-white">
                    {itemCount !== -1
                        ? (pageIndex + 1) * itemCount <= totalCount
                            ? (pageIndex + 1) * itemCount
                            : totalCount
                        : totalCount}
                </span>
                &nbsp;of&nbsp;
                <span className="font-semibold text-gray-900 text-white">
                    {totalCount}
                </span>
                &nbsp;Entries
            </span>
            <nav
                className="inline-flex mt-2 xs:mt-0"
                aria-label="Page navigation example"
            >
                <ul className="inline-flex -space-x-px">
                    <li
                        className="py-2 px-3 ml-0 leading-tight text-gray-500 rounded-l-lg border border-gray-300 bg-gray-800 border-gray-700 text-gray-400"
                        onClick={goToPrevious}
                    >
                        Previous
                    </li>
                    {new Array(pageCount).fill(0).map((value, index) => (
                        <li
                            className={
                                pageIndex === index
                                    ? "py-2 px-3 leading-tight text-gray-800 border border-gray-300 bg-gray-600 border-gray-700 text-gray-400"
                                    : "py-2 px-3 leading-tight text-gray-500 border border-gray-300 bg-gray-800 border-gray-700 text-gray-400"
                            }
                            key={index}
                            onClick={() => setPageIndex(index)}
                        >
                            {index + 1}
                        </li>
                    ))}
                    <li
                        className="py-2 px-3 leading-tight text-gray-500 rounded-r-lg border border-gray-300 bg-gray-800 border-gray-700 text-gray-400"
                        onClick={goToNext}
                    >
                        Next
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default PaginationComponent;
