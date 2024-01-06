import React, { useLayoutEffect } from "react";
import HeaderUser from "./Header";
import "./index.less";
import UserFooter from "./Footer";
import Products from "./Products";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/category";
import { getAllProduct } from "../../redux/actions/product";

function UserView() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchProduct = dispatch(getAllProduct());
    const fetchCategory = dispatch(getAllCategory());
    Promise.all([fetchProduct, fetchCategory]);
  }, []);
  return <Products />;
}

export default UserView;
