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
    role: [ROLE.ADMIN, ROLE.EMPLOYEE],
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
    auth: true,
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
    path: ROUTES.SUPPLIER_MANAGEMENT,
    component: React.lazy(() => import("../view/SupplierManagement")),
    label: "QL Nhà cung câp",
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
    path: ROUTES.STATISTIC,
    component: React.lazy(() => import("../view/Statistic")),
    label: "Thống kê",
    role: [ROLE.ADMIN, ROLE.EMPLOYEE],
    isMenuItem: true,
    icon: <InboxOutlined />,
  },
  {
    path: ROUTES.ORDER_DETAIL,
    component: React.lazy(() => import("../view/OrderDetail")),
    role: FULL_ACCESS,
    viewUser: true,
    auth: true,
  },
  {
    path: ROUTES.HOME_USER,
    component: React.lazy(() => import("../view/UserView")),
    role: FULL_ACCESS,
    viewUser: true,
    auth: true,
  },

  {
    path: ROUTES.PRODUCT_DETAIL,
    component: React.lazy(() => import("../view/ProductView")),
    role: FULL_ACCESS,
    viewUser: true,
    auth: true,
  },
  {
    path: ROUTES.LIST_ORDER_HISTORY,
    component: React.lazy(() => import("../view/OrderHistory")),
    role: FULL_ACCESS,
    viewUser: true,
    auth: true,
  },
  {
    path: ROUTES.ORDER_DETAIL_HISTORY,
    component: React.lazy(() => import("../view/OrderDetailsHistory")),
    role: FULL_ACCESS,
    viewUser: true,
    auth: true,
  },
];

export default Routers;
