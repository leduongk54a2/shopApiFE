import React, { useEffect, useMemo, useRef, useState } from "react";
import ProductFormModal from "./component/ProductFormModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  getProductDetail,
  updateProductInfo,
} from "../../redux/actions/product";
import { HTTP_STATUS, ROLE } from "../../common/constans/app";
import { useNavigate } from "react-router-dom";
import { Button, Col, Empty, Input, Row, Select, Spin, Table } from "antd";
import { getAllCategory } from "../../redux/actions/category";
import { SORT_TYPE } from "../../common/constans/common";
import PreviewProductModal from "./component/PreviewProductModal";

import "./index.less";
import Checkbox from "antd/es/checkbox/Checkbox";
import { getAllSupplier } from "../../redux/actions/supplier";

const Check = (props) => {
  const dispatch = useDispatch();
  const setVisible = (id, visible) => {
    dispatch(updateProductInfo(id, { display: visible }));
    dispatch(getAllProduct());
  };
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(props.visible);
  }, [props.visible]);

  // Render the original component with the props passed down
  return (
    <Checkbox
      className="scale-125"
      type="checkbox"
      onChange={() => {
        setVisible(props.categoryId, !checked);
        setChecked(!checked);
      }}
      checked={checked}
    ></Checkbox>
  );
};

function ProductManagement() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const isAccessBuy = useMemo(() => {
    return [ROLE.CUSTOMER, ROLE.EMPLOYEE].includes(
      JSON.parse(localStorage.getItem("userInfo")).role
    );
  }, []);
  const isAccessEdit = useMemo(() => {
    return [ROLE.ADMIN, ROLE.EMPLOYEE].includes(
      JSON.parse(localStorage.getItem("userInfo")).role
    );
  }, []);
  const listProduct = useSelector((state) => state.product?.listProduct);
  const listCategory = useSelector((state) => state.category.listCategory);
  const listSupplier = useSelector((state) => state.supplier.listSupplier);

  const [productData, setProductData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [visible, setVisible] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [dataPreview, setDataPreview] = useState({});
  const keywordRef = useRef(null);
  const [actionSearch, setActionSearch] = useState({
    keyword: null,
    categoryId: null,
    supplierId: null,
    sortTypePrice: null,
  });
  const [selectedKeys, setSelectedKeys] = useState([]);

  const columns = useMemo(() => {
    // const openEditForm = (id) => {
    //   dispatch(getInfoCategory(id)).then((res) => {
    //     if (res.statusCode === HTTP_STATUS.CODE.SUCCESS) {
    //       setCategoryData(res.data);
    //       setVisibleModal(true);
    //       setIsEdit(true);
    //     }
    //   });
    // };
    return [
      {
        width: "3%",
        title: "ID",
        render: (record) => record.productId,
      },
      {
        width: "10%",
        title: "Tên Sản phẩm",
        render: (record) => record.productName,
      },
      {
        width: "5%",
        title: "Category",
        render: (record) => (
          <div className="line-clamp-3">
            {listCategory.find((item) => item.categoryId === record.categoryId)
              ?.categoryName || "---"}
          </div>
        ),
      },
      {
        width: "5%",
        title: "Hãng",
        render: (record) => (
          <div className="line-clamp-3">
            {listSupplier.find((item) => item.supplierId === record.supplierId)
              ?.supplierName || "---"}
          </div>
        ),
      },
      {
        width: "15%",
        title: "Mô tả",
        render: (record) => (
          <div className="line-clamp-3">{record.description}</div>
        ),
      },

      {
        width: "10%",
        title: "Ảnh",
        render: (record) => (
          <img
            src={record.imgUrl}
            alt={record.productName}
            className="h-20 w-20 bg-white object-contain object-center "
          />
        ),
      },
      {
        width: "10%",
        title: "Số lượng",
        render: (record) => record.quantity,
      },
      {
        width: "10%",
        title: "Sale",
        render: (record) => <div>{record.discount}%</div>,
      },
      {
        width: "10%",
        title: "Quảng Cáo",
        render: (record) => (
          <Check categoryId={record.productId} visible={record.display}></Check>
        ),
        shouldCellUpdate: () => {
          return true;
        },
      },
      {
        width: "5%",
        title: "Sửa",
        render: (record) => (
          <Button
            className="border-none bg-blue-600 !text-white"
            onClick={() => openEditForm(record.productId)}
          >
            Sửa
          </Button>
        ),
      },
      {
        width: "5%",
        title: "Xóa",
        render: (record) => (
          <Button
            // onClick={() => openConfirmDelete([record.categoryId])}
            className="border-none bg-red-600 !text-white"
          >
            Xóa
          </Button>
        ),
      },
    ];
  }, [dispatch, listCategory, listSupplier, listProduct]);

  useEffect(() => {
    const fetchProduct = dispatch(getAllProduct());
    const fetchCategory = dispatch(getAllCategory());
    const fetchSupplier = dispatch(getAllSupplier());

    Promise.all([fetchProduct, fetchCategory, fetchSupplier]);
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(getAllProduct({ ...actionSearch }));
  }, [actionSearch, dispatch]);

  const rowSelection = {
    selectedRowKeys: [...selectedKeys],
    onChange: (newSelectedKeys) => setSelectedKeys(newSelectedKeys),
  };

  const openEditForm = (id) => {
    dispatch(getProductDetail(id)).then((res) => {
      if (res.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        setProductData(res.data);
        setVisible(true);
        setIsEdit(true);
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <div className="bg-white h-screen overflow-auto flex justify-center ">
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
                    className="px-5 py-2 ml-5 rounded  text-white bg-blue-600 w-fit cursor-pointer"
                  >
                    Tìm
                  </div>
                </Col>
              </Row>
              <Row className="w-full mt-5">
                <Col xl={8} className="flex flex-row items-center">
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
                <Col xl={8} className="flex flex-row items-center">
                  <div className="mr-2">Nhà cung cấp: </div>
                  <Select
                    className="w-40"
                    onChange={(value) =>
                      setActionSearch((prevState) => ({
                        ...prevState,
                        supplierId: value,
                      }))
                    }
                    value={actionSearch.supplierId}
                  >
                    <Select.Option key={null} value={null}>
                      Tất Cả
                    </Select.Option>
                    {listSupplier?.map((category) => (
                      <Select.Option
                        key={category.supplierId}
                        value={category.supplierId}
                      >
                        {category.supplierName}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col xl={8} className="flex flex-row items-center">
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
          {isAccessEdit && (
            <div
              className="px-5 py-2  mt-5 rounded  text-white bg-blue-600 w-fit cursor-pointer"
              onClick={() => {
                setVisible(true);
                setIsEdit(false);
              }}
            >
              Add
            </div>
          )}
          {Boolean(!listProduct.length) && (
            <div className="w-full h-full ">
              <div className="w-full h-full ">
                <Empty />
              </div>
            </div>
          )}

          {/* {Boolean(listProduct.length) && (
            <div className="flex h-3/4 overflow-auto product-wrapper">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 h-fit">
                {listProduct?.map((product) => (
                  <div
                    key={product.productId}
                    className="group relative  pb-5 border-solid border-2 rounded-lg"
                  >
                    <div
                      onClick={() => {
                        setDataPreview(product);
                        setVisiblePreview(true);
                      }}
                      className=" hover:bg-white hover:opacity-30 cursor-pointer relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80  "
                    >
                      <img
                        src={product.imgUrl}
                        alt={product.productName}
                        className="h-full bg-white w-full object-contain object-center lg:h-full lg:w-full"
                      />

                      {isAccessBuy && (
                        <ShoppingCartOutlined
                          className={`${
                            product.quantity ? "bg-blue-600" : "bg-gray-600"
                          } text-white text-7xl  cursor-pointer shopping-icon`}
                        />
                      )}
                    </div>
                    <div className="mt-4 px-5 flex justify-between flex-col">
                      <div className=" h-3/6">
                        <h3 className="text-sm h-10 text-gray-700">
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
                      <p className="flex h-2/6 items-center text-sm font-medium text-gray-900">
                        Giá: ₫{product.price}
                        {isAccessEdit && (
                          <div
                            className="px-5 py-2 ml-auto rounded  text-white bg-blue-600 w-fit cursor-pointer"
                            onClick={() => setVisible(true)}
                          >
                            Sửa
                          </div>
                        )}
                      </p>
                      <div className="h-1/6">
                        <span>Hiển thị quảng cáo: </span>
                        <Checkbox
                          defaultChecked={product.display}
                          onChange={(e) =>
                            changeDisplayProduct(product.productId, e)
                          }
                        ></Checkbox>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
          <Table
            rowSelection={rowSelection}
            rootClassName="w-full  pb-20"
            columns={columns}
            dataSource={listProduct?.map((item) => {
              return { key: item.productId, ...item };
            })}
          />
        </div>
        <ProductFormModal
          listCategory={listCategory}
          listSupplier={listSupplier}
          visible={visible}
          onCancel={() => setVisible(false)}
          isEdit={isEdit}
          productInfo={productData}
        />
        <PreviewProductModal
          visible={visiblePreview}
          onCancel={() => setVisiblePreview(false)}
          dataPreview={dataPreview}
          isAccessBuy={isAccessBuy}
        />
      </div>
    </Spin>
  );
}

export default ProductManagement;
