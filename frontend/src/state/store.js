import { combineReducers } from "redux";
import bookSlice from './books/bookSlice';
import orderSlice from "./order/orderSlice";
import authSlice from './auth/authSlice';
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// const persistConfig = {
//   key: 'root',
//   storage,
// };

const rootReducer = combineReducers({
    books: bookSlice,
    orders: orderSlice,
    auth: authSlice
});

// const persistedReducer = persistReducer(persistConfig, rootReducer); // ✅ apply persist

export const store = configureStore({
    //   reducer: persistedReducer, // ✅ use persisted reducer here
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // optional: avoids warnings with non-serializable actions
        }),
    devTools: true,
});

// export const persistor = persistStore(store);
