/* eslint-disable no-useless-return */
import { REGISTER_START } from "constants/actionType";
import { call, put, select } from "redux-saga/effects";
import { registerSuccess } from "redux/actions/authActions";
import { register } from "services/api";
import socket from "socket/socket";
import { IError, IUser } from "types/types";

interface IAuthSaga {
  type: string;
  payload: any;
}

// function* handleError(e: IError){
//      yield put({isAuth})
// }

function* authSaga({ type, payload }: IAuthSaga) {
  switch (type) {
    case REGISTER_START:
      try {
        const user: IUser = yield call(register, payload);
        console.log("user", user.user);
        socket.emit("userConnect", user.user.id);
        yield put(registerSuccess(user));
      } catch (e) {
        console.log("e", e);
      }
      break;
    default:
      return;
  }
}

export default authSaga;
