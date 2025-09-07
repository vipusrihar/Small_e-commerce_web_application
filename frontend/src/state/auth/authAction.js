import { loginFailure, loginStart, loginSuccess } from "./authSlice";

export const loginUser = (navigate) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const res = await fetch("/api/user", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Not authenticated");
    }

    const data = await res.json();

    if (!data?.response) {
      throw new Error("Invalid user data");
    }

    dispatch(loginSuccess(data.response));

    if (navigate) navigate("/");
  } catch (error) {
    dispatch(loginFailure());
  }
};
