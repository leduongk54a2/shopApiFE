import React from "react";
import { Button, Col, Image, Modal, Row } from "antd";
import "./index.less";

function PreviewProductModal(props) {
  return (
    <Modal
      className="wrap-preview-modal !w-5/6 h-3/4 overflow-auto lg:!w-1/2 lg:h-1/2 bg-white"
      open={props.visible}
      onCancel={props.onCancel}
      footer={false}
    >
      <Row className="h-full" gutter={10}>
        <Col className="h-ful " xs={24} lg={8} flex>
          <Image
            preview={false}
            wrapperClassName="h-full"
            className="!h-full object-contain"
            src={props.dataPreview.imgUrl}
          />
        </Col>
        <Col
          className="h-full p-8x flex flex-col justify-between"
          xs={24}
          lg={16}
        >
          <Row className="font-bold text-3xl">
            {props.dataPreview.productName}
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              {props.dataPreview.discount > 0 ? (
                <>
                  <div className="text-xl text-blue-400 flex items-center lg:text-2xl">
                    <span className="line-through">
                      ₫{props.dataPreview.price}
                    </span>
                    <span className="ml-5">
                      ₫
                      {props.dataPreview.price *
                        (1 - props.dataPreview.discount / 100)}
                    </span>
                    <div className="bg-blue-400 text-white text-xs ml-5 h-fit">{`${props.dataPreview.discount}% Giảm`}</div>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl text-blue-400 flex items-center">
                    ₫{props.dataPreview.price}
                  </span>
                </>
              )}
            </Col>
          </Row>
          <Row
            lg={12}
            className="text-xl  text-blue-400 flex items-center lg:text-2xl"
          >
            Còn Lại: {props.dataPreview.quantity}
          </Row>
          <Row className="mt-5">{props.dataPreview.description}</Row>
          <Row className="mt-5 pb-5 flex justify-center lg:pb-0">
            <Button className="w-20 h-16 bg-blue-600 text-white">Mua</Button>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default PreviewProductModal;
