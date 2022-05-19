/* eslint-disable react/function-component-definition */
import React from "react";
import { FacebookFilled } from "@ant-design/icons";

const SocialLogin: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const onClickSocialLogin = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (isLoading) e.preventDefault();
  };

  const Facebook = () => {
    window.open("http://localhost:9000/api/v1/auth/facebook", "_self");
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="button w-full bg-blue-500 hover:bg-blue-600"
      onClick={Facebook}
    >
      <FacebookFilled className="m-0 laptop:mr-4 text-xl laptop:text-sm" />
      <span className="hidden laptop:inline-block">Facebook</span>
    </div>
  );
};

export default SocialLogin;
