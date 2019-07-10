import axios from "axios";
const baseUrl = "/api/users";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default usersReducer;

// Actions
export const initUsers = () => {
  return async dispatch => {
    const response = await axios.get(baseUrl);
    dispatch({
      type: "INIT_USERS",
      payload: response.data
    });
  };
};
