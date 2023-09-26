import { Button, Input, InputNumber, Spin, Table } from "antd";
import React, { useEffect } from "react";
import { getCartInfo, updateQuantityCartItem } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";

function OrderDetail() {
  const dispatch = useDispatch();
  const listCartItem = useSelector((state) => state.cart.listCartItem);
  const total = useSelector((state) => state.cart.total);

  const loading = useSelector((state) => state.cart.loading);

  const columns = [
    {
      title: "San pham",
      render: (record) => <a>{record.product.productName}</a>,
    },

    {
      title: "Don Gia",
      render: (record) => <a>{record.product.price}</a>,
    },
    {
      title: "Con lai",
      render: (record) => <div>{record.product.quantity}</div>,
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
      title: "Giam Gia",
      render: (record) => <div>{record.product.discount}%</div>,
    },
    {
      title: "Thanh tien",
      render: (record) => (
        <div>
          {record.product.price *
            (1 - record.product.discount / 100) *
            record.quantity}
        </div>
      ),
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
      <Table
        className="p-5"
        columns={columns}
        dataSource={listCartItem}
        pagination={false}
      />
      <div className="ml-5">
        Thanh Tien : <Input className="w-60" disabled value={total}></Input>
      </div>
    </Spin>
  );
}

export default OrderDetail;
