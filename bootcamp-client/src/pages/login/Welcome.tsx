import Loader from "components/shared/Loader";
import React from "react";
import { loginSuccess } from "redux/actions/authActions";

function Welcome() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">welcome!!</h1>
      <Loader mode="sm" />
    </div>
  );
}

export default Welcome;
