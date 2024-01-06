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
import { saveOrder } from "../../redux/actions/order";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

function OrderDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listCartItem = useSelector((state) => state.cart.listCartItem);
  const total = useSelector((state) => state.cart.total);
  const userInfo = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);
  const loading = useSelector((state) => state.cart.loading);
  const [birth, setBirth] = useState("");
  const [creditNumber, setCreditNumber] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getCustomerInfo(userInfo.userID)).then((res) => {
      setCreditNumber(res.data.credit_card_number);
    });
  }, []);

  const buyOrder = () => {
    const params = {
      userId: userInfo.userID,
      shippedDate: birth,
      total: total,
      customerInfo: `${userInfo.full_name}-${userInfo.email}-${userInfo.phone_number}`,
      comment: comment,
      address: userInfo.address,
      cartItems: listCartItem,
    };
    dispatch(saveOrder(params)).then((res) => {
      if (res) {
        success();
        setTimeout(() => Modal.destroyAll(), 1000);
        setTimeout(() => navigate(ROUTES.HOME_USER), 2000);
      }
    });
  };

  const success = () => {
    Modal.success({
      content: "Mua hang thanh cong",
      footer: null,
    });
  };

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
              updateCart({
                listCartItem: [
                  {
                    productId: record.productId,
                    quantity: value,
                  },
                ],
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
      <div className="h-screen">
        <Table
          className="p-5 "
          columns={columns}
          dataSource={listCartItem}
          pagination={false}
        />
        <Row>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            Thanh Tien : <Input className="w-60" disabled value={total}></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            Ho va Ten:{" "}
            <Input className="w-60" disabled value={userInfo.full_name}></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            email:{" "}
            <Input className="w-60" disabled value={userInfo.email}></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            So dien thoai:{" "}
            <Input
              className="w-60"
              disabled
              value={userInfo.phone_number}
            ></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            dia chi:{" "}
            <Input className="w-60" disabled value={userInfo.address}></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            so the:{" "}
            <Input className="w-60" disabled value={creditNumber}></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            ghi chu:{" "}
            <Input
              className="w-60"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Input>
          </Col>
          <Col
            lg={12}
            xs={24}
            className="ml-5 mt-6 flex justify-between items-center"
          >
            Ngay giao:{" "}
            <DatePicker
              className="w-60"
              format="YYYY-MM-DD"
              onChange={(__, dateString) => {
                setBirth(dateString);
              }}
              value={birth.length ? dayjs(birth, "YYYY-MM-DD") : null}
            />
          </Col>
        </Row>
        <Row className="flex justify-center items-center">
          <Button className="mt-10 " onClick={buyOrder}>
            Xác nhận thanh toán
          </Button>
        </Row>
      </div>
    </Spin>
  );
}

export default OrderDetail;
