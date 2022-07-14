import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducers";
// import modalReducer from "./modalReducer";
// import newsFeedReducer from "./newsFeedReducer";
// import profileReducer from "./profileReducer";
// import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  loading: loadingReducer,
  //   newsFeed: newsFeedReducer,
  //   profile: profileReducer,
  //   helper: helperReducer,
  //   modal: modalReducer,
  //   settings: settingsReducer,
});

export default rootReducer;
