import uuid from "uuid";

const notificatoinReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return [...state, action.payload];
    case "REMOVE_NOTIFICATION":
      return state.filter(notification => notification.id !== action.payload);
    default:
      return state;
  }
};

export default notificatoinReducer;

// Actions
export const setNotification = (notification, duration = 5000) => {
  return dispatch => {
    const id = uuid();
    notification.id = id; 
    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification
    });

    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: notification.id
      });
    }, duration);
  };
};