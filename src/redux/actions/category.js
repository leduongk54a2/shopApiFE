import { HTTP_STATUS } from "../../common/constans/app";
import { success, fail, request } from "../core";
import {
  addCategoryApi,
  deleteCategoryApi,
  editInfoCategoryApi,
  getAllCategoryApi,
  getInfoCategoryApi,
  setVisibleCategoryApi,
} from "../../services/category";
import ACTION_TYPES from "../action-types/category";

/**
 * getAllCategory
 * @returns
 */
export const getAllCategory = () => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_ALL_CATEGORY_REQUEST));
    return getAllCategoryApi().then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_ALL_CATEGORY_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.GET_ALL_CATEGORY_FAIL));
      }

      return response;
    });
  };
};

/**
 * addCategory
 * @returns
 */
export const addCategory = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.ADD_CATEGORY_REQUEST));
    return addCategoryApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.ADD_CATEGORY_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.ADD_CATEGORY_FAIL));
      }

      return response;
    });
  };
};

/**
 * setVisibleCategory
 * @returns
 */
export const setVisibleCategory = (id, visible) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.SET_VISIBLE_CATEGORY_REQUEST));
    return setVisibleCategoryApi(id, visible).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.SET_VISIBLE_CATEGORY_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.SET_VISIBLE_CATEGORY_FAIL));
      }

      return response;
    });
  };
};

/**
 * getInfoCategory
 * @returns
 */
export const getInfoCategory = (id) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_INFO_CATEGORY_REQUEST));
    return getInfoCategoryApi(id).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.GET_INFO_CATEGORY_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.GET_INFO_CATEGORY_FAIL));
      }

      return response;
    });
  };
};

/**
 * editInfoCategory
 * @returns
 */
export const editInfoCategory = (id, params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.EDIT_INFO_CATEGORY_REQUEST));
    return editInfoCategoryApi(id, params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.EDIT_INFO_CATEGORY_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.EDIT_INFO_CATEGORY_FAIL));
      }

      return response;
    });
  };
};

/**
 * deleteCategory
 * @returns
 */
export const deleteCategory = (id, params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.DELETE_CATEGORY_REQUEST));
    return deleteCategoryApi(id, params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.DELETE_CATEGORY_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.DELETE_CATEGORY_FAIL));
      }

      return response;
    });
  };
};
