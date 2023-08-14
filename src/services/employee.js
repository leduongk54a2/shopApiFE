import httpServices from "./core";

const getAllEmployeeUrl = "/employee/all";
const addEmployeeUrl = "/employee/add";

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
