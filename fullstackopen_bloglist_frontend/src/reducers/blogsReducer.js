import axios from "axios";
import setNotification from "./notificationReducer";
const baseUrl = "/api/blogs";

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "CREAT_BLOG":
      return [...state, action.payload];
    case "INIT_BLOGS":
      return [...state, ...action.payload];
    case "ADD_COMMENT":
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      );
    default:
      return state;
  }
};

export default blogsReducer;

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

export const createBlog = newObject => {
  return async dispatch => {
    try {
      const response = await axios.post(baseUrl, newObject);
      console.log("response create", response);
      dispatch({
        type: "CREAT_BLOG",
        payload: response.data
      });
    } catch (error) {
      console.log("error ", error);
      dispatch(setNotification(error.message));
    }
  };
};

export const addComment = (comment, blogId) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        `${baseUrl}/${blogId}/comments`,
        comment
      );
      dispatch({
        type: "ADD_COMMENT",
        payload: response.data
      });
    } catch (error) {
      console.log("error ", error);
      dispatch(setNotification(error.message));
    }
  };
};
