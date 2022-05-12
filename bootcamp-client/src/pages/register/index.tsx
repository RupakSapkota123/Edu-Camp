/* eslint-disable react-hooks/rules-of-hooks */
import { Spin } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { registerStart } from "redux/actions/authActions";
import { setAuthErrorMessage } from "redux/actions/errorActions";
import { IRootReducer } from "types/types";

const index = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(setAuthErrorMessage(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, error } = useSelector((state: IRootReducer) => ({
    isLoading: state.loading.isLoadingAuth,
    error: state.error.authError,
  }));

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const { email, password, username, name } = data;
    dispatch(registerStart({ name, email, password, username }));
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
          <input type="text" {...register("name")} placeholder="name" />
          <input type="text" {...register("username")} placeholder="username" />
          <input type="text" {...register("email")} placeholder="email" />
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
    </>
  );
};

export default index;
