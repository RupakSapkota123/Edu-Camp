import { createBrowserHistory } from "history";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";

import * as Shared from "./components";

export const history = createBrowserHistory();
const App = () => {
  const [checkSession, setCheckSession] = React.useState(false);
  return checkSession ? (
    <p>loading....</p>
  ) : (
    <main className="relative min-h-screen">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        draggable={false}
        transition={Slide}
        bodyStyle={{ paddingLeft: "15px" }}
      />
      <Shared.Navbar />
    </main>
  );
};

export default App;
