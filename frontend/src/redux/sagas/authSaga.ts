import { call, put, select } from "redux-saga/effects";
import {} from "App";
import {
  CHECK_SESSION,
  LOGIN_START,
  LOGOUT_START,
  REGISTER_START,
} from "constants/actionType";
import { LOGIN } from "constants/routes";
import { login, logout, register } from "services/api";
import { IError, IUser } from "types/types";

interface IAuthSaga {
  type: string;
  payload: any;
}
