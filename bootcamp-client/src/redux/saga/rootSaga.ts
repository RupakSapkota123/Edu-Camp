import { takeLatest } from "redux-saga/effects";
import {
  CHECK_SESSION,
  GET_FEED_START,
  GET_USER_START,
  LOGIN_START,
  LOGOUT_START,
  REGISTER_START,
} from "constants/actionType";
import authSaga from "./authSaga";
import profileSaga from "./profileSaga";
import newsFeedSaga from "./feedSaga";

function* rootSaga() {
  yield takeLatest(
    [LOGIN_START, LOGOUT_START, REGISTER_START, CHECK_SESSION],
    authSaga,
  );
  yield takeLatest([GET_USER_START], profileSaga);

  yield takeLatest([GET_FEED_START], newsFeedSaga);
}

export default rootSaga;
