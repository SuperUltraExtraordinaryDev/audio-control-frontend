import { combineReducers, configureStore } from "@reduxjs/toolkit";

import audiosSlice from "./audios-slice";

const combinedReducer = combineReducers({
    audios: audiosSlice.reducer,
});

const store = configureStore({
    reducer: combinedReducer,
});

export default store;
