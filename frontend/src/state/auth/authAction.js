import { loginFailure, loginStart, loginSuccess } from './authSlice';

export const loginUser = (navigate) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const res = await fetch("http://localhost:8080/api/user", {
            credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();

        localStorage.setItem("user", data.response.username);
        console.info(data);

        dispatch(loginSuccess(data.response));

        // Delay navigation (e.g., 2 seconds)
        setTimeout(() => {
            navigate("/profile");
        }, 2000);

    } catch (error) {
        console.error("Login error:", error.message);
        dispatch(loginFailure());
    }
};
