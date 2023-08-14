import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee } from "../../redux/actions/employee";
import { HTTP_STATUS } from "../../common/constans/app";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";
import AddEmployeeModal from "./component/AddEmployeeModal";

const columns = [
  {
    title: "Full Name",
    dataIndex: "full_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

function EmployeeManagement() {
  const [listEmployee, setListEmployee] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const listEmployeeRedux = useSelector((state) => state.employee.listEmployee);

  const loading = useSelector((state) => state.employee.loading);
  const dispatch = useDispatch();
  const history = useNavigate();
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
    setListEmployee(listEmployeeRedux);
  }, [listEmployeeRedux]);

  return (
    <Spin
      wrapperClassName="h-full w-full absolute"
      className="!h-full !w-full !max-h-full"
      spinning={loading && !visibleModal}
    >
      <div
        className="px-5 py-2 ml-5 mt-5 rounded text-white bg-blue-600 w-fit cursor-pointer"
        onClick={() => setVisibleModal(true)}
      >
        Add
      </div>

      {JSON.stringify(listEmployee)}
      <AddEmployeeModal
        loading={loading && visibleModal}
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
      />
    </Spin>
  );
}

export default EmployeeManagement;
