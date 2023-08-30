import httpServices from "./core";

const getAllCategoryUrl = "category/all";
const addCategoryUrl = "category";
const deleteCategoryUrl = "category";
const setVisibleCategoryUrl = "category/{id}";
const getInfoCategoryUrl = "category/{id}";
const editInfoCategoryUrl = "category/{id}";

export const getAllCategoryApi = () => {
  return httpServices.get(getAllCategoryUrl);
};

export const addCategoryApi = (params) => {
  return httpServices.post(addCategoryUrl, params);
};

export const setVisibleCategoryApi = (id, visible) => {
  return httpServices.patch(setVisibleCategoryUrl.replace("{id}", `${id}`), {
    visible: visible,
  });
};

export const getInfoCategoryApi = (id) => {
  return httpServices.get(getInfoCategoryUrl.replace("{id}", `${id}`));
};

export const editInfoCategoryApi = (id, params) => {
  return httpServices.put(editInfoCategoryUrl.replace("{id}", `${id}`), params);
};

export const deleteCategoryApi = (ids) => {
  return httpServices.delete(deleteCategoryUrl, {
    params: { ids: ids.join() },
  });
};
