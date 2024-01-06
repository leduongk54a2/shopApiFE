import { HTTP_STATUS } from "../../common/constans/app";
import { success, fail, request } from "../core";
import {
  addSupplierApi,
  deleteSupplierApi,
  editInfoSupplierApi,
  getAllSupplierApi,
  getInfoSupplierApi,
  setVisibleSupplierApi,
} from "../../services/supplier";
import ACTION_TYPES from "../action-types/supplier";

/**
 * getAllSupplier
 * @returns
 */
export const getAllSupplier = () => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_ALL_SUPPLIER_REQUEST));
    return getAllSupplierApi().then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_ALL_SUPPLIER_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.GET_ALL_SUPPLIER_FAIL));
      }

      return response;
    });
  };
};

/**
 * addSupplier
 * @returns
 */
export const addSupplier = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.ADD_SUPPLIER_REQUEST));
    return addSupplierApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.ADD_SUPPLIER_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.ADD_SUPPLIER_FAIL));
      }

      return response;
    });
  };
};

/**
 * setVisibleSupplier
 * @returns
 */
export const setVisibleSupplier = (id, visible) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.SET_VISIBLE_SUPPLIER_REQUEST));
    return setVisibleSupplierApi(id, visible).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.SET_VISIBLE_SUPPLIER_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.SET_VISIBLE_SUPPLIER_FAIL));
      }

      return response;
    });
  };
};

/**
 * getInfoSupplier
 * @returns
 */
export const getInfoSupplier = (id) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_INFO_SUPPLIER_REQUEST));
    return getInfoSupplierApi(id).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.GET_INFO_SUPPLIER_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.GET_INFO_SUPPLIER_FAIL));
      }

      return response;
    });
  };
};

/**
 * editInfoSupplier
 * @returns
 */
export const editInfoSupplier = (id, params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.EDIT_INFO_SUPPLIER_REQUEST));
    return editInfoSupplierApi(id, params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.EDIT_INFO_SUPPLIER_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.EDIT_INFO_SUPPLIER_FAIL));
      }

      return response;
    });
  };
};

/**
 * deleteSupplier
 * @returns
 */
export const deleteSupplier = (id, params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.DELETE_SUPPLIER_REQUEST));
    return deleteSupplierApi(id, params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.DELETE_SUPPLIER_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.DELETE_SUPPLIER_FAIL));
      }

      return response;
    });
  };
};
