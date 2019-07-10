import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";
import blogsReducer from "./blogsReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogsReducer,
  user: loginReducer,
  users: usersReducer
});

export default rootReducer;
