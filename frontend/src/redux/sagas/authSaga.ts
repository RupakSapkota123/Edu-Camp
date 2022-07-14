import { call, put, select } from "redux-saga/effects";
import { history } from "App";
import {
  CHECK_SESSION,
  LOGIN_START,
  LOGOUT_START,
  REGISTER_START,
} from "constants/actionType";
import { LOGIN } from "constants/routes";
import { login, logout, register } from "services/api";
import { IError, IUser } from "types/types";
import { isAuthenticating } from "redux/actions/loadingActions";
import { setAuthErrorMessage } from "redux/actions/errorActions";
import {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "redux/actions/authActions";

interface IAuthSaga {
  type: string;
  payload: any;
}

function* handleError(error: IError) {
  yield put(isAuthenticating(false));

  yield put(setAuthErrorMessage(error));
}

function* authSaga({ type, payload }: IAuthSaga) {
  switch (type) {
    case LOGIN_START:
      try {
        yield put(isAuthenticating(true));
        const { auth } = yield call(login, payload.email, payload.password);
        yield put(loginSuccess(auth));
        yield put(isAuthenticating(false));
      } catch (err: any) {
        console.log(err);

        yield handleError(err);
      }
      break;
    case LOGOUT_START:
      try {
        const { auth } = yield select();
        yield put(isAuthenticating(true));
        yield call(logout);

        payload.callback && payload.callback();

        yield put(logoutSuccess());
        yield put(isAuthenticating(false));
        history.push(LOGIN);
      } catch (err: any) {
        console.log(err);

        yield handleError(err);
      }

      break;

    case REGISTER_START:
      try {
        yield put(isAuthenticating(true));
        const user: IUser = yield call(register, payload);
        yield put(registerSuccess(user));
        yield put(isAuthenticating(false));
      } catch (err: any) {
        console.log(err);

        yield handleError(err);
      }
      break;
    default:
      return;
  }
}

export default authSaga;