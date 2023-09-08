import httpServices from "./core";

const getAllProductUrl = "/product/all";
const addProductUrl = "/product";

/**
 * getAllProductApi
 * @returns
 */
export const getAllProductApi = (params) => {
  return httpServices.get(getAllProductUrl, params);
};

/**
 * addProductApi
 * @returns
 */
export const addProductApi = (params) => {
  return httpServices.post(addProductUrl, params);
};
