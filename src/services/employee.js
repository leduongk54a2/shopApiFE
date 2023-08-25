import httpServices from "./core";

const getAllEmployeeUrl = "/employee/all";
const addEmployeeUrl = "/employee/add";
const getEmployeeInfoUrl = "/employee/{id}";
const editEmployeeInfoUrl = "/employee/edit/{id}";
const deleteEmployeeUrl = "/employee/delete";
const searchEmployeeUrl = "/employee/search";

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

/**
 * deleteEmployeeApi
 * @returns
 */
export const deleteEmployeeApi = (ids) => {
  return httpServices.delete(deleteEmployeeUrl, {
    params: { ids: ids.join() },
  });
};

/**
 * searchEmployeeApi
 * @returns
 */
export const searchEmployeeApi = (keyword) => {
  return httpServices.get(searchEmployeeUrl, { keyword });
};
