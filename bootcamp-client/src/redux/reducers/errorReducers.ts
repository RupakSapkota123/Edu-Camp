import {
  CLEAR_AUTH_ERR_MSG,
  SET_AUTH_ERR_MSG,
  SET_NEWSFEED_ERR_MSG,
  SET_PROFILE_ERR_MSG,
} from "constants/actionType";
import { IErrorState } from "types/types";
import { TErrorActionType } from "../actions/errorActions";

const initState: IErrorState = {
  authError: null,
  profileError: null,
  newsFeedError: null,
  postError: null,
  commentError: null,
  likeError: null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const errorReducer = (state = initState, action: TErrorActionType) => {
  switch (action.type) {
    case SET_AUTH_ERR_MSG:
      return {
        ...state,
        authError: action.payload,
      };

    case SET_PROFILE_ERR_MSG:
      return {
        ...state,
        profileError: action.payload,
      };

    case SET_NEWSFEED_ERR_MSG:
      return {
        ...state,
        newsFeedError: action.payload,
      };

    case CLEAR_AUTH_ERR_MSG:
      return {
        ...state,
        authError: null,
      };

    default:
      return state;
  }
};

export default errorReducer;
