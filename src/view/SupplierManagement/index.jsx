import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSupplier,
  getAllSupplier,
  getInfoSupplier,
  searchSupplier,
  setVisibleSupplier,
} from "../../redux/actions/supplier";
import { HTTP_STATUS } from "../../common/constans/app";
import { Button, Checkbox, Input, Modal, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";
import moment from "moment/moment";
import "./index.less";
import { ExclamationCircleFilled } from "@ant-design/icons";
import SupplierFormModal from "./SupplierFormModal";

function SupplierManagement() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const loading = useSelector((state) => state.supplier.loading);
  const listSupplierRedux = useSelector((state) => state.supplier.listSupplier);
  const [listSupplier, setListSupplier] = useState([]);
  const [supplierData, setSupplierData] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [idsToDelete, setIdsToDelete] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(() => {
    const openEditForm = (id) => {
      dispatch(getInfoSupplier(id)).then((res) => {
        if (res.statusCode === HTTP_STATUS.CODE.SUCCESS) {
          setSupplierData(res.data);
          setVisibleModal(true);
          setIsEdit(true);
        }
      });
    };
    return [
      {
        width: "3%",
        title: "ID",
        render: (record) => record.supplierId,
      },
      {
        width: "10%",
        title: "Tên Supplier",
        render: (record) => record.supplierName,
      },
      {
        width: "50%",
        title: "Mô tả",
        render: (record) => record.textDescription,
      },
      {
        width: "10%",
        title: "Sửa",
        render: (record) => (
          <Button
            className="border-none bg-blue-600 !text-white"
            onClick={() => openEditForm(record.supplierId)}
          >
            Sửa
          </Button>
        ),
      },
      {
        width: "10%",
        title: "Xóa",
        render: (record) => (
          <Button
            onClick={() => openConfirmDelete([record.supplierId])}
            className="border-none bg-red-600 !text-white"
          >
            Xóa
          </Button>
        ),
      },
    ];
  }, [dispatch]);

  const openConfirmDelete = (ids) => {
    setVisibleDeleteModal(true);
    setIdsToDelete(ids);
  };

  useEffect(() => {
    dispatch(getAllSupplier());
  }, [dispatch, history]);

  useEffect(() => {
    setListSupplier(listSupplierRedux);
    setSelectedKeys([]);
  }, [listSupplierRedux]);

  useEffect(() => {
    setIdsToDelete((previousState) => {
      return visibleDeleteModal ? previousState : [];
    });
  }, [visibleDeleteModal]);

  const rowSelection = {
    selectedRowKeys: [...selectedKeys],
    onChange: (newSelectedKeys) => setSelectedKeys(newSelectedKeys),
  };

  return (
    <Spin
      wrapperClassName="h-full w-full  absolute"
      className="!h-full !w-full !max-h-full"
      spinning={loading && !visibleModal}
    >
      <div
        className="px-5 py-2 ml-5 mt-5 rounded  text-white bg-blue-600 w-fit cursor-pointer"
        onClick={() => setVisibleModal(true)}
      >
        Add
      </div>

      <SupplierFormModal
        isEdit={isEdit}
        data={supplierData}
        loading={loading && visibleModal}
        visible={visibleModal}
        onCancel={() => {
          setVisibleModal(false);
          setIsEdit(false);
        }}
      />

      <Table
        rowSelection={rowSelection}
        rootClassName="w-full h-full"
        columns={columns}
        dataSource={listSupplierRedux?.map((item) => {
          return { key: item.supplierId, ...item };
        })}
      />

      {selectedKeys.length && (
        <div className="sticky w-5/6 h-12 m-auto mt-auto bottom-5 rounded-lg bg-blue-300 flex  items-center">
          <span className="absolute left-5">{`Đang chọn: ${selectedKeys.length}`}</span>
          <Button
            className="absolute left-1/2 border-none bg-red-600  !text-white"
            onClick={() => openConfirmDelete(selectedKeys)}
          >
            Xóa
          </Button>
        </div>
      )}
      <Modal
        icon={<ExclamationCircleFilled />}
        title="Bạn có muốn xóa supplier không ?"
        content="Some descriptions"
        okText="Yes"
        okType="danger"
        cancelText="No"
        onCancel={() => setVisibleDeleteModal(false)}
        onOk={() => {
          dispatch(deleteSupplier(idsToDelete));
          setVisibleDeleteModal(false);
          dispatch(getAllSupplier());
        }}
        open={visibleDeleteModal}
        centered
      ></Modal>
    </Spin>
  );
}

export default SupplierManagement;
