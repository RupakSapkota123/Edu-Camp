import {
  CLEAR_FEED,
  CREATE_POST_SUCCESS,
  DELETE_FEED_POST,
  GET_FEED_SUCCESS,
  HAS_NEW_FEED,
  UPDATE_FEED_POST,
  UPDATE_POST_LIKES,
} from "constants/actionType";
import { INewsFeed, IPost } from "types/types";
import { TNewsFeedActionType } from "../actions/feedActions";

const initialState: INewsFeed = {
  posts: [],
  offset: 0,
  hasNewFeed: false,
};
console.log("hello");
// eslint-disable-next-line @typescript-eslint/default-param-last
const feedReducers = (state = initialState, action: TNewsFeedActionType) => {
  switch (action.type) {
    case GET_FEED_SUCCESS:
      console.log("action.payload=====", action.payload);
      return {
        ...state,
        items: [...state.posts, ...action.payload],
        offset: state.offset + 1,
      };
    case UPDATE_POST_LIKES:
      return {
        ...state,
        posts: state.posts.map((post: IPost) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              likesCount: action.payload.likesCount,
            };
          }
          return post;
        }),
      };
    default:
      return state;
  }
};

export default feedReducers;
