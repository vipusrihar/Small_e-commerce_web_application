import { publicApi } from '../../config/API';
import {loginFailure, loginStart, loginSuccess} from './authSlice';

export const loginUser = () => async(dispatch) => {
    dispatch(loginStart());
    try {
        const response = await publicApi.get('/auth/login');
        dispatch(loginSuccess(response.data.response));
        console.info(response.data);
    } catch (error) {
        console.error("error", error.getMessage());
        loginFailure();
    }
}