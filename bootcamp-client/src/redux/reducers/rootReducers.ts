import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import feedReducers from "./feedReducers";
import loadingReducer from "./loadingReducers";
import profileReducer from "./profileReducers";

const rootReducer = combineReducers({
  authReducer,
  loading: loadingReducer,
  error: errorReducer,
  profile: profileReducer,
  newsFeed: feedReducers,
});

export default rootReducer;
