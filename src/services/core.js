import axios from "axios"
import { getApiBaseUrl } from "../common/until"

/**
 * get
 * @param {String} url
 * @param {Object} params
 * @returns
 */
const get = (url, params = {}) => {
  return axios({
    method: "GET",
    url: `${getApiBaseUrl()}/api/${formatUrl(url)}${formatQueryParams(params)}`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err?.response?.data
    })
}

/**
 * post
 * @param {String} url
 * @param {Object} body
 * @returns post method
 */
const post = (url, body = {}) => {
  return axios({
    method: "POST",
    url: `${getApiBaseUrl()}/api/${formatUrl(url)}`,
    data: body,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err?.response?.data
    })
}

/**
 * put
 * @param {String} url
 * @param {Object} params
 * @returns
 */
const put = (url, params = {}) => {
  return axios({
    method: "PUT",
    data: params,
    url: `${getApiBaseUrl()}/api/${formatUrl(url)}`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err?.response?.data
    })
}

/**
 * delete
 * @param {String} url
 * @param {Object} params
 * @returns
 */
const del = (url, params = {}) => {
  return axios({
    method: "DELETE",
    data: params,
    url:`${getApiBaseUrl()}/api/${formatUrl(url)}`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err?.response?.data
    })
}

const core = {
  get,
  post,
  put,
  del,
}

/**
 * formatUrl
 * @param {String} url
 * @returns format url with standard format
 */
const formatUrl = (url) => {
  return url
    .split("/")
    .filter((part) => part)
    .join("/")
}

/**
 * formatQueryParams
 * @param {Object} params
 * @returns format params with standard format
 */
const formatQueryParams = (params) => {
  let result = [...Object.keys(params)].map((key) => `${key}=${params[key]}`).join("&")

  if (result) return "?" + [...Object.keys(params)].map((key) => `${key}=${params[key]}`).join("&")

  return ""
}

export default core