import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Avatar, Button, Drawer, Layout, Menu } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./index.less";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ROUTES from "../../routes/routes";
import Routers from "../../routes";
import ShoppingCart from "../ShoppingCart";
import withAuthCheck from "../../common/HOCs/withAuthCheck";
import { logout } from "../../redux/actions/app";
import { getCartInfo } from "../../redux/actions/cart";
import withViewLayout from "../../common/HOCs/withViewLayout";

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

const Layouts = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const userInfo = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);
  const history = useNavigate();
  const location = useLocation();
  const listRouterTag = useMemo(() => {
    return Routers.map((router, idx) => {
      const ComponentRender = router.auth
        ? withAuthComponent(
            router.viewUser
              ? withViewLayout(router.component)
              : router.component
          )
        : withAuthCheck(router.component, router.role);
      return (
        <Route
          key={idx}
          path={router.path}
          exact
          render
          element={<ComponentRender />}
          // Component={ComponentRender}
        ></Route>
      );
    });
  }, []);
  const MenuItems = useMemo(() => {
    return Routers.filter((item) => item.isMenuItem).map((menuItem) => (
      <Menu.Item
        onClick={() => history(menuItem.path)}
        key={menuItem.path}
        icon={menuItem.icon}
      >
        <span>{menuItem.label}</span>
      </Menu.Item>
    ));
  }, [history, userInfo]);

  const collapsedMenu = useCallback(
    () => setCollapsed((prevState) => !prevState),
    []
  );

  const HeaderRender = useMemo(() => {
    return (
      <Layout.Header className="p-0 flex items-center justify-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={collapsedMenu}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="flex items-center mx-16">
          <Avatar
            className="bg-gray-500"
            size={50}
            icon={<UserOutlined />}
          ></Avatar>{" "}
          <div className="text-white pl-5 pr-5">{userInfo?.full_name}</div>
        </div>
      </Layout.Header>
    );
  }, [userInfo, collapsed, collapsedMenu]);
  const logoutWeb = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    history(ROUTES.LOGIN);
  }, [history, dispatch]);

  useEffect(() => {
    dispatch(getCartInfo());
  }, [dispatch, userInfo]);

  return (
    <div>
      <div className="h-screen w-screen overflow-hidden ">
        <Layout>
          <Layout.Sider
            className=" hidden lg:block"
            trigger={null}
            collapsible
            defaultCollapsed={true}
            collapsed={collapsed}
          >
            <div className="flex flex-col h-screen justify-between">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={ROUTES.HOME}
                selectedKeys={[location.pathname]}
              >
                {MenuItems}
              </Menu>
              <div
                className="flex text-white py-2 items-center justify-around bottom-0 relative   mb-5 mx-2 border-transparent border-r bg-blue-700 rounded-lg cursor-pointer"
                onClick={logoutWeb}
              >
                {!collapsed && <div className="text-white">Đăng xuất</div>}
                <LogoutOutlined style={{ fontSize: "30px" }} />
              </div>
            </div>
          </Layout.Sider>
          <Drawer
            rootClassName="drawer-wrapper"
            placement="left"
            onClose={() => setCollapsed(false)}
            open={collapsed}
            className=" block lg:hidden"
            maskClassName="block lg:hidden"
          >
            <div className="flex flex-col h-screen justify-between">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={ROUTES.HOME}
                selectedKeys={[location.pathname]}
              >
                {MenuItems}
              </Menu>
              <div
                className="flex text-white py-2 items-center justify-around bottom-0 relative   mb-5 mx-2 border-transparent border-r bg-blue-700 rounded-lg cursor-pointer"
                onClick={logout}
              >
                {!collapsed && <div className="text-white">Đăng xuất</div>}
                <LogoutOutlined style={{ fontSize: "30px" }} />
              </div>
            </div>
          </Drawer>
          <Layout>
            {HeaderRender}
            <Layout.Content className="h-full w-full relative">
              <Routes>
                {listRouterTag}
                <Route
                  path="*"
                  element={<Navigate to={ROUTES.HOME_USER} replace />}
                />
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default Layouts;
