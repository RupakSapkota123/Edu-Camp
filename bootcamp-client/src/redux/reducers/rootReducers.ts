import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import loadingReducer from "./loadingReducers";
import profileReducer from "./profileReducers";

const rootReducer = combineReducers({
  authReducer,
  loading: loadingReducer,
  error: errorReducer,
  profile: profileReducer,
});

export default rootReducer;
