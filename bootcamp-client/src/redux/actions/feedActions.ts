/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  CLEAR_FEED,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  DELETE_FEED_POST,
  GET_FEED_START,
  GET_FEED_SUCCESS,
  HAS_NEW_FEED,
  UPDATE_FEED_POST,
  UPDATE_POST_LIKES,
} from "constants/actionType";
import { IFetchParams, IPost } from "types/types";

export const getNewsFeedStart = (options?: IFetchParams) =>
  <const>{
    type: GET_FEED_START,
    payload: options,
  };

export const getNewsFeedSuccess = (posts: IPost[]) =>
  <const>{
    type: GET_FEED_SUCCESS,
    payload: posts,
  };

export const updatePostLikes = (
  postId: string,
  state: boolean,
  likesCount: number,
) =>
  <const>{
    type: UPDATE_POST_LIKES,
    payload: {
      postId,
      state,
      likesCount,
    },
  };

export const clearNewsFeed = () =>
  <const>{
    type: CLEAR_FEED,
  };

export type TNewsFeedActionType =
  | ReturnType<typeof clearNewsFeed>
  | ReturnType<typeof updatePostLikes>
  | ReturnType<typeof getNewsFeedStart>
  | ReturnType<typeof getNewsFeedSuccess>;
