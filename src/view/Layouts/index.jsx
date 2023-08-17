import React, { useCallback, useMemo, useState } from "react";
import { Avatar, Button, Layout, Menu, Spin } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";

import "./index.less";
import { logout } from "../../redux/actions/app";
import { connect } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ROUTES from "../../routes/routes";
import Routers from "../../routes";
import withAuthCheck from "../../common/HOCs";

const withAuthComponent = (WrappedComponent) => {
  const AuthCheck = (props) => {
    return (
      <div className="fixed h-screen w-screen top-0 left-0 bg-white">
        <WrappedComponent {...props} />
      </div>
    );
  };
  return React.memo(AuthCheck);
};

const RenderRouter = () => {
  const listRouterTag = useMemo(() => {
    return Routers.map((router, idx) => {
      return (
        <Route
          key={idx}
          path={router.path}
          exact
          Component={
            router.auth
              ? withAuthComponent(router.component)
              : withAuthCheck(router.component)
          }
        ></Route>
      );
    });
  }, []);

  return <>{listRouterTag}</>;
};
function Layouts(props) {
  const [collapsed, setCollapsed] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useNavigate();
  const location = useLocation();

  const logout = () => {
    props.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    history(ROUTES.LOGIN);
  };

  return (
    <Layout className="h-screen w-screen overflow-hidden">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex flex-col h-screen justify-between">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={ROUTES.HOME}
            selectedKeys={[location.pathname]}
          >
            {Routers.filter((item) => item.isMenuItem).map((menuItem) => (
              <Menu.Item
                onClick={() => history(menuItem.path)}
                key={menuItem.path}
                icon={menuItem.icon}
              >
                <span>{menuItem.label}</span>
              </Menu.Item>
            ))}
          </Menu>
          <div
            className="flex text-white py-2 items-center justify-around bottom-0 relative   mb-5 mx-2 border-transparent border-r bg-blue-700 rounded-lg cursor-pointer"
            onClick={logout}
          >
            {!collapsed && <div className="text-white">Đăng xuất</div>}
            <LogoutOutlined style={{ fontSize: "30px" }} />
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className="p-0 flex items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center">
            <Avatar
              className="bg-gray-500"
              size={50}
              icon={<UserOutlined />}
            ></Avatar>{" "}
            <div className="text-white pl-5 pr-5">{userInfo?.full_name}</div>
          </div>
        </Header>
        <Content className="h-full w-full relative">
          <Routes>
            {RenderRouter()}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

/**
 * mapDispatchToProps
 * @param {Object} dispatch
 * @returns {Object}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(Layouts);
