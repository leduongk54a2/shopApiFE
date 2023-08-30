import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Upload,
  message,
} from "antd";

import { useNavigate } from "react-router-dom";
import "./index.less";
import { useDispatch } from "react-redux";
import moment from "moment-timezone";
import dayjs from "dayjs";

import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

function ProductFormModal(props) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    setErrors([]);
  }, [props.visible]);

  useEffect(() => {
    const data = { ...props.data };
    if (props.isEdit) {
      setErrors([]);
    } else {
      setErrors([]);
    }
  }, [props.data, props.isEdit, props.visible]);

  const handleAddCategory = () => {
    const params = {};
    // dispatch(addCategory(params)).then((response) => {
    //   if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
    //     props.onCancel();
    //     dispatch(getAllCategory());
    //   } else {
    //     setErrors(
    //       [...Object.values(response.data.errors), response.message] || []
    //     );
    //   }
    // });
  };

  const handleEditEmployee = () => {
    const newData = {};

    // dispatch(editInfoCategory(props.data.categoryId, newData)).then(
    //   (response) => {
    //     if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
    //       props.onCancel();
    //       dispatch(getAllCategory());
    //     } else {
    //       setErrors(
    //         [...Object.values(response.data.errors), response.message] || []
    //       );
    //     }
    //   }
    // );
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    return isJpgOrPng;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
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
      <Spin spinning={false}>
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
              //   onChange={(e) => setCategoryName(e.target.value)}
              placeholder="categoryName"
              //   value={}
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
              //   onChange={(e) => setTextDescription(e.target.value)}
              placeholder="fullname"
              //   value={textDescription}
            />
          </Form.Item>

          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>

          {props.isEdit && (
            <Form.Item name="visible">
              <div className="flex">
                <div className="mr-5">Ẩn :</div>
                <Checkbox
                //   onChange={(event) => setVisible(!event.target.checked)}
                //   defaultChecked={!visible}
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

export default ProductFormModal;
