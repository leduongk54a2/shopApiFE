import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, InputNumber, Popover, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartInfo, updateQuantityCartItem } from "../../redux/actions/cart";
import "./index.less";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

const Content = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const listCartItem = useSelector((state) => state.cart.listCartItem);
  const loading = useSelector((state) => state.cart.loading);

  const columns = [
    {
      title: "San pham",
      render: (record) => <a>{record.product.productName}</a>,
    },
    {
      title: "So luong",
      render: (record) => (
        <InputNumber
          min={0}
          max={record.product.quantity}
          defaultValue={record.quantity}
          onChange={(value) => {
            dispatch(
              updateQuantityCartItem({
                cartId: record.cartId,
                productId: record.productId,
                quantity: value,
              })
            );
            dispatch(getCartInfo());
          }}
          value={record.quantity}
        />
      ),
      shouldCellUpdate: () => {
        return true;
      },
    },
    {
      title: "Con lai",
      render: (record) => <div>{record.product.quantity}</div>,
    },
    {
      title: "Xóa",
      render: (record) => (
        <Button
          onClick={() => {
            dispatch(
              updateQuantityCartItem({
                cartId: record.cartId,
                productId: record.productId,
                quantity: 0,
              })
            );
            dispatch(getCartInfo());
          }}
          className="border-none bg-red-600 !text-white"
        >
          Xóa
        </Button>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getCartInfo());
  }, [dispatch]);
  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={listCartItem} pagination={false} />
      <div className="mt-5 w-full flex items-center justify-end">
        <Button
          className=" bg-blue-600 text-white"
          onClick={() => history(ROUTES.ORDER_DETAIL)}
        >
          Dat hang
        </Button>
      </div>
    </Spin>
  );
};
function ShoppingCart() {
  const dispatch = useDispatch();

  const listCartItem = useSelector((state) => state.cart.listCartItem);
  useEffect(() => {
    dispatch(getCartInfo());
  }, [dispatch]);
  return (
    <Popover content={<Content />} title="Gio Hang">
      <div className="relative">
        <ShoppingCartOutlined className="text-3xl text-white cursor-pointer ml-5" />
        <div className="absolute text-white bg-red-500 cart-icon">
          {listCartItem.length}
        </div>
      </div>
    </Popover>
  );
}

export default ShoppingCart;
