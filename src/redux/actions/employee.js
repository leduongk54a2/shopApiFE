import { HTTP_STATUS } from "../../common/constans/app";

import {
  addEmployeeApi,
  editEmployeeInfoApi,
  getAllEmployeeApi,
  getEmployeeInfoApi,
} from "../../services/employee";
import ACTION_TYPES from "../action-types/employee";

import { success, fail, request } from "../core";

/**
 * getAllEmployee
 * @returns
 */
export const getAllEmployee = () => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_ALL_EMPLOYEE_REQUEST));
    return getAllEmployeeApi().then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_ALL_EMPLOYEE_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.GET_ALL_EMPLOYEE_FAIL));
      }

      return response;
    });
  };
};

/**
 * addEmployee
 * @returns
 */
export const addEmployee = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.ADD_EMPLOYEE_REQUEST));
    return addEmployeeApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.ADD_EMPLOYEE_SUCCESS));
      } else {
        dispatch(fail(ACTION_TYPES.ADD_EMPLOYEE_FAIL));
      }

      return response;
    });
  };
};

/**
 * getEmployeeInfo
 * @returns
 */
export const getEmployeeInfo = (id) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_EMPLOYEE_INFO_REQUEST));
    return getEmployeeInfoApi(id).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_EMPLOYEE_INFO_SUCCESS));
      } else {
        dispatch(fail(ACTION_TYPES.GET_EMPLOYEE_INFO_FAIL));
      }

      return response;
    });
  };
};

/**
 * editEmployeeInfo
 * @returns
 */
export const editEmployeeInfo = (params, id) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.EDIT_EMPLOYEE_INFO_REQUEST));
    return editEmployeeInfoApi(params, id).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.EDIT_EMPLOYEE_INFO_SUCCESS));
      } else {
        dispatch(fail(ACTION_TYPES.EDIT_EMPLOYEE_INFO_FAIL));
      }

      return response;
    });
  };
};
