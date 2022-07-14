import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from "constants/actionType";
import { TAuthActionType } from "redux/actions/authActions";
import { IUser } from "types/types";

const initState: IUser = {
  id: "",
  email: "",
};

const authReducer = (state = initState, action: TAuthActionType) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    //   @ts-ignore
    case LOGOUT_SUCCESS:
      return initState;
    case REGISTER_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

export default authReducer;
