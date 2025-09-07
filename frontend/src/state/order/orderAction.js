import { securedApi } from "../../config/API";
import {
  createOrderStart, createOrderSuccess, createOrderFailure,
  getAllOrdersStart, getAllOrdersSuccess, getAllOrdersFailure
} from "./orderSlice";

// CREATE ORDER
export const createOrder = (orderData) => async (dispatch) => {
  dispatch(createOrderStart());
  try {

    const { data } = await securedApi.post("/v1/order/", orderData, { withCredentials: true });

    dispatch(createOrderSuccess(data?.response || data));
    window.alert("Order successfully placed!");
    return data?.response || data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to create order";
    console.error("Create order error:", message);
    dispatch(createOrderFailure(message));
  }
};

// GET ORDERS BY EMAIL WITH FILTER
export const getOrdersByEmail = (filter = "ALL") => async (dispatch) => {
  dispatch(getAllOrdersStart());
  try {
    const { data } = await securedApi.get(`/v1/order/user?filter=${filter}`, { withCredentials: true, });
    dispatch(getAllOrdersSuccess(data?.response || data));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch orders";
    console.error("Get orders error:", message);
    dispatch(getAllOrdersFailure(message));
  }
};
