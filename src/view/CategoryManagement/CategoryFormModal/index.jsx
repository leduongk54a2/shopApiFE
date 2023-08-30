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
  addCategory,
  editInfoCategory,
  getAllCategory,
} from "../../../redux/actions/category";
import { HTTP_STATUS } from "../../../common/constans/app";
import TextArea from "antd/es/input/TextArea";
import { editEmployeeInfo } from "../../../redux/actions/employee";

function CategoryFormModal(props) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [visible, setVisible] = useState(false);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setCategoryName("");
    setTextDescription("");
    setErrors([]);
  }, [props.visible]);

  useEffect(() => {
    const data = { ...props.data };
    if (props.isEdit) {
      setCategoryName(data.categoryName);
      setTextDescription(data.textDescription);
      setVisible(data.visible);
      setErrors([]);
    } else {
      setCategoryName("");
      setTextDescription("");
      setErrors([]);
    }
  }, [props.data, props.isEdit, props.visible]);

  const handleAddCategory = () => {
    const params = {
      categoryName,
      textDescription,
    };
    dispatch(addCategory(params)).then((response) => {
      if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        props.onCancel();
        dispatch(getAllCategory());
      } else {
        setErrors(
          [...Object.values(response.data.errors), response.message] || []
        );
      }
    });
  };

  const handleEditEmployee = () => {
    const newData = {
      categoryName,
      textDescription,
      visible,
    };

    dispatch(editInfoCategory(props.data.categoryId, newData)).then(
      (response) => {
        if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
          props.onCancel();
          dispatch(getAllCategory());
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
      onOk={props.isEdit ? handleEditEmployee : handleAddCategory}
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
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input your category name!",
              },
            ]}
          >
            <div>Category Name :</div>
            <Input
              onFocus={() => setErrors([])}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="categoryName"
              value={categoryName}
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

export default CategoryFormModal;
