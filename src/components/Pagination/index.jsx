import { useCallback } from "react";

const PaginationComponent = ({
    pageIndex,
    pageCount,
    itemCount,
    totalCount,
    setPageIndex,
}) => {
    const goToPrevious = useCallback(() => {
        console.log("goToPrevious");
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    }, [pageIndex]);

    const goToNext = useCallback(() => {
        console.log("goToNext");
        if (pageIndex < pageCount - 1) {
            setPageIndex(pageIndex + 1);
        }
    }, [pageIndex, pageCount]);

    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                    {1 + pageIndex * itemCount <= totalCount
                        ? 1 + pageIndex * itemCount
                        : totalCount}
                </span>
                &nbsp;to&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                    {itemCount !== -1
                        ? (pageIndex + 1) * itemCount <= totalCount
                            ? (pageIndex + 1) * itemCount
                            : totalCount
                        : totalCount}
                </span>
                &nbsp;of&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
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
                        className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={goToPrevious}
                    >
                        Previous
                    </li>
                    {new Array(pageCount).fill(0).map((value, index) => (
                        <li
                            className={
                                pageIndex === index
                                    ? "py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }
                            key={index}
                            onClick={() => setPageIndex(index)}
                        >
                            {index + 1}
                        </li>
                    ))}
                    <li
                        className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
