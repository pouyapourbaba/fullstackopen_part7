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
      console.log(error);
    }
  };
};
