import { IFetchParams, IPost, IProfile, IRegister, IUser } from "types/types";
import httpRequest from "./fetcher";

export const login = (username: string, password: string) =>
  httpRequest<IUser>({
    method: "POST",
    url: "/auth/login",
    data: {
      username,
      password,
    },
  });

export const register = ({ email, password, username, name }: IRegister) =>
  httpRequest<IUser>({
    method: "POST",
    url: "/auth/register",
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

export const likePost = (postId: string) => {
  return httpRequest<{ state: string; likesCount: number }>({
    method: "POST",
    url: `/post/like/${postId}`,
  });
};

export const getPostLikes = (postID: string, params: IFetchParams) => {
  return httpRequest<IProfile[]>({
    method: "GET",
    url: `/post/likes/${postID}`,
    params,
  });
};

export const getSinglePost = (postID: string) =>
  httpRequest<IPost>({ method: "GET", url: `/post/${postID}` });

export const getNewsFeed = (params?: IFetchParams) =>
  httpRequest<any>({
    method: "GET",
    url: "/feed",
    params,
  });
