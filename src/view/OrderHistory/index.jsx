import {
  Button,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Row,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  getCartInfo,
  updateCart,
  updateQuantityCartItem,
} from "../../redux/actions/cart";
import moment from "moment-timezone";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerInfo } from "../../redux/actions/customer";
import { getListOrder, saveOrder } from "../../redux/actions/order";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

function OrderDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.order.loading);
  const listOrder = useSelector((state) => state.order.listOrder);

  useEffect(() => {
    dispatch(getCartInfo());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getListOrder());
  }, []);

  const columns = [
    {
      title: "ID",
      render: (record) => <a>{record.orderId}</a>,
    },

    {
      title: "Giao ngay",
      render: (record) => <a>{record.shippedDate}</a>,
    },
    {
      title: "Tong tien",
      render: (record) => <div>{record.total}</div>,
    },
    {
      title: "Nguoi nhan",
      render: (record) => <div>{record.customerInfo}</div>,
    },
    {
      title: "Dia chi",
      render: (record) => <div>{record.address}</div>,
    },
    {
      title: "",
      render: (record) => (
        <Button
          onClick={() => {
            navigate(`${ROUTES.ORDER_DETAIL_HISTORY}?id=${record.orderId}`);
            dispatch(getCartInfo());
          }}
          className="border-none bg-blue-600 !text-white"
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="h-screen">
        <Table
          className="p-5 "
          columns={columns}
          dataSource={listOrder}
          pagination={false}
        />
      </div>
    </Spin>
  );
}

export default OrderDetail;
