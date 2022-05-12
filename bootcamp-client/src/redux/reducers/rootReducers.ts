import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import loadingReducer from "./loadingReducers";

const rootReducer = combineReducers({
  authReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default rootReducer;
