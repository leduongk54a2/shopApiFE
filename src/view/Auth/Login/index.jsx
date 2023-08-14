import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { login } from "../../../redux/actions/app";
import { connect } from "react-redux";
import { HTTP_STATUS } from "../../../common/constans/app";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routes";

function LoginForm(props) {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    props.login({ username, password }).then((response) => {
      if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));

        history(ROUTES.HOME);
      } else {
        setError(response.message || "");
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
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            onFocus={() => setError("")}
            onChange={(e) => setUsername(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            onFocus={() => setError("")}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <div className="text-red-700">{error}</div>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <div
            className="login-form-forgot cursor-pointer hover:text-blue-400"
            onClick={() => history(ROUTES.RESET_PASSWORD)}
          >
            Forgot password
          </div>
        </Form.Item>

        <Form.Item className="flex w-full">
          <Button
            type="primary"
            onClick={handleSubmit}
            htmlType="submit"
            className="login-form-button !bg-blue-600"
          >
            Log in
          </Button>
          Or{" "}
          <span
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => history(ROUTES.REGISTER)}
          >
            register now!
          </span>
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
    login: (params) => dispatch(login(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
