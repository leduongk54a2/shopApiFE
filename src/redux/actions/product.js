import { HTTP_STATUS } from "../../common/constans/app";
import { success, fail, request } from "../core";
import { addProductApi, getAllProductApi } from "../../services/product";
import ACTION_TYPES from "../action-types/product";

/**
 * getAllProduct
 * @returns
 */
export const getAllProduct = (params) => {
  return (dispatch, getState) => {
    dispatch(request(ACTION_TYPES.GET_ALL_PRODUCTS_REQUEST));
    const oldActionSearch = getState().product.actionSearch || {};
    const newActionSearch = {
      ...oldActionSearch,
      ...params,
    };
    return getAllProductApi(newActionSearch).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        const newData = {
          listProduct: response.data,
          actionSearch: newActionSearch,
        };
        dispatch(success(ACTION_TYPES.GET_ALL_PRODUCTS_SUCCESS, newData));
      } else {
        dispatch(fail(ACTION_TYPES.GET_ALL_PRODUCTS_FAIL));
      }

      return response;
    });
  };
};

/**
 * addProduct
 * @returns
 */
export const addProduct = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.CREATE_PRODUCT_REQUEST));
    return addProductApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.CREATE_PRODUCT_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.CREATE_PRODUCT_FAIL));
      }

      return response;
    });
  };
};
