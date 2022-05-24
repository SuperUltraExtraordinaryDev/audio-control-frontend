import { createSlice } from "@reduxjs/toolkit";

import fetcher from "./fetcher";

const initialState = {
    loading: true,
    totalCount: 0,
    page: 0,
    count: 5,
    name: "",
    audios: [],
    audio: {},
};

const audiosSlice = createSlice({
    name: "me",
    initialState: initialState,
    reducers: {
        setAudiosCount(state, action) {
            state.totalCount = action.payload;
        },
        setAudios(state, action) {
            state.audios = action.payload;
        },
        setAudio(state, action) {
            state.audio = action.payload;
        },
        setName(state, action) {
            state.name = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setCount(state, action) {
            state.count = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const audiosActions = audiosSlice.actions;

export const fetchAudios = (name, page, count) => {
    return async (dispatch) => {
        dispatch(audiosActions.setLoading(true));
        fetcher(`audios/audio?name=${name}&page=${page}&count=${count}`)
            .then((responseData) => {
                dispatch(audiosActions.setAudiosCount(responseData.count));
                dispatch(audiosActions.setAudios(responseData.audios));
            })
            .finally(() => {
                dispatch(audiosActions.setLoading(false));
            });
    };
};

export const fetchAudio = (id) => {
    return async (dispatch) => {
        dispatch(audiosActions.setLoading(true));
        fetcher(`audios/audio/${id}`)
            .then((result) => {
                dispatch(audiosActions.setAudio(result.audio));
            })
            .finally(() => {
                dispatch(audiosActions.setLoading(false));
            });
    };
};

export const createAudio = (audioData) => {
    return async (dispatch) => {
        dispatch(audiosActions.setLoading(true));
        fetcher(`audios/audio`, "POST", audioData).finally(() => {
            dispatch(audiosActions.setLoading(false));
        });
    };
};

export default audiosSlice;
