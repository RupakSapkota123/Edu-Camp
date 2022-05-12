import { IRegister, IUser } from "types/types";
import httpRequest from "./fetcher";

export const register = ({ email, password, username, name }: IRegister) =>
  httpRequest<IUser>({
    method: "POST",
    url: "/user",
    data: {
      name,
      email,
      password,
      username,
    },
  });

export const logout = () =>
  httpRequest<any>({
    method: "POST",
    url: "/user/logout",
  });
