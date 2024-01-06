import { HTTP_STATUS } from "../../common/constans/app";
import { getPredictApi, updateRatingApi } from "../../services/rating";
import ACTION_TYPES from "../action-types/rating";
import { success, fail, request } from "../core";

/**
 * updateRating
 * @returns
 */
export const updateRating = (params) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.UPDATE_RATING_REQUEST));
    return updateRatingApi(params).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.UPDATE_RATING_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.UPDATE_RATING_FAIL));
      }

      return response;
    });
  };
};

/**
 * updateRating
 * @returns
 */
export const getPredict = (id) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_PREDICT_REQUEST));
    return getPredictApi(id).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(success(ACTION_TYPES.GET_PREDICT_SUCCESS, response.data));
      } else {
        dispatch(fail(ACTION_TYPES.GET_PREDICT_FAIL));
      }

      return response;
    });
  };
};
