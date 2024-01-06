import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Spin } from "antd";
import React, { useState } from "react";
import { resetPassword } from "../../../redux/actions/app";
import { connect } from "react-redux";
import { HTTP_STATUS } from "../../../common/constans/app";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routes";

function ResetPasswordForm(props) {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = () => {
    props
      .resetPassword({ username, oldPassword, newPassword })
      .then((response) => {
        if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
          history(ROUTES.LOGIN);
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
          <Input
            onFocus={() => setError("")}
            onChange={(e) => setUsername(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Please input your old Password!",
            },
          ]}
        >
          <Input
            onFocus={() => setError("")}
            onChange={(e) => setOldPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="old password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your new Password!",
            },
          ]}
        >
          <Input
            onFocus={() => setError("")}
            onChange={(e) => setNewPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="new password"
          />
        </Form.Item>
        <div className="text-red-700">{error}</div>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            htmlType="submit"
            className="login-form-button !bg-blue-600"
          >
            Reset
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
    resetPassword: (params) => dispatch(resetPassword(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
