import {
  HomeFilled,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Menu,
  message,
  Popover,
  Table,
  Typography,
} from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../../routes/routes";
import "./index.less";
import ShoppingCart from "../../ShoppingCart";
import { logout } from "../../../redux/actions/app";

function HeaderUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const userInfo = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);
  const paramSearchSelect = useMemo(() => {
    const paramSearch = new URLSearchParams(location.search);
    const searchText = paramSearch.get("keyword") || "";
    const categoryId = paramSearch.get("categoryId") || "";

    return { categoryId, searchText };
  }, [location.search]);

  const listCategory =
    useSelector((state) => state.category.listCategory) || [];

  const searchRef = useRef();
  useEffect(() => {
    setSearchText(paramSearchSelect.searchText);
  }, [paramSearchSelect.searchText]);

  const onMenuClick = (item) => {
    if (item.key) {
      navigate(`${ROUTES.HOME_USER}?categoryId=${item.key}`);
    } else {
      navigate(`${ROUTES.HOME_USER}`);
    }
  };

  const logoutWeb = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    navigate(ROUTES.LOGIN);
  }, []);

  return (
    <div className="w-screen flex flex-col shadow-sm shadow-slate-400 px-5">
      <div className="appHeader my-3 !shadow-none flex flex-row">
        <Typography.Title className="!m-0">
          <div className="flex flex-row items-center justify-center">
            <span className="text-4xl font-extrabold hidden sm:block">
              Shiba Store
            </span>

            <Image
              height={50}
              width={50}
              src={window.location.origin + "/Logo.png"}
              preview={false}
            ></Image>
          </div>
        </Typography.Title>
        <Input.Search
          ref={searchRef}
          className="w-1/2"
          placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
          onSearch={() => {
            if (searchText.length) {
              navigate(`${ROUTES.HOME_USER}?keyword=${searchText}`);
            } else {
              navigate(`${ROUTES.HOME_USER}`);
            }
          }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          enterButton
        />
        {userInfo ? (
          <>
            <div
              className="cursor-pointer rounded-lg bg-red-400 px-2 py-1 font-bold text-xs"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Admin
            </div>

            <div className="flex flex-row justify-center items-center pl-2">
              <Popover
                overlayClassName="shadow-2xl shadow-slate-700"
                content={
                  <div>
                    <div
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={logoutWeb}
                    >
                      Đăng xuất
                    </div>
                    <div className="hover:text-blue-600 cursor-pointer">
                      Sửa thông tin tài khoản
                    </div>
                    <div
                      onClick={() => navigate(ROUTES.LIST_ORDER_HISTORY)}
                      className="hover:text-blue-600 cursor-pointer"
                    >
                      Lịch sử mua hàng
                    </div>
                  </div>
                }
                trigger={["click"]}
              >
                <Avatar
                  className="bg-gray-500 cursor-pointer"
                  size={40}
                  icon={<UserOutlined />}
                ></Avatar>{" "}
              </Popover>
            </div>
          </>
        ) : (
          <div className="flex flex-row">
            <Avatar
              className="bg-gray-500 cursor-pointer"
              size={40}
              icon={<UserOutlined />}
            ></Avatar>
            <div className="flex flex-col justify-center items-start ml-2">
              <div>Xin chào !</div>
              <div
                className="font-bold cursor-pointer"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Đăng nhập
              </div>
            </div>
          </div>
        )}
        <ShoppingCart />
      </div>
      <Menu
        className="appMenu flex !border-e-0 -mx-5 bg-black text-white"
        onClick={onMenuClick}
        defaultSelectedKeys={[paramSearchSelect.categoryId]}
        selectedKeys={[paramSearchSelect.categoryId]}
        // items={[
        //   {
        //     label:
        //     key: "",
        //   },

        // ]}
      >
        <Menu.Item key={""}>
          <HomeFilled />
        </Menu.Item>

        {listCategory.map((item) => (
          <Menu.Item key={item.categoryId}>{item.categoryName}</Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default HeaderUser;
