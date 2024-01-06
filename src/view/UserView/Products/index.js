import {
  Badge,
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
  Typography,
  Select,
  Col,
  Row,
  Carousel,
  Modal,
} from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllProduct,
  getProductsDisplay,
} from "../../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import "./index.less";
import ROUTES from "../../../routes/routes";
import { updateCart } from "../../../redux/actions/cart";
import { formatNumberWithPeriods } from "../../../common/function";
import { getPredict, updateRating } from "../../../redux/actions/rating";

function Products() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const listCategory =
    useSelector((state) => state.category.listCategory) || [];

  const listSupplier =
    useSelector((state) => state.supplier.listSupplier) || [];
  const listProduct = useSelector((state) => state.product?.listProduct);
  const listProductDisplay =
    useSelector((state) => state.product?.productDisplay) || [];

  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("az");
  const [actionSearch, setActionSearch] = useState({
    keyword: null,
    categoryId: null,
    supplierId: null,
    sortTypePrice: null,
  });

  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [itemForRating, setItemForRating] = useState(null);
  const [listPredict, setListPredict] = useState([]);

  const userInfo = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);
  useEffect(() => {
    dispatch(getProductsDisplay());
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispatch(getPredict(userInfo.userID)).then((res) => {
        if (res) {
          setListPredict(
            listProduct.filter((item) => res.data.includes(item.productId))
          );
        }
      });
    }
  }, [userInfo, listProduct]);

  const paramSearchSelect = useMemo(() => {
    const paramSearch = new URLSearchParams(location.search);
    const categoryId = paramSearch.get("categoryId") || null;
    const keyword = paramSearch.get("keyword") || "";

    return { categoryId, keyword };
  }, [location.search]);

  useEffect(() => {
    setActionSearch({
      keyword: paramSearchSelect.keyword,
      categoryId: paramSearchSelect.categoryId,
      sortTypePrice: null,
    });
  }, [paramSearchSelect]);
  useEffect(() => {
    setLoading(true);

    dispatch(getAllProduct({ ...actionSearch })).then(() => {
      setLoading(false);
    });
  }, [actionSearch]);

  const slider = useRef();

  const getSortedItems = () => {
    const sortedItems = [...listProduct];
    sortedItems.sort((a, b) => {
      const aLowerCaseTitle = a.productName.toLowerCase();
      const bLowerCaseTitle = b.productName.toLowerCase();

      if (sortOrder === "az") {
        return aLowerCaseTitle > bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (sortOrder === "za") {
        return aLowerCaseTitle < bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (sortOrder === "lowHigh") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "highLow") {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      }
    });
    return sortedItems;
  };

  const success = () => {
    Modal.success({
      content: "Bạn đã đánh giá thành công!!!",
      footer: null,
    });
  };

  console.log(listProductDisplay);

  return (
    <Col className="productsContainer" lg={24} xs={24}>
      {paramSearchSelect.categoryId === null &&
        paramSearchSelect.keyword === "" && (
          <>
            <div className="w-full sm:w-3/4 mx-auto relative py-16">
              <div
                className="btn-presentation z-10 -left-5 sm:-left-16 absolute"
                onClick={() => slider.current.prev()}
              >
                <span className="btn-content">‹</span>
              </div>
              <div
                className="btn-presentation z-10 -right-5 sm:-right-16 absolute "
                onClick={() => slider.current.next()}
              >
                <span className="btn-content">›</span>
              </div>

              <Carousel
                rootClassName="w-full h-96 mx-auto rounded-2xl border-black  border-solid  border-2 overflow-hidden"
                ref={slider}
                autoplay
                autoplaySpeed={1500}
              >
                {listProductDisplay?.map((item, index) => (
                  <Row className="w-full h-96 rounded-2xl !flex flex-row">
                    <Col
                      className="items-center justify-center p-10  font-extrabold"
                      lg={12}
                      xs={0}
                    >
                      {item.description}
                    </Col>
                    <Col key={index} lg={12} xs={24}>
                      <h3
                        style={{ backgroundImage: `url(${item.imgUrl})` }}
                        className="w-full h-96  bg-no-repeat bg-center"
                      ></h3>
                    </Col>
                  </Row>
                ))}
              </Carousel>
            </div>
            <div>
              {userInfo && (
                <div className="mb-14">
                  <Row>Gợi ý cho bạn: </Row>
                  <Row>
                    <List
                      className="w-full h-full"
                      loading={loading}
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                      }}
                      renderItem={(product, index) => {
                        return (
                          <Badge.Ribbon
                            className={`itemCardBadge !bg-red-500  ${
                              product.discount === 0 ? "hidden" : ""
                            }`}
                            text={`${product.discount}% Off`}
                            color="pink"
                          >
                            <Card
                              className="itemCard "
                              key={index}
                              cover={
                                <Image
                                  onClick={() =>
                                    navigate(
                                      `${ROUTES.PRODUCT_DETAIL}?productId=${product.productId}`
                                    )
                                  }
                                  className="itemCardImage hover:cursor-pointer"
                                  preview={false}
                                  src={product.imgUrl}
                                />
                              }
                              actions={[
                                <div
                                  onClick={() => {
                                    setOpenRatingModal(true);
                                    setItemForRating(product);
                                  }}
                                >
                                  <Rate
                                    disabled
                                    allowHalf
                                    value={product.rating}
                                  />
                                </div>,
                                <AddToCartButton item={product} />,
                              ]}
                            >
                              <Card.Meta
                                title={
                                  <>
                                    <Typography.Paragraph
                                      onClick={() =>
                                        navigate(
                                          `${ROUTES.PRODUCT_DETAIL}?productId=${product.productId}`
                                        )
                                      }
                                      className="hover:cursor-pointer hover:text-blue-500"
                                    >
                                      {product.productName}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                      {`Hãng sản xuất :${
                                        listSupplier.find(
                                          (item) =>
                                            item.supplierId ===
                                            product.supplierId
                                        )?.supplierName || "---"
                                      }`}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                      Giá:
                                      {formatNumberWithPeriods(
                                        parseFloat(
                                          product.price -
                                            (product.price * product.discount) /
                                              100
                                        ).toFixed(2)
                                      )}
                                      {"₫ "}
                                      {product.discount > 0 && (
                                        <Typography.Text delete type="danger">
                                          {formatNumberWithPeriods(
                                            product.price
                                          )}
                                          ₫
                                        </Typography.Text>
                                      )}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                      {` Số lượng còn :${product.quantity}`}
                                    </Typography.Paragraph>
                                  </>
                                }
                                description={
                                  <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                    {product.description}
                                  </Typography.Paragraph>
                                }
                              ></Card.Meta>
                            </Card>
                          </Badge.Ribbon>
                        );
                      }}
                      dataSource={listPredict}
                    ></List>
                  </Row>
                </div>
              )}
            </div>
          </>
        )}
      <Row className="flex items-center" gutter={[10, 10]}>
        {paramSearchSelect.categoryId === null && (
          <Col lg={8} xs={24}>
            <Typography.Text className="whitespace-break-spaces">
              Loại sản phẩm:{" "}
            </Typography.Text>
            <Select
              className="w-52"
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
        )}
        <Col lg={8} xs={24}>
          <Typography.Text className="whitespace-break-spaces">
            Nhà cung cấp:{" "}
          </Typography.Text>
          <Select
            className="w-52"
            onChange={(value) =>
              setActionSearch((prevState) => ({
                ...prevState,
                supplierId: value,
              }))
            }
            value={actionSearch.supplierId || null}
          >
            <Select.Option key={null} value={null}>
              Tất Cả
            </Select.Option>
            {listSupplier?.map((supplier) => (
              <Select.Option
                key={supplier.supplierId}
                value={supplier.supplierId}
              >
                {supplier.supplierName}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col lg={8} xs={24}>
          <Typography.Text className="whitespace-break-spaces">
            Sắp xếp sản phẩm theo:{"    "}
          </Typography.Text>
          <Select
            className="w-52"
            onChange={(value) => {
              setSortOrder(value);
            }}
            defaultValue={"az"}
            options={[
              {
                label: "Tên từ a-z",
                value: "az",
              },
              {
                label: "Tên từ z-a",
                value: "za",
              },
              {
                label: "Giá từ thấp đến cao",
                value: "lowHigh",
              },
              {
                label: "Giá từ cao đến thấp",
                value: "highLow",
              },
            ]}
          ></Select>
        </Col>
      </Row>
      <Row className="w-full h-full">
        <List
          className="w-full h-full"
          loading={loading}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          renderItem={(product, index) => {
            return (
              <Badge.Ribbon
                className={`itemCardBadge !bg-red-500  ${
                  product.discount === 0 ? "hidden" : ""
                }`}
                text={`${product.discount}% Off`}
                color="pink"
              >
                <Card
                  className="itemCard "
                  key={index}
                  cover={
                    <Image
                      onClick={() =>
                        navigate(
                          `${ROUTES.PRODUCT_DETAIL}?productId=${product.productId}`
                        )
                      }
                      className="itemCardImage hover:cursor-pointer"
                      preview={false}
                      src={product.imgUrl}
                    />
                  }
                  actions={[
                    <div
                      onClick={() => {
                        setOpenRatingModal(true);
                        setItemForRating(product);
                      }}
                    >
                      <Rate disabled allowHalf value={product.rating} />
                    </div>,
                    <AddToCartButton item={product} />,
                  ]}
                >
                  <Card.Meta
                    title={
                      <>
                        <Typography.Paragraph
                          onClick={() =>
                            navigate(
                              `${ROUTES.PRODUCT_DETAIL}?productId=${product.productId}`
                            )
                          }
                          className="hover:cursor-pointer hover:text-blue-500"
                        >
                          {product.productName}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          {`Hãng sản xuất :${
                            listSupplier.find(
                              (item) => item.supplierId === product.supplierId
                            )?.supplierName || "---"
                          }`}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          Giá:
                          {formatNumberWithPeriods(
                            parseFloat(
                              product.price -
                                (product.price * product.discount) / 100
                            ).toFixed(2)
                          )}
                          {"₫ "}
                          {product.discount > 0 && (
                            <Typography.Text delete type="danger">
                              {formatNumberWithPeriods(product.price)}₫
                            </Typography.Text>
                          )}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          {` Số lượng còn :${product.quantity}`}
                        </Typography.Paragraph>
                      </>
                    }
                    description={
                      <Typography.Paragraph ellipsis={{ rows: 2 }}>
                        {product.description}
                      </Typography.Paragraph>
                    }
                  ></Card.Meta>
                </Card>
              </Badge.Ribbon>
            );
          }}
          dataSource={getSortedItems()}
        ></List>
        <Modal
          onCancel={() => setOpenRatingModal(false)}
          open={openRatingModal}
          footer={false}
        >
          <div className="flex flex-col  justify-center items-center gap-3">
            <div>{`Hãy đánh giá sản phẩm ${itemForRating?.productName}`}</div>
            <Image
              className="!h-40  !w-40"
              preview={false}
              src={itemForRating?.imgUrl}
            />
            <Rate
              className="scale-150"
              defaultValue={0}
              onChange={(value) => {
                dispatch(
                  updateRating({
                    userId: userInfo.userID,
                    productId: itemForRating.productId,
                    ratingPoint: value,
                  })
                ).then((res) => {
                  if (res) {
                    setOpenRatingModal(false);
                    success();
                    setTimeout(() => Modal.destroyAll(), 1000);
                  }
                });
              }}
            />
          </div>
        </Modal>
      </Row>
    </Col>
  );
}

function AddToCartButton({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const listCartItem = useSelector((state) => state.cart.listCartItem);
  const userInfo = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);
  const success = () => {
    Modal.success({
      content: "Thêm vào giỏ hàng thành công",
      footer: null,
    });
  };

  return (
    <Button
      type="link"
      onClick={() => {
        if (userInfo) {
          const oldQuantity =
            [...listCartItem].find(
              (productItem) => productItem.productId === item.productId
            )?.quantity || 0;
          dispatch(
            updateCart({
              listCartItem: [
                {
                  productId: item.productId,
                  quantity: oldQuantity + 1,
                },
              ],
            })
          ).then((res) => {
            if (res) {
              success();
              setTimeout(() => Modal.destroyAll(), 1000);
            }
          });
        } else {
          navigate(ROUTES.LOGIN);
        }
      }}
      loading={loading}
    >
      Thêm giỏ hàng
      <Modal></Modal>
    </Button>
  );
}
export default Products;
