import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    auth: null,
    isLoading: false,
    error: null,
    success: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialValues,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.success = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.auth = action.payload;
            state.success = "Login successful!";
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.auth = null;
            state.success = null;
            state.error = null;
        },
    },
});

export const {
    loginStart, loginSuccess, loginFailure, logout
} = authSlice.actions;
export default authSlice.reducer;
