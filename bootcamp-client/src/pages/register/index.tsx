/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { registerStart } from "redux/actions/authActions";
import { IRootReducer } from "types/types";

const index = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: IRootReducer) => ({
    isLoading: state.loading.isLoadingAuth,
  }));

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const { email, password, username, name } = data;
    console.log(data.username);
    dispatch(registerStart({ name, email, password, username }));
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("name")} placeholder="name" />
          <input type="text" {...register("username")} placeholder="username" />
          <input type="text" {...register("email")} placeholder="email" />
          <input type="text" {...register("password")} placeholder="password" />
          <button type="submit">submit</button>
        </form>
      )}
    </>
  );
};

export default index;
