import React, { useLayoutEffect, useMemo, useState } from "react";
import "./index.less";
import HeaderUser from "../UserView/Header";
import UserFooter from "../UserView/Footer";
import {
  Button,
  Col,
  Image,
  InputNumber,
  Modal,
  Rate,
  Row,
  Spin,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getProductDetail } from "../../redux/actions/product";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategory } from "../../redux/actions/category";
import "./index.less";
import { updateCart } from "../../redux/actions/cart";
import { formatNumberWithPeriods } from "../../common/function";
import ROUTES from "../../routes/routes";
import { updateRating } from "../../redux/actions/rating";
function ProductView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const userInfo = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);
  const listCartItem = useSelector((state) => state.cart.listCartItem);
  const listSupplier =
    useSelector((state) => state.supplier.listSupplier) || [];
  useLayoutEffect(() => {
    dispatch(getAllCategory());
  }, []);

  useLayoutEffect(() => {
    const paramSearch = new URLSearchParams(location.search);
    const productId = paramSearch.get("productId") || null;

    setLoading(true);

    dispatch(getProductDetail(Number.parseInt(productId))).then((res) => {
      if (res) {
        setProduct(res.data);
        setLoading(false);
      }
    });
  }, []);

  const success = (message) => {
    Modal.success({
      content: message,
      footer: null,
    });
  };

  return (
    <Spin spinning={loading}>
      <Row
        className="w-full flex flex-col content-start px-0 py-10 sm:p-10 min-h-screen"
        gutter={[0, 50]}
      >
        <Col lg={24} xs={24}>
          <Row>
            <Col className="flex h-fit justify-center mb-5" lg={12} xs={24}>
              <Image
                wrapperClassName="border-2 border-black rounded-xl"
                className="object-scale-down"
                width={585}
                height={390}
                src={product.imgUrl}
              ></Image>
            </Col>
            <Col className="p-0 lg:p-5 font-semibold" lg={12} xs={24}>
              <Row>
                <Col
                  lg={24}
                  xs={24}
                  className="font-bold text-4xl border-black border-b-2 pb-5 mb-3"
                >
                  {product.productName}
                </Col>
              </Row>
              <Row>
                <Col clas lg={24} xs={24}>
                  <span className="text-gray-500">Mã sản phẩm: </span>{" "}
                  {product.productId}
                </Col>
              </Row>
              <Row>
                <Col lg={24} xs={24} className="mt-3">
                  {" "}
                  <Typography.Paragraph className="text-red-600 text-4xl">
                    {formatNumberWithPeriods(
                      parseFloat(
                        product.price - (product.price * product.discount) / 100
                      ).toFixed(0)
                    )}
                    ₫{" "}
                    {product.discount > 0 && (
                      <Typography.Text
                        className="text-gray-500 text-2xl"
                        delete
                      >
                        {formatNumberWithPeriods(product.price)}₫
                      </Typography.Text>
                    )}
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row>
                <Col lg={24} xs={24}>
                  {`Hãng sản xuất :${
                    listSupplier.find(
                      (item) => item.supplierId === product.supplierId
                    )?.supplierName || "---"
                  }`}
                </Col>
              </Row>
              <Row>
                <Col lg={24} xs={24}>
                  Số lượng còn: {product.quantity}
                </Col>
              </Row>
              <Row
                className="mt-3 flex flex-row content-center items-center justify-between"
                gutter={[10, 10]}
              >
                <Col
                  className="flex flex-row content-center items-center"
                  lg={12}
                  xs={24}
                >
                  <span className="whitespace-break-spaces">Số Lượng: </span>
                  <InputNumber
                    min={1}
                    max={product.quantity}
                    defaultValue={1}
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                  />
                </Col>
                <Col lg={12} xs={24}>
                  <Button
                    onClick={() => {
                      if (userInfo) {
                        const oldQuantity =
                          [...listCartItem].find(
                            (productItem) =>
                              productItem.productId === product.productId
                          )?.quantity || 0;
                        dispatch(
                          updateCart({
                            listCartItem: [
                              {
                                productId: product.productId,
                                quantity: oldQuantity + quantity,
                              },
                            ],
                          })
                        ).then((res) => {
                          if (res) {
                            success("Thêm vào giỏ hàng thành công");
                            setTimeout(() => Modal.destroyAll(), 1000);
                          }
                        });
                      } else {
                        navigate(ROUTES.LOGIN);
                      }
                    }}
                    className="bg-red-500 text-white rounded-lg !border-red-500 hover:!text-white hover:-translate-y-1 hover:shadow-red-400 hover:shadow-md"
                  >
                    CHO VÀO GIỎ HÀNG
                  </Button>
                </Col>
              </Row>
              <Row className="h-24">
                <Col className="flex items-center" lg={8}>
                  Đánh giá :
                </Col>
                <Col
                  onClick={() => {
                    setOpenRatingModal(true);
                  }}
                  className="flex items-center"
                  lg={16}
                >
                  <Rate
                    className="scale-150 ml-5 flex items-center"
                    disabled
                    allowHalf
                    value={product.rating}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={24} xs={24}>
          <Row className="font-semibold">
            <div className="text-sm px-4 py-2 flex items-center content-center text-white bg-black font-bold">
              CHI TIẾT SẢN PHẨM
            </div>
          </Row>
          <Row className="border-2 px-8 py-4 ">{product.description}</Row>
        </Col>
      </Row>
      <Modal
        onCancel={() => setOpenRatingModal(false)}
        open={openRatingModal}
        footer={false}
      >
        <div className="flex flex-col  justify-center items-center gap-3">
          <div>{`Hãy đánh giá sản phẩm ${product?.productName}`}</div>
          <Image
            className="!h-40  !w-40"
            preview={false}
            src={product?.imgUrl}
          />
          <Rate
            className="scale-150"
            defaultValue={0}
            onChange={(value) => {
              dispatch(
                updateRating({
                  userId: userInfo.userID,
                  productId: product.productId,
                  ratingPoint: value,
                })
              ).then((res) => {
                if (res) {
                  setOpenRatingModal(false);
                  success("Đánh giá thành công!!!");
                  setTimeout(() => Modal.destroyAll(), 1000);
                }
              });
            }}
          />
        </div>
      </Modal>
    </Spin>
  );
}

export default ProductView;
