import { HTTP_STATUS } from "../../common/constans/app";

import { addEmployeeApi, getAllEmployeeApi } from "../../services/employee";
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
