import httpServices from "./core";
const updateCartUrl = "/cart";
const getCartInfoUrl = "/cart";
const updateQuantityCartItemUrl = "/cart/update-cart";

export const updateCartApi = (params) => {
  return httpServices.post(updateCartUrl, params);
};

export const getCartInfoApi = () => {
  return httpServices.get(getCartInfoUrl);
};

export const updateQuantityCartItemApi = (params) => {
  return httpServices.post(updateQuantityCartItemUrl, params);
};
