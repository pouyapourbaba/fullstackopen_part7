import { getAll } from "../services/blogs";
import axios from "axios";
const baseUrl = "/api/blogs";

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "CREAT_BLOG":
      return [...state, action.payload];
    case "INIT_BLOGS":
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default blogsReducer;

// let token = null;

// export const setToken = newToken => {
//   token = `bearer ${newToken}`;
// };

// Actions
export const initBlogs = () => {
  return async dispatch => {
    const response = await axios.get(baseUrl);
    dispatch({
      type: "INIT_BLOGS",
      payload: response.data
    });
  };
};

export const createBlogAction = newObject => {
  return async dispatch => {
    try {
      const response = await axios.post(baseUrl, newObject);
      console.log("response create", response);
      dispatch({
        type: "CREAT_BLOG",
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
