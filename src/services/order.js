import httpServices from "./core";

const saveOrderUrl = "order/save-order";
const getListOrderUrl = "order/all";
const getStatisticUrl = "order/statistic";

export const saveOrderApi = (params) => {
  return httpServices.post(saveOrderUrl, params);
};
export const getListOrderApi = () => {
  return httpServices.get(getListOrderUrl);
};

export const getStatisticApi = () => {
  return httpServices.get(getStatisticUrl);
};
