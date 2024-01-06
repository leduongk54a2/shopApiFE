import httpServices from "./core";

const updateRatingUrl = "rating/update-rating";
const getPredictUrl = "rating/get-predict/{id}";

export const updateRatingApi = (params) => {
  return httpServices.post(updateRatingUrl, params);
};

export const getPredictApi = (id) => {
  return httpServices.get(getPredictUrl.replace("{id}", "" + id));
};
