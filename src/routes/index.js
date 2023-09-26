import React from "react";
import ROUTES from "./routes";
import { HomeOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";
import { ROLE } from "../common/constans/app";

const FULL_ACCESS = [ROLE.ADMIN, ROLE.CUSTOMER, ROLE.EMPLOYEE];

const Routers = [
  {
    path: ROUTES.HOME,
    component: React.lazy(() => import("../view/Home")),
    label: "HOME",
    isMenuItem: true,
    role: FULL_ACCESS,
    icon: <HomeOutlined />,
  },
  {
    path: ROUTES.LOGIN,
    component: React.lazy(() => import("../view/Auth/Login")),
    role: FULL_ACCESS,
    auth: true,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: React.lazy(() => import("../view/Auth/ResetPassword")),
    role: FULL_ACCESS,
    auth: true,
  },
  {
    path: ROUTES.REGISTER,
    component: React.lazy(() => import("../view/Auth/Register")),
    role: FULL_ACCESS,
    auth: true,
  },
  {
    path: ROUTES.PAGE403,
    component: React.lazy(() => import("../view/Auth/403Page")),
    role: FULL_ACCESS,
  },
  {
    path: ROUTES.EMPLOYEE_MANAGEMENT,
    component: React.lazy(() => import("../view/EmployeeManagement")),
    label: "QLNV",
    role: [ROLE.ADMIN],
    isMenuItem: true,
    icon: <UserOutlined />,
  },

  {
    path: ROUTES.CATEGORY_MANAGEMENT,
    component: React.lazy(() => import("../view/CategoryManagement")),
    label: "QL Category",
    role: [ROLE.ADMIN, ROLE.EMPLOYEE],
    isMenuItem: true,
    icon: <InboxOutlined />,
  },
  {
    path: ROUTES.PRODUCT_MANAGEMENT,
    component: React.lazy(() => import("../view/ProductManagement")),
    label: "QL Sản Phẩm",
    role: FULL_ACCESS,
    isMenuItem: true,
    icon: <InboxOutlined />,
  },
  {
    path: ROUTES.ORDER_DETAIL,
    component: React.lazy(() => import("../view/OrderDetail")),
    role: FULL_ACCESS,
  },
];

export default Routers;
