import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_AUTH_PICTURE,
} from "constants/actionType";
import { TAuthActionType } from "redux/actions/authActions";
import { IUser } from "types/types";

const initState: IUser = {
  id: "",
  email: "",
  username: "",
  fullName: "",
  avatar: {},
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const authReducer = (state = initState, action: TAuthActionType) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    case LOGOUT_SUCCESS:
      return initState;
    case REGISTER_SUCCESS:
      return action.payload;
    case UPDATE_AUTH_PICTURE:
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
