import { HTTP_STATUS } from "../../common/constans/app";
import {
  loginApi,
  logoutApi,
  registerApi,
  resetPasswordApi,
  uploadImageApi,
} from "../../services/app";
import ACTION_TYPES from "../action-types/app";

import { success, fail, request } from "../core";

/**
 * login
 * @param {Object} params
 * @returns
 */
export const login = (params) => {
  return (dispatch) => {
    dispatch(request());
    return loginApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.LOGIN_SUCCESS, response?.data));
      } else {
        dispatch(fail(ACTION_TYPES.APP_FAIL));
      }

      return response;
    });
  };
};

/**
 * logout
 * @returns
 */
export const logout = () => {
  return (dispatch) => {
    return logoutApi().then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.LOGOUT_SUCCESS, response?.data));
      } else {
        dispatch(fail(ACTION_TYPES.APP_FAIL));
      }

      return response;
    });
  };
};

/**
 * resetPassword
 * @returns
 */
export const resetPassword = (params) => {
  return (dispatch) => {
    dispatch(request());
    return resetPasswordApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.APP_SUCCESS, response?.data));
      } else {
        dispatch(fail(ACTION_TYPES.APP_FAIL));
      }

      return response;
    });
  };
};

/**
 * register
 * @returns
 */
export const register = (params) => {
  return (dispatch) => {
    dispatch(request());
    return registerApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.APP_SUCCESS));
      } else {
        dispatch(fail(ACTION_TYPES.APP_FAIL));
      }

      return response;
    });
  };
};

/**
 * uploadImage
 * @returns
 */
export const uploadImage23 = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.UPLOAD_IMAGE_REQUEST));
    return uploadImageApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.UPLOAD_IMAGE_SUCCESS));
      } else {
        dispatch(fail(ACTION_TYPES.UPLOAD_IMAGE_FAIL));
      }

      return response;
    });
  };
};
