/* eslint-disable no-useless-return */
import { REGISTER_START } from "constants/actionType";
import { call, put, select } from "redux-saga/effects";
import { registerSuccess } from "redux/actions/authActions";
import { setAuthErrorMessage } from "redux/actions/errorActions";

import { register } from "services/api";
import socket from "socket/socket";
import { IError, IUser } from "types/types";
import { isAuthenticating } from "../actions/loadingActions";

interface IAuthSaga {
  type: string;
  payload: any;
}

function* handleError(e: IError) {
  yield put(isAuthenticating(false));

  console.log("e===>", e);

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
        console.log("e", e);
        yield handleError(e);
      }
      break;
    default:
      return;
  }
}

export default authSaga;
