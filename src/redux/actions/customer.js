import { HTTP_STATUS } from "../../common/constans/app";
import { getCustomerInfoApi } from "../../services/customer";
import ACTION_TYPES from "../action-types/customer";
import { success, fail, request } from "../core";

/**
 * updateRating
 * @returns
 */
export const getCustomerInfo = (id) => {
  return (dispatch) => {
    dispatch(request(ACTION_TYPES.GET_CUSTOMER_INFO_REQUEST));
    return getCustomerInfoApi(id).then((response) => {
      if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
        dispatch(
          success(ACTION_TYPES.GET_CUSTOMER_INFO_SUCCESS, response.data)
        );
      } else {
        dispatch(fail(ACTION_TYPES.GET_CUSTOMER_INFO_FAIL));
      }

      return response;
    });
  };
};
