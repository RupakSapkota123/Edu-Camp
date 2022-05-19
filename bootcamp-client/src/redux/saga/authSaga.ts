/* eslint-disable no-useless-return */
import { history } from "App";

import {
  CHECK_SESSION,
  LOGIN_START,
  LOGOUT_START,
  REGISTER_START,
} from "constants/actionType";
import { call, put, select } from "redux-saga/effects";
import {
  checkSession,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "redux/actions/authActions";
import { setAuthErrorMessage } from "redux/actions/errorActions";

import { register, login, logout } from "services/api";
import socket from "socket/socket";
import { IError, IUser } from "types/types";
import { isAuthenticating } from "../actions/loadingActions";

interface IAuthSaga {
  type: string;
  payload: any;
}

function* handleError(e: IError) {
  yield put(isAuthenticating(false));

  yield put(setAuthErrorMessage(e));
}

function* authSaga({ type, payload }: IAuthSaga) {
  switch (type) {
    case REGISTER_START:
      try {
        yield put(isAuthenticating(true));
        const user: IUser = yield call(register, payload);
        socket.emit("userConnect", user.user.id);
        yield put(registerSuccess(user));
        yield put(isAuthenticating(false));
      } catch (e: any) {
        console.log("e=====", e.error);
        yield handleError(e.error.message);
      }
      break;
    case LOGIN_START:
      try {
        yield put(isAuthenticating(true));
        console.log("payload=====", payload);
        const { data } = yield call(login, payload.username, payload.password);
        yield put(isAuthenticating(false));
        socket.emit("userConnect", data.auth.id);
        yield put(loginSuccess(data.auth));
        history.push("/welcome");
      } catch (e: any) {
        console.log("e=====", e);
        yield handleError(e.error.message);
      }
      break;
    case CHECK_SESSION:
      try {
        yield put(isAuthenticating(true));
        const { data } = yield call(checkSession);
        console.log("success=====", data);
        yield put(loginSuccess(data.auth));
        yield put(isAuthenticating(false));
      } catch (e: any) {
        console.log("e=====", e);
        yield handleError(e.error.message);
      }
      break;
    case LOGOUT_START:
      try {
        const { data } = yield select();
        yield put(isAuthenticating(true));
        yield call(logout);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        payload.callback && payload.callback();

        yield put(logoutSuccess());
        yield put(isAuthenticating(false));
        socket.emit("userDisconnect", data.auth.id);
        history.push("/login");
      } catch (e: any) {
        console.log("e=====", e);
        yield handleError(e.error.message);
      }
      break;
    default:
      return;
  }
}

export default authSaga;
