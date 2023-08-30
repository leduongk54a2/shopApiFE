import React from "react";
import ROUTES from "./routes";
import { HomeOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";

const Routers = [
  {
    path: ROUTES.HOME,
    component: React.lazy(() => import("../view/Home")),
    label: "HOME",
    isMenuItem: true,
    icon: <HomeOutlined />,
  },
  {
    path: ROUTES.LOGIN,
    component: React.lazy(() => import("../view/Auth/Login")),
    auth: true,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: React.lazy(() => import("../view/Auth/ResetPassword")),
    auth: true,
  },
  {
    path: ROUTES.REGISTER,
    component: React.lazy(() => import("../view/Auth/Register")),
    auth: true,
  },
  {
    path: ROUTES.PAGE403,
    component: React.lazy(() => import("../view/Auth/403Page")),
  },
  {
    path: ROUTES.EMPLOYEE_MANAGEMENT,
    component: React.lazy(() => import("../view/EmployeeManagement")),
    label: "QLNV",
    isMenuItem: true,
    icon: <UserOutlined />,
  },

  {
    path: ROUTES.CATEGORY_MANAGEMENT,
    component: React.lazy(() => import("../view/CategoryManagement")),
    label: "QL Category",
    isMenuItem: true,
    icon: <InboxOutlined />,
  },
  {
    path: ROUTES.PRODUCT_MANAGEMENT,
    component: React.lazy(() => import("../view/ProductManagement")),
    label: "QL Sản Phẩm",
    isMenuItem: true,
    icon: <InboxOutlined />,
  },
];

export default Routers;
