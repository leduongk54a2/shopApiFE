import React, { useEffect, useRef, useState } from "react";
import ProductFormModal from "./component/ProductFormModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/actions/product";
import { HTTP_STATUS } from "../../common/constans/app";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";
import { Col, Empty, Input, Row, Select, Spin } from "antd";
import { getAllCategory } from "../../redux/actions/category";
import { SORT_TYPE } from "../../common/constans/common";
import PreviewProductModal from "./component/PreviewProductModal";
import { ShoppingCartOutlined } from "@ant-design/icons";

import "./index.less";

function ProductManagement() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const listProduct = useSelector((state) => state.product?.listProduct);
  const listCategory = useSelector((state) => state.category.listCategory);
  const [visible, setVisible] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [dataPreview, setDataPreview] = useState({});
  const keywordRef = useRef(null);
  const [actionSearch, setActionSearch] = useState({
    keyword: null,
    categoryId: null,
    sortTypePrice: null,
  });

  useEffect(() => {
    const fetchProduct = dispatch(getAllProduct());
    const fetchCategory = dispatch(getAllCategory());
    Promise.all([fetchProduct, fetchCategory]);
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(getAllProduct({ ...actionSearch }));
  }, [actionSearch, dispatch]);

  return (
    <Spin spinning={loading}>
      <div className="bg-white h-screen flex justify-center">
        <div className="mx-5 w-full h-full  ">
          <div className="flex mt-5 my-auto">
            <Col className="w-full">
              <Row className="w-full">
                <Col xl={22} className="w-fit">
                  <Input
                    onPressEnter={() => {
                      setActionSearch((prevState) => ({
                        ...prevState,
                        keyword: keywordRef.current.input.value,
                      }));
                    }}
                    ref={keywordRef}
                  ></Input>
                </Col>
                <Col xl={2} className="flex justify-end">
                  <div
                    onClick={() => {
                      setActionSearch((prevState) => ({
                        ...prevState,
                        keyword: keywordRef.current.input.value,
                      }));
                    }}
                    onEn
                    className="px-5 py-2 ml-5 rounded  text-white bg-blue-600 w-fit cursor-pointer"
                  >
                    Tìm
                  </div>
                </Col>
              </Row>
              <Row className="w-full mt-5">
                <Col xl={12} className="flex flex-row items-center">
                  <div className="mr-2">Loại sản phẩm: </div>
                  <Select
                    className="w-40"
                    onChange={(value) =>
                      setActionSearch((prevState) => ({
                        ...prevState,
                        categoryId: value,
                      }))
                    }
                    value={actionSearch.categoryId}
                  >
                    <Select.Option key={null} value={null}>
                      Tất Cả
                    </Select.Option>
                    {listCategory?.map((category) => (
                      <Select.Option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col xl={12} className="flex flex-row items-center">
                  <div className="mr-2">Sắp xếp: </div>
                  <Select
                    className="w-40"
                    onChange={(value) =>
                      setActionSearch((prevState) => ({
                        ...prevState,
                        sortTypePrice: value,
                      }))
                    }
                    value={actionSearch.sortTypePrice}
                  >
                    <Select.Option key={null} value={null}>
                      ----
                    </Select.Option>

                    <Select.Option key={SORT_TYPE.ASC} value={SORT_TYPE.ASC}>
                      Giá tăng dần
                    </Select.Option>
                    <Select.Option key={SORT_TYPE.DESC} value={SORT_TYPE.DESC}>
                      Giá giảm dần
                    </Select.Option>
                  </Select>
                </Col>
              </Row>
            </Col>
          </div>
          <div
            className="px-5 py-2  mt-5 rounded  text-white bg-blue-600 w-fit cursor-pointer"
            onClick={() => setVisible(true)}
          >
            Add
          </div>
          {Boolean(!listProduct.length) && (
            <div className="w-full h-full ">
              <div className="w-full h-full ">
                <Empty />
              </div>
            </div>
          )}

          {Boolean(listProduct.length) && (
            <div className="flex h-3/4 overflow-auto product-wrapper">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 min-h-full h-fit">
                {listProduct?.map((product) => (
                  <div
                    key={product.productId}
                    className="group relative  pb-5 border-solid border-2 rounded-lg"
                  >
                    <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80 ">
                      <img
                        src={product.imgUrl}
                        alt={product.productName}
                        className="h-full bg-white w-full object-contain object-center lg:h-full lg:w-full"
                      />
                      <ShoppingCartOutlined
                        onClick={() => {
                          if (product.quantity) {
                            setDataPreview(product);
                            setVisiblePreview(true);
                          }
                        }}
                        className={`${
                          product.quantity
                            ? "bg-blue-600 cursor-pointer"
                            : "bg-gray-600 !cursor-not-allowed"
                        } text-white text-7xl  shopping-icon`}
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="pl-5">
                        <h3 className="text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.productName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Còn Lại:{" "}
                          <span
                            className={`${
                              product.quantity === 0 ? "text-red-600" : ""
                            }`}
                          >
                            {product.quantity}
                          </span>
                        </p>
                      </div>
                      <p className="pr-5 text-sm font-medium text-gray-900">
                        Giá: ₫{product.price}
                        <div
                          className="px-5 py-2 ml-auto rounded  text-white bg-blue-600 w-fit cursor-pointer"
                          onClick={() => setVisible(true)}
                        >
                          Sửa
                        </div>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <ProductFormModal
          listCategory={listCategory}
          visible={visible}
          onCancel={() => setVisible(false)}
        />
        <PreviewProductModal
          visible={visiblePreview}
          onCancel={() => setVisiblePreview(false)}
          dataPreview={dataPreview}
        />
      </div>
    </Spin>
  );
}

export default ProductManagement;
