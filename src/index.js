import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";

const store = configureStore();

import AppRoutes from "./AppRoutes";

const el = document.querySelector("#root");

import "semantic-ui-css/semantic.min.css";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  el
);
