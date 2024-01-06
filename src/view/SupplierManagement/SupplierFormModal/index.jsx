import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
} from "antd";
import React, { useEffect, useReducer, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./index.less";
import { useDispatch } from "react-redux";
import moment from "moment-timezone";
import dayjs from "dayjs";
import {
  addSupplier,
  editInfoSupplier,
  getAllSupplier,
} from "../../../redux/actions/supplier";
import { HTTP_STATUS } from "../../../common/constans/app";
import TextArea from "antd/es/input/TextArea";
import { editEmployeeInfo } from "../../../redux/actions/employee";

function SupplierFormModal(props) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [supplierName, setSupplierName] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [visible, setVisible] = useState(false);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setSupplierName("");
    setTextDescription("");
    setErrors([]);
  }, [props.visible]);

  useEffect(() => {
    const data = { ...props.data };
    if (props.isEdit) {
      setSupplierName(data.supplierName);
      setTextDescription(data.textDescription);
      setVisible(data.visible);
      setErrors([]);
    } else {
      setSupplierName("");
      setTextDescription("");
      setErrors([]);
    }
  }, [props.data, props.isEdit, props.visible]);

  const handleAddSupplier = () => {
    const params = {
      supplierName,
      textDescription,
    };
    dispatch(addSupplier(params)).then((response) => {
      if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        props.onCancel();
        dispatch(getAllSupplier());
      } else {
        setErrors(
          [...Object.values(response.data.errors), response.message] || []
        );
      }
    });
  };

  const handleEditEmployee = () => {
    const newData = {
      supplierName,
      textDescription,
      visible,
    };

    dispatch(editInfoSupplier(props.data.supplierId, newData)).then(
      (response) => {
        if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
          props.onCancel();
          dispatch(getAllSupplier());
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
      title={`${props.isEdit ? "Sửa" : "Thêm"} thông tin sản phẩm`}
      centered
      open={props.visible}
      onOk={props.isEdit ? handleEditEmployee : handleAddSupplier}
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
            name="supplierName"
            rules={[
              {
                required: true,
                message: "Please input your supplier name!",
              },
            ]}
          >
            <div>Supplier Name :</div>
            <Input
              onFocus={() => setErrors([])}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="supplierName"
              value={supplierName}
            />
          </Form.Item>
          <Form.Item
            name="textDescription"
            rules={[
              {
                required: true,
                message: "Please input your text description!",
              },
            ]}
          >
            <div>Text Description :</div>
            <TextArea
              autoSize={{ minRows: 3 }}
              size="large"
              onFocus={() => setErrors([])}
              onChange={(e) => setTextDescription(e.target.value)}
              placeholder="fullname"
              value={textDescription}
            />
          </Form.Item>

          {props.isEdit && (
            <Form.Item name="visible">
              <div className="flex">
                <div className="mr-5">Ẩn :</div>
                <Checkbox
                  onChange={(event) => setVisible(!event.target.checked)}
                  defaultChecked={!visible}
                ></Checkbox>
              </div>
            </Form.Item>
          )}
          {errors?.map((item) => (
            <div className="text-red-700">{item}</div>
          ))}
        </Form>
      </Spin>
    </Modal>
  );
}

export default SupplierFormModal;
