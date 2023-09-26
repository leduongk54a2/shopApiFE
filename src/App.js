import React, { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Routers from "./routes";
import store from "./redux/store";
import ROUTES from "./routes/routes";
import "./common/css/index.less";
import "antd/dist/reset.css";
import { ConfigProvider, Spin } from "antd";
import Login from "./view/Auth/Login";
import withAuthCheck from "./common/HOCs";
import ResetPassword from "./view/Auth/ResetPassword";
import Layouts from "./view/Layouts";

const App = () => {
  /**
   * render
   * @returns {HTML}
   */
  return (
    <Suspense>
      <Provider store={store}>
        <ConfigProvider theme={{ hashed: false }}>
          <BrowserRouter>
            <Layouts />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </Suspense>
  );
};

export default React.memo(App);
