import httpServices from "./core";

const getCustomerInfoUrl = "customer/{id}";

export const getCustomerInfoApi = (id) => {
  return httpServices.get(getCustomerInfoUrl.replace("{id}", "" + id));
};
