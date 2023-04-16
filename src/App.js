import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Routers from "./routes";
import store from "./redux/store";
import ROUTES from "./routes/routes";
import "./common/css/index.less";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

/**
 * @class Router
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * render
   * @returns {HTML}
   */
  render() {
    return (
      <Suspense>
        <Provider store={store}>
          <ConfigProvider theme={{ hashed: false }}>
            <BrowserRouter>
              <Routes>
                {Routers.map((router, idx) => {
                  return (
                    <Route
                      key={idx}
                      path={router.path}
                      exact
                      element={<router.component />}
                    ></Route>
                  );
                })}
                <Route
                  path="/"
                  exact
                  element={<Navigate to={ROUTES.HOME} replace />}
                />
              </Routes>
            </BrowserRouter>
          </ConfigProvider>
        </Provider>
      </Suspense>
    );
  }
}

export default App;
