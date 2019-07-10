import axios from "axios";
import setNotification from "./notificationReducer";
const baseUrl = "http://localhost:3003/api/blogs";

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "CREAT_BLOG":
      return [...state, action.payload];
    case "LIKE_BLOG":
      return state.map(b => (b.id === action.payload.id ? action.payload : b));
    case "DELETE_BLOG":
      return state.filter(b => b.id !== action.payload.id);
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

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const likedBlog = {
        ...blog,
        likes: (blog.likes += 1),
        user: blog.user.id
      };
      const response = await axios.put(`${baseUrl}/${blog.id}`, likedBlog);

      dispatch({
        type: "LIKE_BLOG",
        payload: response.data
      });
    } catch (error) {
      dispatch(setNotification(error));
    }
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await axios.delete(`${baseUrl}/${blog.id}`);
      dispatch({
        type: "DELETE_BLOG",
        payload: blog
      });
    } catch (error) {
      console.log(error);
      dispatch(setNotification(error));
    }
  };
};
