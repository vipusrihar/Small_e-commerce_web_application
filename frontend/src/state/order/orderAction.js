import { 
  createOrderStart, createOrderSuccess, createOrderFailure, 
  getAllOrdersStart, getAllOrdersSuccess, getAllOrdersFailure 
} from "./orderSlice";

// CREATE ORDER
export const createOrder = (orderData) => async (dispatch) => {
  dispatch(createOrderStart());
  try {
    console.log("Order data:", JSON.stringify(orderData));

    const response = await fetch("http://localhost:8080/api/v1/order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = "Failed to create order";
      if (errText) {
        const errJson = JSON.parse(errText);
        errMsg = errJson.message || errMsg;
      }
      throw new Error(errMsg);
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    dispatch(createOrderSuccess(data?.response || {}));
    window.alert("Order successfully placed!");
    return data?.response || {};
  } catch (error) {
    console.error("Create order error:", error);
    dispatch(createOrderFailure(error.message));
  }
};

// GET ORDERS BY EMAIL
export const getOrdersByEmail = (email) => async (dispatch) => {
  dispatch(getAllOrdersStart());
  try {
    const response = await fetch(`http://localhost:8080/api/v1/order/user/${email}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = "Failed to fetch orders";
      if (errText) {
        const errJson = JSON.parse(errText);
        errMsg = errJson.message || errMsg;
      }
      throw new Error(errMsg);
    }

    const data = await response.json();
    dispatch(getAllOrdersSuccess(data.response));
  } catch (error) {
    console.error("Get orders error:", error);
    dispatch(getAllOrdersFailure(error.message));
  }
};
