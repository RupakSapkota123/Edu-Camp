import { combineReducers } from "redux";
import authReducer from "./authReducers";
import loadingReducer from "./loadingReducers";

const rootReducer = combineReducers({
  authReducer,
  loading: loadingReducer,
});

export default rootReducer;
