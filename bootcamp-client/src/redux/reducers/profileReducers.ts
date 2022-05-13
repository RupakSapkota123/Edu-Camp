import {
  GET_FEED_START,
  GET_USER_START,
  GET_USER_SUCCESS,
  UPDATE_COVER_PHOTO,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_PICTURE,
} from "constants/actionType";
import { IProfile } from "types/types";
import { TProfileActionTypes } from "../actions/profileActions";

const initState: IProfile = {
  _id: "",
  id: "",
  username: "",
  email: "",
  fullName: "",
  firstName: "",
  lastName: "",
  info: {
    bio: "",
    birthday: "",
    gender: "unspecified",
  },
  profilePicture: {},
  coverPhoto: {},
  followersCount: 0,
  followingCount: 0,
  dateJoined: "",
  isEmailValidated: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const profileReducer = (state = initState, action: TProfileActionTypes) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      console.log("action.payload=====", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case UPDATE_PROFILE_INFO:
      // eslint-disable-next-line no-case-declarations
      const { payload: user } = action;
      return {
        ...state,
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        info: user.info,
      };
    case UPDATE_COVER_PHOTO:
      return {
        ...state,
        coverPhoto: action.payload,
      };
    case GET_USER_START:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
