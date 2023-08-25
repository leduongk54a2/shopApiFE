import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { HTTP_STATUS } from "../../../../common/constans/app";
import ROUTES from "../../../../routes/routes";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { useDispatch } from "react-redux";
import {
  addEmployee,
  editEmployeeInfo,
  getAllEmployee,
} from "../../../../redux/actions/employee";
import moment from "moment-timezone";
import dayjs from "dayjs";

function EmployeeFormModal(props) {
  const history = useNavigate();
  const dispatch = useDispatch();
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
  useEffect(() => {
    const data = { ...props.data, ...props.data.user };
    if (props.isEdit) {
      setUsername((prevState) => data.username);
      setFullname(data.full_name);
      setAddress(data.address);
      setPhoneNumber(data.phone_number);
      setEmail(data.email);
      setBirth(data.birth);
      setSalary(data.salary);
      setGender(Boolean(data.gender));
    } else {
      setUsername("");
      setFullname("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");
      setBirth("");
      setSalary(null);
      setGender(true);
      setPassword("");
      setConfirmPassword("");
    }
  }, [props.data, props.isEdit, props.visible]);

  useEffect(() => setErrors([]), [props.visible]);

  const handleAddEmployee = () => {
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
          Object.values(response.errors).reduce((errorList, item) => {
            errorList = [...errorList, ...item];
            return errorList;
          }, []) || []
        );
      }
    });
  };

  const handleEditEmployee = () => {
    const newData = {
      full_name: fullName,
      address: address,
      birth: moment(birth).format("YYYY-MM-DD"),
      salary: salary,
      gender: gender,
      phone_number: phoneNumber,
      email: email,
    };

    dispatch(editEmployeeInfo(newData, props.data.employee_id)).then(
      (response) => {
        if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
          props.onCancel();
          dispatch(getAllEmployee());
        } else {
          setErrors(
            [...Object.values(response.data.errors), response.message] || []
          );
        }
      }
    );
  };

  return (
    <Modal
      title={`${props.isEdit ? "Sửa" : "Thêm"} thông tin nhân viên`}
      centered
      open={props.visible}
      onOk={props.isEdit ? handleEditEmployee : handleAddEmployee}
      onCancel={props.onCancel}
      className="add-employee-modal"
      destroyOnClose
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
              disabled={props.isEdit}
              onFocus={() => setErrors([])}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              value={username}
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
              value={fullName}
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
              value={address}
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
            <DatePicker
              format="YYYY-MM-DD"
              onChange={(__, dateString) => {
                setBirth(dateString);
              }}
              value={birth.length ? dayjs(birth, "YYYY-MM-DD") : null}
            />
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
              value={salary}
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
            <Select
              defaultValue={true}
              value={gender}
              onChange={(value) => setGender(value)}
            >
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
              value={phoneNumber}
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
              value={email}
            />
          </Form.Item>
          {!props.isEdit && (
            <>
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
                  value={password}
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
            </>
          )}

          {errors?.map((item) => (
            <div className="text-red-700">{item}</div>
          ))}
        </Form>
      </Spin>
    </Modal>
  );
}

export default EmployeeFormModal;
