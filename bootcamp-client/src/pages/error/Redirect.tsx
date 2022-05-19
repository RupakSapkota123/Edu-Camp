import React from "react";
import { Link } from "react-router-dom";

function Redirect() {
  return (
    <div className="p-4 laptop:p-20 pt-40 h-screen flex items-start laptop:justify-center flex-col">
      <h1 className="text-xl mb-2 laptop:text-4xl dark:text-white">
        Uh oh, you seemed lost.
      </h1>
      <p className="dark:text-gray-400">
        The page you&apos;re trying to visit doesn&apos;t exist.
      </p>
      <br />
      <Link className="button inline-flex" to="/">
        Go to News Feed
      </Link>
    </div>
  );
}

export default Redirect;
