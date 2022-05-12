import React from "react";
import socket from "./socket/socket";
import Register from "./pages/register/index";

function App() {
  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);
  return (
    <>
      <div>hi</div>
      <Register />
      <h1 className="text-3xl font-bold underline">Hello world!!</h1>
    </>
  );
}

export default App;
