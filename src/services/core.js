import axios from "axios";
import { getApiBaseUrl } from "../common/until";

const axiosWithAuth = () => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const instance = axios.create({
    baseURL: `${getApiBaseUrl()}/api/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return instance;
};

const httpServices = {
  get: (url, params = {}) => {
    return axiosWithAuth()
      .get(url, {
        params,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err?.response?.data;
      });
  },
  post: (url, params = {}) => {
    return axiosWithAuth()
      .post(url, params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err?.response?.data;
      });
  },

  put: (url, params = {}) => {
    return axiosWithAuth()
      .put(url, params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err?.response?.data;
      });
  },
  patch: (url, params = {}) => {
    return axiosWithAuth()
      .patch(url, params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err?.response?.data;
      });
  },
  delete: (url, params = {}) => {
    return axiosWithAuth()
      .delete(url, {
        ...params,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err?.response?.data;
      });
  },
};

export default httpServices;
