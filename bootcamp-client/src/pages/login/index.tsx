/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
import { Spin } from "antd";
import SocialLogin from "components/shared/SocialLogin";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  loginStart,
  registerStart,
  loginSuccess,
} from "redux/actions/authActions";
import { setAuthErrorMessage } from "redux/actions/errorActions";
import { getUserSuccess } from "redux/actions/profileActions";
import { IRootReducer } from "types/types";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, profile, auth } = useSelector(
    (state: IRootReducer) => ({
      auth: !!state.auth,
      isLoading: state.loading.isLoadingAuth,
      error: state.error.authError,
      profile: state.profile,
    }),
  );

  console.log("user===>", profile);
  console.log("error===>", error);
  console.log("auth===>", auth);

  React.useEffect(() => {
    return () => {
      dispatch(setAuthErrorMessage(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const { username, password } = data;
    console.log("loginData", data);
    dispatch(loginStart(username, password));
    //
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading ? (
        <div>
          <Spin />
          <p>Loading.....</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("username")} placeholder="username" />
          <input type="text" {...register("password")} placeholder="password" />
          <button type="submit">submit</button>
        </form>
      )}
      {error && (
        <div className="p-4 w-full text-center bg-red-100 border-red-400 absolute top-0 left-0">
          <p className="text-red-500 text-sm">
            {error || "Something went wrong :("}
          </p>
        </div>
      )}
      <SocialLogin isLoading={isLoading} />
    </>
  );
}

export default Login;
