/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  CHECK_SESSION,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  REGISTER_START,
  REGISTER_SUCCESS,
  UPDATE_AUTH_PICTURE,
} from "constants/actionType";
import { IRegister, IUser } from "types/types";

export const loginStart = (username: string, password: string) =>
  <const>{
    type: LOGIN_START,
    payload: {
      username,
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
    type: LOGOUT_SUCCESS,
  };

export const registerStart = ({ name, email, password, username }: IRegister) =>
  <const>{
    type: REGISTER_START,
    payload: {
      name,
      email,
      password,
      username,
    },
  };

export const registerSuccess = (user: IUser) =>
  <const>{
    type: REGISTER_SUCCESS,
    payload: {
      user,
    },
  };

export const checkSession = () =>
  <const>{
    type: CHECK_SESSION,
  };

export const updateAuthPicture = (picture: Object) =>
  <const>{
    type: UPDATE_AUTH_PICTURE,
    payload: {
      picture,
    },
  };

export type TAuthActionType =
  | ReturnType<typeof loginStart>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logoutStart>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof registerStart>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof checkSession>
  | ReturnType<typeof updateAuthPicture>;
