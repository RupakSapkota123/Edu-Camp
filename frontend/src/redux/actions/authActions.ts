import { LOGIN_START } from "constants/actionType";
import { IRegister, IUser } from "types/types";

export const loginStart = (email: string, password: string) =>
  <const>{
    type: LOGIN_START,
    payload: {
      email,
      password,
    },
  };
