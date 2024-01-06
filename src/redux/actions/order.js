import { HTTP_STATUS } from "../../common/constans/app";
import {
  getListOrderApi,
  getStatisticApi,
  saveOrderApi,
} from "../../services/order";
import ACTION_TYPES from "../action-types/order";
import { success, fail, request } from "../core";

/**
 * saveOrder
 * @returns
 */
export const saveOrder = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.SAVE_ORDER_REQUEST));
    return saveOrderApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.SAVE_ORDER_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.SAVE_ORDER_FAIL));
      }
      return response;
    });
  };
};

/**
 * saveOrder
 * @returns
 */
export const getListOrder = () => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_LIST_ORDER_REQUEST));
    return getListOrderApi().then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_LIST_ORDER_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.GET_LIST_ORDER_FAIL));
      }
      return response;
    });
  };
};

/**
 * saveOrder
 * @returns
 */
export const getStatistic = () => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_STATISTIC_REQUEST));
    return getStatisticApi().then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_STATISTIC_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.GET_LIST_ORDER_FAIL));
      }
      return response;
    });
  };
};
