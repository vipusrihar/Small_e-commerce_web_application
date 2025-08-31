import { combineReducers } from "redux";
import bookSlice from './books/bookSlice';
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    books: bookSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
})