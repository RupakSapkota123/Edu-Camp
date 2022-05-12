/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  SET_AUTH_LOADING,
  SET_CREATE_POST_LOADING,
  SET_GET_FEED_LOADING,
  SET_GET_USER_LOADING,
} from "constants/actionType";

export const isAuthenticating = (bool: boolean = true) =>
  <const>{
    type: SET_AUTH_LOADING,
    payload: bool,
  };

export const isCreatingPost = (bool: boolean = true) =>
  <const>{
    type: SET_CREATE_POST_LOADING,
    payload: bool,
  };

export const isGettingFeed = (bool: boolean = true) =>
  <const>{
    type: SET_GET_FEED_LOADING,
    payload: bool,
  };

export const isGettingUser = (bool: boolean = true) =>
  <const>{
    type: SET_GET_USER_LOADING,
    payload: bool,
  };

export type TLoadingActionType =
  | ReturnType<typeof isAuthenticating>
  | ReturnType<typeof isCreatingPost>
  | ReturnType<typeof isGettingFeed>
  | ReturnType<typeof isGettingUser>;
