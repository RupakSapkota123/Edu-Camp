import React from "react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IRootReducer {
  auth: IUser;
  profile: IProfile;
  error: IError;
  modal: IModalState;
  loading: TLoading;
  newsFeed: INewsFeed;
}

export interface IErrorState {
  authError: IError | null;
  profileError: IError | null;
  postError: IError | null;
  commentError: IError | null;
  likeError: IError | null;
  newsFeedError: IError | null;
}

export interface TLoading {
  isLoadingAuth: boolean;
  isLoadingCreatePost: boolean;
  isLoadingCreateComment: boolean;
  isLoadingGetUserProfile: boolean;
  isLoadingFeed: boolean;
}

export interface INewsFeed {
  posts: IPost[];
  hasNewFeed: boolean;
  offset: number;
}

export interface IUser {
  id: string;
  username: string;
  email?: string;
  avatar?: Record<string, any>;
  fullName?: string;
  [prop: string]: any;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface IPost {
  id: string;
  name: string;
  description: string;
  careers: string[];
  photos: Record<string, any>;
  comments: any[];
  author: IUser;
  commentsCount: number;
  likesCount: number;
  createdAt: Date;
  isLiked: boolean;
  isOwnPost: boolean;
  updatedAt: Date;
}

export interface IModalState {
  isOpenDeleteComment: boolean;
  isOpenDeletePost: boolean;
  isOpenEditPost: boolean;
  isOpenPostLikes: boolean;
}

export enum EModalType {
  DELETE_COMMENT = "DELETE_COMMENT",
  DELETE_POST = "DELETE_POST",
  EDIT_POST = "EDIT_POST",
  POST_LIKES = "POST_LIKES",
}

export interface IComment {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  depth: number;
  replyCount: number;
  likesCount: number;
  isLiked: boolean;
  isOwnComment: boolean;
  isPostOwner: boolean;
  post_id: string;
  author: IUser;
}

export interface IProfile {
  _id: string;
  id: string;
  username: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  info: {
    bio: string;
    birthday: string;
    gender: string;
  };
  isEmailValidated: boolean;
  profilePicture?: Record<string, any>;
  coverPhoto?: Record<string, any>;
  dateJoined: Date | string;
  followingCount: number;
  followersCount: number;
  [prop: string]: any;
}

export interface INotification {
  id: string;
  initiator: IProfile;
  target: IProfile;
  createdAt: Date;
  type: string;
  unread: boolean;
  link: string;
}

export interface ISettingState {
  theme: "light" | "dark";
}

export interface ICreatePost {
  description: string;
  photos?: [];
}

export interface IFetchParams {
  limit: number;
  offset: number;
  skip: number;
  q?: string;
  sort?: "asc" | "desc";
  type: string;
}

export interface IError {
  status_code: number;
  data: any;
  error: {
    message: string;
    title: string;
    type: string;
  };
  success: boolean;
  timeStamp: string | Date;
  [prop: string]: any;
}

export interface IImage {
  id: string;
  url: string;
  file: File | null;
}

export interface IFileHandler<T> {
  imageFile: T;
  setImageFile: React.Dispatch<React.SetStateAction<T>>;
  isFileLoading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (id: string) => void;
  clearFiles: () => void;
}
