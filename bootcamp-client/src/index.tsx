import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyles from "styles/GlobalStyles";
import { Provider } from "react-redux";
import store from "redux/store/store";
import App from "./App";

import "./input.css";
import "./styles/utils.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
