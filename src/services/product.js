import httpServices from "./core";

const getAllProductUrl = "/product/all";
const addProductUrl = "/product";
const updateProductInfoUrl = "/product/{id}";
const getProductsDisplayUrl = "/product/display";
const getProductDetailUrl = "/product/{id}";

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

/**
 * updateProductApi
 * @returns
 */
export const updateProductApi = (id, params) => {
  return httpServices.put(
    updateProductInfoUrl.replace("{id}", "" + id),
    params
  );
};

/**
 * getProductsDisplayApi
 * @returns
 */
export const getProductsDisplayApi = () => {
  return httpServices.get(getProductsDisplayUrl);
};

/**
 * getProductsDisplayApi
 * @returns
 */
export const getProductDetailApi = (id) => {
  return httpServices.get(getProductDetailUrl.replace("{id}", "" + id));
};
