import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Image, Input, Spin } from "antd";
import React, { useState } from "react";
import { register, resetPassword } from "../../../redux/actions/app";
import { connect } from "react-redux";
import { HTTP_STATUS } from "../../../common/constans/app";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routes";

function ResetPasswordForm(props) {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    const params = {
      username,
      full_name: fullName,
      address,
      phone_number: phoneNumber,
      email,
      password,
      password_confirmation: confirmPassword,
      birth,
      creditCardNumber,
    };
    props.register(params).then((response) => {
      if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        history(ROUTES.LOGIN);
      } else {
        setErrors(
          [...Object.values(response.data.errors), response.message] || []
        );
      }
    });
  };

  return (
    <Spin className="!h-screen !max-h-screen" spinning={props.loading}>
      <Form
        name="normal_login"
        className="w-1/4 m-auto flex flex-col justify-center h-screen "
        initialValues={{
          remember: true,
        }}
      >
        <div className="flex flex-row items-center justify-center mb-6">
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
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <div>Username :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your fullname!",
            },
          ]}
        >
          <div>fullname :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="fullname"
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your new Password!",
            },
          ]}
        >
          <div>address :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
          />
        </Form.Item>
        <Form.Item
          name="birth"
          rules={[
            {
              required: true,
              message: "Please input your birth!",
            },
          ]}
        >
          <div>Birth :</div>
          <DatePicker onChange={(__, dateString) => setBirth(dateString)} />
        </Form.Item>
        <Form.Item
          name="creditCard"
          rules={[
            {
              required: true,
              message: "Please input your birth!",
            },
          ]}
        >
          <div>Credit Card Number :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            placeholder="phoneNumber"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your new phoneNumber!",
            },
          ]}
        >
          <div>phoneNumber :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="phoneNumber"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your new email!",
            },
          ]}
        >
          <div>email :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your new email!",
            },
          ]}
        >
          <div>password :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item
          name="confirm password"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
          ]}
        >
          <div>confirm password :</div>
          <Input
            onFocus={() => setErrors([])}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm password"
          />
        </Form.Item>
        {errors?.map((item) => (
          <div className="text-red-700">{item}</div>
        ))}

        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            htmlType="submit"
            className="login-form-button !bg-blue-600"
          >
            register
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

/**
 * mapStateToProps
 * @returns
 */
const mapStateToProps = (state) => {
  return { loading: state.app.loading };
};

/**
 * mapDispatchToProps
 * @param {Object} dispatch
 * @returns {Object}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    register: (params) => dispatch(register(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
