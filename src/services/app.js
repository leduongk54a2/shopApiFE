import httpServices from "./core";

const loginUrl = "user/login";
const logoutUrl = "user/logout";
const resetPasswordUrl = "user/update-password";
const registerUrl = "user/create";
const uploadImageUrl = "upload-image";

/**
 * loginApi
 * @param {Object} params
 * @returns
 */
export const loginApi = (params) => {
  return httpServices.post(loginUrl, params);
};

/**
 * logoutApi
 * @returns
 */
export const logoutApi = () => {
  return httpServices.post(logoutUrl);
};

/**
 * resetPasswordApi
 * @param {Object} params
 * @returns
 */
export const resetPasswordApi = (params) => {
  return httpServices.post(resetPasswordUrl, params);
};

/**
 * registerApi
 * @param {Object} params
 * @returns
 */
export const registerApi = (params) => {
  return httpServices.post(registerUrl, params);
};

/**
 * uploadImageApi
 * @param {Object} params
 * @returns
 */
export const uploadImageApi = (params) => {
  return httpServices.post(uploadImageUrl, params);
};
