import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    orders: [],
    selectedOrder: null,
    isLoading: false,
    error: null,
    success: null,
};



const orderSlice = createSlice({
    name: 'orders',
    initialState: initialValues,
    reducers: {
        getAllOrdersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getAllOrdersSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
            state.success = true;
        },
        getAllOrdersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getOrderByIdStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getOrderByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.selectedOrder = action.payload;
            state.success = true;
        },
        getOrderByIdFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
    },
})

export const {
    getAllOrdersFailure, getAllOrdersStart, getAllOrdersSuccess,
    getOrderByIdFailure, getOrderByIdStart, getOrderByIdSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;