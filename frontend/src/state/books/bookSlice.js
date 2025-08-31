import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    books: [],
    selectedBook: null,
    isLoading: false,
    error: null,
    success: null,
};



const bookSlice = createSlice({
    name: 'books',
    initialState: initialValues,
    reducers: {
        getAllBooksStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getAllBooksSuccess: (state, action) => {
            state.isLoading = false;
            state.books = action.payload;
            state.success = true;
        },
        getAllBooksFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getBookByIdStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getBookByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.selectedBook = action.payload;
            state.success = true;
        },
        getBookByIdFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
    },
})

export const {
    getAllBooksFailure, getAllBooksStart, getAllBooksSuccess,
    getBookByIdFailure, getBookByIdStart, getBookByIdSuccess,
} = bookSlice.actions;

export default bookSlice.reducer;