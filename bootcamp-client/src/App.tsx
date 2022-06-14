import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes, useNavigate } from "react-router";
import Welcome from "pages/login/Welcome";
import { createBrowserHistory } from "history";
import Redirect from "pages/error/Redirect";
import socket from "./socket/socket";

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
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth/facebook/failed" element={<Redirect />} />
    </Routes>
  );
}

export default App;
