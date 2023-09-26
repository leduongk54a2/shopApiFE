import { HTTP_STATUS } from "../../common/constans/app";
import { success, fail, request } from "../core";
import ACTION_TYPES from "../action-types/cart";
import {
  getCartInfoApi,
  updateCartApi,
  updateQuantityCartItemApi,
} from "../../services/cart";

/**
 * updateCart
 * @returns
 */
export const updateCart = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.CREATE_OR_UPDATE_CART_REQUEST));
    return updateCartApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.CREATE_OR_UPDATE_CART_SUCCESS));
      } else {
        dispatch(fail(ACTION_TYPES.CREATE_OR_UPDATE_CART_FAIL));
      }

      return response;
    });
  };
};

/**
 * getCartInfo
 * @returns
 */
export const getCartInfo = () => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_CART_INFO_REQUEST));
    return getCartInfoApi().then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_CART_INFO_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.GET_CART_INFO_FAIL));
      }

      return response;
    });
  };
};

/**
 * updateQuantityCartItem
 * @returns
 */
export const updateQuantityCartItem = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.UPDATE_QUANTITY_CART_ITEM_REQUEST));
    return updateQuantityCartItemApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.UPDATE_QUANTITY_CART_ITEM_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.UPDATE_QUANTITY_CART_ITEM_FAIL));
      }

      return response;
    });
  };
};
