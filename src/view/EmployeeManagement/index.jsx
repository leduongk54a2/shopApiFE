import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, getEmployeeInfo } from "../../redux/actions/employee";
import { HTTP_STATUS } from "../../common/constans/app";
import { Button, Checkbox, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";
import AddEmployeeModal from "./component/EmployeeFormModal";
import moment from "moment/moment";
import EmployeeFormModal from "./component/EmployeeFormModal";
import "./index.less";

function EmployeeManagement() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const loading = useSelector((state) => state.employee.loading);
  const listEmployeeRedux = useSelector((state) => state.employee.listEmployee);
  const [listEmployee, setListEmployee] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(() => {
    const openEditForm = (id) => {
      dispatch(getEmployeeInfo(id)).then((res) => {
        if (res.statusCode === HTTP_STATUS.CODE.SUCCESS) {
          setEmployeeData(res.data);
          setVisibleModal(true);
          setIsEdit(true);
        }
      });
    };
    return [
      {
        title: "Username",
        render: (record) => <a>{record.username}</a>,
      },
      {
        title: "Full Name",
        render: (record) => <a>{record.full_name}</a>,
      },
      {
        title: "Gender",
        render: (record) => <a>{record.gender ? "Nam" : "Nữ"}</a>,
      },
      {
        title: "Address",
        dataIndex: "address",
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
      },

      {
        title: "Birthday",
        render: (record) => <a>{moment(record.birth).format("YYYY-MM-DD")}</a>,
      },
      {
        title: "Salary",
        dataIndex: "salary",
      },
      {
        title: "Sửa",
        render: (record) => (
          <Button
            className="border-none bg-blue-600 !text-white"
            onClick={() => openEditForm(record.employee_id)}
          >
            Sửa
          </Button>
        ),
      },
      {
        title: "Xóa",
        render: () => (
          <Button className="border-none bg-red-600 !text-white">Xóa</Button>
        ),
      },
    ];
  }, [dispatch]);

  useEffect(() => {
    const fetchBusinesses = () =>
      dispatch(getAllEmployee()).then((res) => {
        if (res.statusCode === HTTP_STATUS.CODE.UNAUTHENTICATED) {
          history(ROUTES.PAGE403);
        }
      });
    fetchBusinesses();
  }, [dispatch, history]);

  useEffect(() => {
    setListEmployee(
      listEmployeeRedux?.map((item) => {
        return { ...item, ...item.user };
      })
    );
  }, [listEmployeeRedux]);

  const rowSelection = {
    selectedKeys,
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

      <EmployeeFormModal
        isEdit={isEdit}
        data={employeeData}
        loading={loading && visibleModal}
        visible={visibleModal}
        onCancel={() => {
          setVisibleModal(false);
          setIsEdit(false);
        }}
      />

      <Checkbox.Group
        rootClassName="w-full p-5 min-h-full"
        onChange={(listKey) => setSelectedKeys(listKey)}
      >
        <Table
          rowSelection={rowSelection}
          rootClassName="w-full"
          columns={columns}
          dataSource={listEmployee?.map((item) => {
            return { key: item.employee_id, ...item };
          })}
        />
      </Checkbox.Group>

      {selectedKeys.length && (
        <div className="sticky w-5/6 h-12 m-auto mt-auto bottom-5 rounded-lg bg-blue-300 flex  items-center">
          <span className="absolute left-5">{`Đang chọn: ${selectedKeys.length}`}</span>
          <Button className="absolute left-1/2 border-none bg-red-600  !text-white">
            Xóa
          </Button>
        </div>
      )}
    </Spin>
  );
}

export default EmployeeManagement;
