import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../../redux/actions/order";
import { Select, Spin } from "antd";
import "./index.less";
Chart.register(CategoryScale);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dataa = {
  labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

function Statistic() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const [data, setData] = useState({});
  const [dataShow, setDataShow] = useState(dataa);
  const [listYear, setListYear] = useState([]);
  const [year, setYear] = useState([]);

  useEffect(() => {
    dispatch(getStatistic()).then((res) => {
      if (res) {
        setData(res.data);
        const listYear = Object.keys(res?.data || {});
        setListYear(listYear);
        setYear(listYear[listYear.length - 1]);
      }
    });
  }, []);
  useEffect(() => {
    setDataShow({
      labels,
      datasets: [
        {
          label: "My First Dataset",
          data: data
            ? labels.map((item) => data[year]?.statistic[item] || 0)
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [data, year]);
  return (
    <Spin spinning={loading}>
      <div className="chart-container p-10">
        <h2 style={{ textAlign: "center" }}>Thống kê bán hàng</h2>
        <span>Chọn năm :</span>
        {Boolean(listYear.length) && (
          <Select
            className="w-52"
            options={listYear?.map((item) => {
              return { label: item, value: item };
            })}
            value={year}
            onChange={(value) => setYear(value)}
          ></Select>
        )}
        {dataShow && (
          <Bar
            className="m-auto pt-14"
            data={dataShow}
            options={{
              plugins: {
                title: {
                  display: true,
                },
                legend: {
                  display: false,
                },
              },
              y: {
                suggestedMax: 200000000,
              },
            }}
          />
        )}
      </div>
    </Spin>
  );
}

export default Statistic;
