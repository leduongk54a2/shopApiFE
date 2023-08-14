import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { HTTP_STATUS } from "../../../../common/constans/app";
import ROUTES from "../../../../routes/routes";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { useDispatch } from "react-redux";
import {
  addEmployee,
  getAllEmployee,
} from "../../../../redux/actions/employee";

function AddEmployeeModal(props) {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [salary, setSalary] = useState(null);
  const [gender, setGender] = useState(true);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => setErrors([]), [props.visible]);

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
      gender,
      salary,
    };
    dispatch(addEmployee(params)).then((response) => {
      if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        props.onCancel();
        dispatch(getAllEmployee());
      } else {
        setErrors(
          [...Object.values(response.data.errors), response.message] || []
        );
      }
    });
  };

  return (
    <Modal
      title="Thêm thông tin nhân viên"
      centered
      open={props.visible}
      onOk={handleSubmit}
      onCancel={props.onCancel}
      className="add-employee-modal"
    >
      <Spin spinning={props.loading}>
        <Form
          name="normal_login"
          className="m-auto flex flex-col justify-center "
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
            name="Salary"
            rules={[
              {
                required: true,
                message: "Please input your birth!",
              },
            ]}
          >
            <div>Salary :</div>
            <Input
              onFocus={() => setErrors([])}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Salary"
            />
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
            <div>Gender :</div>
            <Select defaultValue={true} onChange={(value) => setGender(value)}>
              <Select.Option value={true}>Nam</Select.Option>
              <Select.Option value={false}>Nữ</Select.Option>
            </Select>
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
        </Form>
      </Spin>
    </Modal>
  );
}

export default AddEmployeeModal;
