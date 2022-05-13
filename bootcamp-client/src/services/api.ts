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

export const fetchUser = (userId: string) =>
  httpRequest<IUser>({
    method: "GET",
    url: `/user/${userId}`,
  });

export const logout = () =>
  httpRequest<any>({
    method: "POST",
    url: "/user/logout",
  });
