import ACTION_TYPES from "./action-types/app";

/**
 * success
 * @param {Object} type
 * @param {Object} data
 * @returns
 */
export const request = (type) => {
  if (type) {
    return { type };
  }

  return { type: ACTION_TYPES.APP_REQUEST };
};

/**
 * success
 * @param {Object} type
 * @param {Object} data
 * @returns
 */
export const success = (type, data = {}) => {
  if (type) {
    return { type, data };
  }

  return { type: ACTION_TYPES.APP_SUCCESS, data };
};

/**
 * fail
 * @param {Object} type
 * @param {Object} data
 * @returns
 */
export const fail = (type, data = {}) => {
  if (type) {
    return { type, data };
  }

  return { type: ACTION_TYPES.APP_FAIL, data };
};
