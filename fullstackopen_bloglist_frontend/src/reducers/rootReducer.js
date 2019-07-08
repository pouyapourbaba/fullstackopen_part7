import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";
import blogsReducer from "./blogsReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogsReducer,
  user: loginReducer
});

export default rootReducer;
