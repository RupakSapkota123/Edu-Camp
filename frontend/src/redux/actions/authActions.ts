import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_START,
  REGISTER_START,
  REGISTER_SUCCESS,
} from "constants/actionType";
import { IRegister, IUser } from "types/types";

export const loginStart = (email: string, password: string) =>
  <const>{
    type: LOGIN_START,
    payload: {
      email,
      password,
    },
  };

export const loginSuccess = (auth: IUser) =>
  <const>{
    type: LOGIN_SUCCESS,
    payload: auth,
  };

export const logoutStart = (callback?: () => void) =>
  <const>{
    type: LOGOUT_START,
    payload: { callback },
  };

export const logoutSuccess = () =>
  <const>{
    type: LOGOUT_START,
  };

export const registerStart = ({ email, password, username }: IRegister) =>
  <const>{
    type: REGISTER_START,
    payload: {
      email,
      password,
      username,
    },
  };

export const registerSuccess = (userAuth: IUser) =>
  <const>{
    type: REGISTER_SUCCESS,
    payload: userAuth,
  };

export type TAuthActionType =
  | ReturnType<typeof loginStart>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logoutStart>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof registerStart>
  | ReturnType<typeof registerSuccess>;
