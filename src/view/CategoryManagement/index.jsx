import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategory,
  getInfoCategory,
  searchCategory,
  setVisibleCategory,
} from "../../redux/actions/category";
import { HTTP_STATUS } from "../../common/constans/app";
import { Button, Checkbox, Input, Modal, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";
import moment from "moment/moment";
import "./index.less";
import { ExclamationCircleFilled } from "@ant-design/icons";
import CategoryFormModal from "./CategoryFormModal";

const Check = (props) => {
  const dispatch = useDispatch();
  const setVisible = (id, visible) => {
    dispatch(setVisibleCategory(id, visible));
    dispatch(getAllCategory());
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
        setVisible(props.categoryId, checked);
        setChecked(!checked);
      }}
      checked={checked}
    ></Checkbox>
  );
};
function CategoryManagement() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const loading = useSelector((state) => state.category.loading);
  const listCategoryRedux = useSelector((state) => state.category.listCategory);
  const [listCategory, setListCategory] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [idsToDelete, setIdsToDelete] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(() => {
    const openEditForm = (id) => {
      dispatch(getInfoCategory(id)).then((res) => {
        if (res.statusCode === HTTP_STATUS.CODE.SUCCESS) {
          setCategoryData(res.data);
          setVisibleModal(true);
          setIsEdit(true);
        }
      });
    };
    return [
      {
        width: "3%",
        title: "ID",
        render: (record) => record.categoryId,
      },
      {
        width: "10%",
        title: "Tên Category",
        render: (record) => record.categoryName,
      },
      {
        width: "50%",
        title: "Mô tả",
        render: (record) => record.textDescription,
      },
      {
        width: "10%",
        title: "Ẩn",
        render: (record) => (
          <Check
            categoryId={record.categoryId}
            visible={!record.visible}
          ></Check>
        ),
        shouldCellUpdate: () => {
          return true;
        },
      },
      {
        width: "10%",
        title: "Sửa",
        render: (record) => (
          <Button
            className="border-none bg-blue-600 !text-white"
            onClick={() => openEditForm(record.categoryId)}
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
            onClick={() => openConfirmDelete([record.categoryId])}
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
    const fetchCategory = () =>
      dispatch(getAllCategory()).then((res) => {
        if (res.statusCode === HTTP_STATUS.CODE.UNAUTHENTICATED) {
          history(ROUTES.PAGE403);
        }
      });
    fetchCategory();
  }, [dispatch, history]);

  useEffect(() => {
    setListCategory(listCategoryRedux);
    setSelectedKeys([]);
  }, [listCategoryRedux]);

  useEffect(() => {
    setIdsToDelete((previousState) => {
      return visibleDeleteModal ? previousState : [];
    });
  }, [visibleDeleteModal]);

  const rowSelection = {
    selectedRowKeys: [...selectedKeys],
    onChange: (newSelectedKeys) => setSelectedKeys(newSelectedKeys),
  };

  console.log("before", listCategory);
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

      <CategoryFormModal
        isEdit={isEdit}
        data={categoryData}
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
        dataSource={listCategoryRedux?.map((item) => {
          return { key: item.categoryId, ...item };
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
        title="Bạn có muốn xóa category không ?"
        content="Some descriptions"
        okText="Yes"
        okType="danger"
        cancelText="No"
        onCancel={() => setVisibleDeleteModal(false)}
        onOk={() => {
          dispatch(deleteCategory(idsToDelete));
          setVisibleDeleteModal(false);
          dispatch(getAllCategory());
        }}
        open={visibleDeleteModal}
        centered
      ></Modal>
    </Spin>
  );
}

export default CategoryManagement;
