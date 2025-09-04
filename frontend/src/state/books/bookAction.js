import { publicApi } from "../../config/API";
import {
  getAllBooksStart, getAllBooksSuccess, getAllBooksFailure,
  getBookByIdStart, getBookByIdSuccess, getBookByIdFailure,
} from './bookSlice';

const extractResponse = (res) => res.data?.response || res.data;

const handleBookError = (error, dispatch, failureAction) => {
  const message =
    error.response?.data?.message || error.message || 'Book operation failed. Please try again.';
  dispatch(failureAction(message));
  console.error(message);
  return message;
};

export const getAllBooks = () => async (dispatch) => {
  dispatch(getAllBooksStart());
  try {
    const response = await publicApi.get('/book/all');
    dispatch(getAllBooksSuccess(extractResponse(response)));
  } catch (error) {
    throw new Error(handleBookError(error, dispatch, getAllBooksFailure));
  }
};

export const getBookById = (bookId) => async (dispatch) => {
  dispatch(getBookByIdStart());
  try {
    if (!bookId) throw new Error('Book ID is required');
    const response = await publicApi.get(`/book/${bookId}`);
    dispatch(getBookByIdSuccess(extractResponse(response)));
  } catch (error) {
    throw new Error(handleBookError(error, dispatch, getBookByIdFailure));
  }
};

export const searchBooks = (searchText) => async (dispatch) => {
  dispatch(getAllBooksStart());
  try {
    const response = await publicApi.get(`/book/search?query=${encodeURIComponent(searchText)}`);
    dispatch(getAllBooksSuccess(extractResponse(response)));
  } catch (error) {
    throw new Error(handleBookError(error, dispatch, getAllBooksFailure));
  }
};
