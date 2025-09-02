import { publicApi } from "../../config/API";
import {
    getAllBooksStart, getAllBooksSuccess, getAllBooksFailure,
    getBookByIdStart, getBookByIdSuccess, getBookByIdFailure,
} from './bookSlice';

const handleBookError = (error, dispatch, failureAction) => {
    const message = error.response?.data?.message || error.message || 'Book operation failed. Please try again.';
    dispatch(failureAction(message));
    console.error(message);
};


export const getAllBooks = () => async (dispatch) => {
    dispatch(getAllBooksStart());

    try {
        const response = await publicApi.get('/book/all');
        dispatch(getAllBooksSuccess(response.data.response));
        console.info(response.data);
    } catch (error) {
        const message = handleBookError(error, dispatch, getAllBooksFailure);
        throw new Error(message);
    }
};

export const getBookById = (bookId) => async (dispatch) => {
    dispatch(getBookByIdStart());
    try {
        if (!bookId) throw new Error('Book ID is required');
        const response = await publicApi.get(`/book/${bookId}`);
        dispatch(getBookByIdSuccess(response.data.response));
    } catch (error) {
        const message = handleBookError(error, dispatch, getBookByIdFailure);
        throw new Error(message);
    }
};