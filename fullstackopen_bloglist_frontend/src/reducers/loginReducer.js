import axios from "axios";
import { setNotification } from "./notificationReducer";
import setToken from "../utils/setToken";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "LOGIN_SUCCESS":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default loginReducer;

// Actions
export const login = user => {
  const baseUrl = "/api/login";
  return async dispatch => {
    try {
      const loggedInUser = await axios.post(baseUrl, user);
      window.localStorage.setItem(
        "loggedBlogListUser",
        JSON.stringify(loggedInUser)
      );
      setToken(loggedInUser.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: loggedInUser.data
      });
    } catch (error) {
      dispatch(
        setNotification({ message: "Invalid credentials", type: "danger" })
      );
    }
  };
};

export const setUser = user => {
  setToken(user.token);
  return {
    type: "SET_USER",
    payload: user
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};
