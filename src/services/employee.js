import httpServices from "./core";

const getAllEmployeeUrl = "/employee/all";
const addEmployeeUrl = "/employee/add";
const getEmployeeInfoUrl = "/employee/{id}";
const editEmployeeInfoUrl = "/employee/edit/{id}";

/**
 * getAllEmployee
 * @returns
 */
export const getAllEmployeeApi = () => {
  return httpServices.get(getAllEmployeeUrl);
};

/**
 * addEmployeeApi
 * @returns
 */
export const addEmployeeApi = (params) => {
  return httpServices.post(addEmployeeUrl, params);
};

/**
 * getEmployeeInfoApi
 * @returns
 */
export const getEmployeeInfoApi = (id) => {
  return httpServices.get(getEmployeeInfoUrl.replace("{id}", `${id}`));
};

/**
 * getEmployeeInfoApi
 * @returns
 */
export const editEmployeeInfoApi = (params, id) => {
  return httpServices.put(editEmployeeInfoUrl.replace("{id}", `${id}`), params);
};
