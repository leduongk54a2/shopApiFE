import { Col, Row } from "antd";
import React from "react";
import {
  MailFilled,
  PhoneFilled,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.less";

export default function Header() {
  return (
    <Row className="header-wrapper center">
      <Col xl={12} xs={24} className="info-wrapper center font-white">
        <Row className="item center">
          <PhoneFilled />{" "}
          <a href="tel:0466742332" className="text-content font-white">
            {" "}
            (04) 6674 2332
          </a>
        </Row>
        <Row className="item center">
          <MailFilled />{" "}
          <a href="mailto:support@mail.com" className="text-content font-white">
            {" "}
            support@mail.com
          </a>
        </Row>
      </Col>
      <Col xl={12} xs={24} className="btn-wrapper center font-white">
        <Row className="item center">
          <UserOutlined /> <div className="text-content"> Đăng nhập</div>
        </Row>
        <Row className="item center">
          <UserAddOutlined /> <div className="text-content"> Đăng ký</div>
        </Row>
      </Col>
    </Row>
  );
}
