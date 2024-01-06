import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
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
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  register,
  uploadImage,
  uploadImage23,
} from "../../../../redux/actions/app";
import { HTTP_STATUS } from "../../../../common/constans/app";
import { getAllCategory } from "../../../../redux/actions/category";
import {
  addProduct,
  getAllProduct,
  updateProductInfo,
} from "../../../../redux/actions/product";

function ProductFormModal(props) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState({
    productName: "",
    imgUrl: null,
    categoryId: null,
    supplierId: null,
    description: "",
    discount: 0,
    quantity: 1,
    price: "",
  });

  useEffect(() => {
    setErrors([]);
    if (props.visible && props.isEdit) {
      const {
        productName,
        imgUrl,
        categoryId,
        description,
        discount,
        supplierId,
        quantity,
        price,
      } = props.productInfo;
      setProductInfo({
        productName,
        imgUrl,
        categoryId,
        description,
        discount,
        quantity,
        supplierId,
        price,
      });
    } else {
      setProductInfo({
        productName: "",
        imgUrl: null,
        categoryId: null,
        supplierId: null,
        description: "",
        discount: 0,
        quantity: 1,
        price: "",
      });
    }
  }, [props.visible]);

  //   useEffect(() => {
  //     const data = { ...props.data };
  //     if (props.isEdit) {
  //       setErrors([]);
  //     } else {
  //       setErrors([]);
  //     }
  //   }, [props.data, props.isEdit, props.visible]);

  const handleAddProduct = () => {
    // const params = {};

    dispatch(addProduct(productInfo)).then((response) => {
      if (response.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        props.onCancel();
        dispatch(getAllProduct());
      } else {
        setErrors(
          [...Object.values(response.data.errors), response.message] || []
        );
      }
    });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadImage23(formData)).then((res) => {
      if (res.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        setProductInfo((prevState) => ({
          ...prevState,
          imgUrl: res.data.imageUrl,
        }));
      } else {
        setErrors([res.message] || []);
      }
    });
    return false;
  };

  const handleEditEmployee = () => {
    dispatch(updateProductInfo(props.productInfo.productId, productInfo)).then(
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
      onOk={props.isEdit ? handleEditEmployee : handleAddProduct}
      onCancel={props.onCancel}
      className="add-product-modal"
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
            name="productName"
            rules={[
              {
                required: true,
                message: "Please input your product name!",
              },
            ]}
          >
            <div>Tên sản phẩm :</div>
            <Input
              onFocus={() => setErrors([])}
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  productName: e.target.value,
                }))
              }
              placeholder="productName"
              value={productInfo.productName}
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <div>Mô tả :</div>
            <TextArea
              autoSize={{ minRows: 3 }}
              size="large"
              onFocus={() => setErrors([])}
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              placeholder="description"
              value={productInfo.description}
            />
          </Form.Item>

          <Form.Item name="textDescription">
            <div>Ảnh minh họa: </div>

            {!productInfo.imgUrl ? (
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
              >
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
              </Upload>
            ) : (
              <div className="relative image-wrapper cursor-pointer">
                <img
                  src={productInfo.imgUrl}
                  alt="avatar"
                  className="w-full h-full"
                />
                <div
                  className="absolute z-10 top-0 w-full h-full flex justify-center align-middle items-center flex-col text-white"
                  onClick={(event) => {
                    event.preventDefault();
                    setProductInfo((prevState) => ({
                      ...prevState,
                      imgUrl: "",
                    }));
                  }}
                >
                  <DeleteOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Xóa
                  </div>
                </div>
              </div>
            )}
          </Form.Item>

          <Form.Item name="textDescription">
            <div>Category: </div>

            <Select
              placeholder="Chọn Category"
              onChange={(value) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  categoryId: value,
                }))
              }
              value={productInfo.categoryId}
            >
              {props.listCategory?.map((category) => (
                <Select.Option
                  key={category.categoryId}
                  value={category.categoryId}
                >
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="textDescription">
            <div>Nhà cung cấp: </div>

            <Select
              placeholder="Chọn nhà cung cấp"
              onChange={(value) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  supplierId: value,
                }))
              }
              value={productInfo.supplierId}
            >
              {props.listSupplier?.map((category) => (
                <Select.Option
                  key={category.supplierId}
                  value={category.supplierId}
                >
                  {category.supplierName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="discount">
            <div>Giảm giá: </div>

            <InputNumber
              addonBefore="-"
              addonAfter="%"
              min={0}
              max={100}
              defaultValue={0}
              onChange={(value) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  discount: value,
                }))
              }
              value={productInfo.discount}
            />
          </Form.Item>
          <Form.Item name="quantity">
            <div>Số Lượng: </div>

            <InputNumber
              min={1}
              max={100000}
              defaultValue={1}
              onChange={(value) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  quantity: value,
                }))
              }
              value={productInfo.quantity}
            />
          </Form.Item>
          <Form.Item name="price">
            <div>Giá: </div>

            <InputNumber
              onChange={(value) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  price: value,
                }))
              }
              value={productInfo.price}
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

export default ProductFormModal;
