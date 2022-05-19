import React from "react";
import Login from "pages/login/index";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes, useNavigate } from "react-router";
import Welcome from "pages/login/Welcome";
import { createBrowserHistory } from "history";
import Redirect from "pages/error/Redirect";
import New from "./New";
import socket from "./socket/socket";
import Register from "./pages/register/index";

export const history = createBrowserHistory();

function App() {
  if (window.location.hash && window.location.hash === "#_=_") {
    window.location.hash = "";
  }

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/like" element={<New />} />
        <Route path="/auth/facebook/failed" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
