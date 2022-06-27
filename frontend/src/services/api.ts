import {
  IBootcamps,
  ICourses,
  IFetchParams,
  IRegister,
  IReviews,
  IUser,
} from "types/types";
import httpRequest from "./fetcher";

//   ------------------- AUTH METHODS ------------------

export const login = (username: string, password: string) =>
  httpRequest<IUser>({
    method: "POST",
    url: "/auth/login",
    data: {
      username,
      password,
    },
  });

export const register = ({ email, username, password }: IRegister) =>
  httpRequest<IUser>({
    method: "POST",
    url: "/auth/register",
    data: {
      email,
      username,
      password,
    },
  });

export const logout = () =>
  httpRequest<any>({
    method: "GET",
    url: "/auth/logout",
  });

export const forgetPassword = (email: string) =>
  httpRequest<any>({
    method: "POST",
    url: "/auth/forgetpassword",
    data: {
      email,
    },
  });

export const resetPassword = (password: string) =>
  httpRequest<any>({
    method: "POST",
    url: "/auth/resetpassword",
    data: {
      password,
    },
  });

export const updateUserDetails = (data: IUser) =>
  httpRequest<IUser>({
    method: "PUT",
    url: "/auth/updatedetails",
    data,
  });

export const updatePassword = (currentPassword: string, newPassword: string) =>
  httpRequest<any>({
    method: "PUT",
    url: "/auth/updatepassword",
    data: {
      currentPassword,
      newPassword,
    },
  });

export const loggedInUser = () =>
  httpRequest<IUser>({
    method: "GET",
    url: "/auth/me",
  });

//  ------------------- BOOTCAMPS METHODS ------------------

export const getBootcamps = (param: IFetchParams) =>
  httpRequest<IBootcamps>({
    method: "GET",
    url: "/bootcamps",
    params: param,
  });

export const getSingleBootcamp = (id: string) =>
  httpRequest<IBootcamps>({
    method: "GET",
    url: `/bootcamps/${id}`,
  });

export const createBootcamp = (data: IBootcamps) =>
  httpRequest<IBootcamps>({
    method: "POST",
    url: "/bootcamps",
    data,
  });

export const updateBootcamp = (id: string, data: IBootcamps) =>
  httpRequest<IBootcamps>({
    method: "PUT",
    url: `/bootcamps/${id}`,
    data,
  });

export const deleteBootcamp = (id: string) =>
  httpRequest<any>({
    method: "DELETE",
    url: `/bootcamps/${id}`,
  });

export const bootcampsByDistance = (zip: number, distance: number) =>
  httpRequest<IBootcamps>({
    method: "GET",
    url: `/bootcamps/radius/${zip}/${distance}`,
  });

//  ------------------- REVIEWS METHODS ------------------
export const getAllReviews = (params: IFetchParams) =>
  httpRequest<IReviews>({
    method: "GET",
    url: "/reviews",
    params,
  });

export const getSingleReview = (id: string) =>
  httpRequest<IReviews>({
    method: "GET",
    url: `/reviews/${id}`,
  });

export const createReview = (data: IReviews) =>
  httpRequest<IReviews>({
    method: "POST",
    url: "/reviews",
    data,
  });

export const updateReview = (id: string, data: IReviews) =>
  httpRequest<IReviews>({
    method: "PUT",
    url: `/reviews/${id}`,
    data,
  });

export const deleteReview = (id: string) =>
  httpRequest<any>({
    method: "DELETE",
    url: `/reviews/${id}`,
  });

//  ------------------- COURSES METHODS ------------------

export const getAllCourses = (params: IFetchParams) =>
  httpRequest<ICourses>({
    method: "GET",
    url: "/courses",
    params,
  });

export const getSingleCourse = (id: string) =>
  httpRequest<ICourses>({
    method: "GET",
    url: `/courses/${id}`,
  });

export const createCourse = (data: ICourses) =>
  httpRequest<ICourses>({
    method: "POST",
    url: "/courses",
    data,
  });

export const updateCourse = (id: string, data: ICourses) =>
  httpRequest<ICourses>({
    method: "PUT",
    url: `/courses/${id}`,
    data,
  });

export const deleteCourse = (id: string) =>
  httpRequest<any>({
    method: "DELETE",
    url: `/courses/${id}`,
  });

//   ------------------- USER METHODS ------------------

export const getUser = (id: string) =>
  httpRequest<IUser>({
    method: "GET",
    url: `/users/${id}`,
  });

export const getUsers = () =>
  httpRequest<IUser[]>({
    method: "GET",
    url: "/users",
  });

export const updateUser = (id: string, data: IUser) =>
  httpRequest<IUser>({
    method: "PUT",
    url: `/users/${id}`,
    data,
  });

export const deleteUser = (id: string) =>
  httpRequest<IUser>({
    method: "DELETE",
    url: `/users/${id}`,
  });
