// node_modules
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import CountSelectComponent from "../CountSelect";
import SearchInputComponent from "../SearchInput";
import AudioInfoDataTableComponent from "../AudioInfoDataTable";
import PaginationComponent from "../Pagination";

// redux
import { fetchAudios, audiosActions } from "../../store/audios-slice";

// consts
import { PATH } from "../../consts";

const DashboardComponent = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.audios.loading);
    const totalCount = useSelector((state) => state.audios.totalCount);
    const pageIndex = useSelector((state) => state.audios.page);
    const itemCount = useSelector((state) => state.audios.count);
    const pageCount = useMemo(() => {
        return itemCount === -1 ? 1 : Math.ceil(totalCount / itemCount);
    }, [totalCount, itemCount]);
    const searchName = useSelector((state) => state.audios.name);

    const setPageIndex = useCallback((pageIndex) => {
        dispatch(audiosActions.setPage(pageIndex));
    }, []);

    const setItemCount = useCallback((itemCount) => {
        dispatch(audiosActions.setCount(itemCount));
    }, []);

    const setSearchName = useCallback((searchName) => {
        dispatch(audiosActions.setName(searchName));
    }, []);

    const refreshData = useCallback(() => {
        dispatch(fetchAudios(searchName, pageIndex, itemCount));
    }, [searchName, pageIndex, itemCount]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    return (
        <>
            <div className="flex items-center justify-between mt-5">
                <CountSelectComponent setItemValue={setItemCount} />
                <SearchInputComponent setItemValue={setSearchName} />
                <Link
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                    to={PATH.AddNewAudio}
                >
                    + Upload New Audio
                </Link>
            </div>
            <div className="mt-5">
                <AudioInfoDataTableComponent
                    dataIndex={pageIndex * itemCount}
                    loading={loading}
                />
            </div>
            <div className="mt-5">
                <PaginationComponent
                    pageIndex={pageIndex}
                    pageCount={pageCount}
                    itemCount={itemCount}
                    totalCount={totalCount}
                    setPageIndex={setPageIndex}
                />
            </div>
        </>
    );
};

export default DashboardComponent;
