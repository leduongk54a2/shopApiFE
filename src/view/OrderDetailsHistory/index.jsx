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
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

function OrderDetailHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const loading = useSelector((state) => state.order.loading);
  const listOrder = useSelector((state) => state.order.listOrder);
  const [orderDetail, setOrderDetails] = useState({});

  useEffect(() => {
    dispatch(getCartInfo());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getListOrder()).then((res) => {
      if (res) {
        const paramSearch = new URLSearchParams(location.search);
        const id = paramSearch.get("id") || "";
        setOrderDetails(res.data.find((item) => item.orderId === +id));
      }
    });
  }, []);

  const columns = [
    {
      title: "San pham",
      render: (record) => <a>{record.productName}</a>,
    },

    {
      title: "Don gia",
      render: (record) => <a>{record.price}</a>,
    },
    {
      title: "So luong",
      render: (record) => <div>{record.quantity}</div>,
    },
    {
      title: "Giam gia",
      render: (record) => <div>{record.discount}%</div>,
    },
    {
      title: "Thanh tien",
      render: (record) => (
        <div>
          {record.price * record.quantity * (1 - record.discount / 100)}
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="h-screen">
        <Table
          className="p-5 "
          columns={columns}
          dataSource={orderDetail.listOrderDetail}
          pagination={false}
        />
        <Row>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            Thanh Tien :{" "}
            <Input className="w-60" disabled value={orderDetail.total}></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            Ngay Mua :{" "}
            <Input
              className="w-60"
              disabled
              value={moment(orderDetail.created_at).format("YYYY-MM-YY")}
            ></Input>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

export default OrderDetailHistory;
