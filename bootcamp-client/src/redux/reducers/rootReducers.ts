import { combineReducers } from "redux";
import authReducer from "./authReducers";

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
