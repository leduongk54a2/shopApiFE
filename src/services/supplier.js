import httpServices from "./core";

const getAllSupplierUrl = "supplier/all";
const addSupplierUrl = "supplier";
const deleteSupplierUrl = "supplier";
const setVisibleSupplierUrl = "supplier/{id}";
const getInfoSupplierUrl = "supplier/{id}";
const editInfoSupplierUrl = "supplier/{id}";

export const getAllSupplierApi = () => {
  return httpServices.get(getAllSupplierUrl);
};

export const addSupplierApi = (params) => {
  return httpServices.post(addSupplierUrl, params);
};

export const setVisibleSupplierApi = (id, visible) => {
  return httpServices.patch(setVisibleSupplierUrl.replace("{id}", `${id}`), {
    visible: visible,
  });
};

export const getInfoSupplierApi = (id) => {
  return httpServices.get(getInfoSupplierUrl.replace("{id}", `${id}`));
};

export const editInfoSupplierApi = (id, params) => {
  return httpServices.put(editInfoSupplierUrl.replace("{id}", `${id}`), params);
};

export const deleteSupplierApi = (ids) => {
  return httpServices.delete(deleteSupplierUrl, {
    params: { ids: ids.join() },
  });
};
