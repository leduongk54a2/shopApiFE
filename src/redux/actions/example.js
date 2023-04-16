// import { HTTP_STATUS } from "../../constants/app/app"
// import ACTION_TYPES from "../action-types/company"
// import {
//   delCompanyByIdApi,
//   getCompanyListApi,
//   postAvatarCompanyApi,
//   postCompanyApi,
//   putStatusCompanyApi,
//   putCompanyApi,
// } from "../../services/company"
// import { success, fail } from "../core"

// /**
//  * getCompanyList
//  * @param {Object} params
//  * @returns
//  */
// export const getCompanyList = (params) => {
//   return (dispatch) => {
//     return getCompanyListApi(params).then((response) => {
//       if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
//         dispatch(success(ACTION_TYPES.GET_COMPANY_LIST_SUCCESS, response?.data))
//       } else {
//         dispatch(fail(ACTION_TYPES.GET_COMPANY_LIST_FAIL))
//       }
//     })
//   }
// }

// /**
//  * delCompanyById
//  * @param {String} id
//  * @returns
//  */
// export const delCompanyById = (id) => {
//   return (dispatch) => {
//     return delCompanyByIdApi(id).then((response) => {
//       if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
//         dispatch(success(ACTION_TYPES.DEL_COMPANY_SUCCESS, response?.data))
//       } else {
//         dispatch(fail(ACTION_TYPES.DEL_COMPANY_FAIL))
//       }
//     })
//   }
// }

// /**
//  * postAvatarCompany
//  * @param {File} params
//  * @returns
//  */
// export const postAvatarCompany = (params) => {
//   return (dispatch) => {
//     return postAvatarCompanyApi(params).then((response) => {
//       if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
//         dispatch(success(ACTION_TYPES.POST_AVATAR_COMPANY_SUCCESS, response?.data))
//       } else {
//         dispatch(fail(ACTION_TYPES.POST_AVATAR_COMPANY_FAIL))
//       }

//       return response
//     })
//   }
// }

// /**
//  * postCompany
//  * @param {Object} params
//  * @returns
//  */
// export const postCompany = (params) => {
//   return (dispatch) => {
//     return postCompanyApi(params).then((response) => {
//       if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
//         dispatch(success(ACTION_TYPES.POST_COMPANY_SUCCESS, response?.data))
//       } else {
//         dispatch(fail(ACTION_TYPES.POST_COMPANY_FAIL))
//       }

//       return response
//     })
//   }
// }

// /**
//  * putStatusCompany
//  * @param {String} id
//  * @param {Object} params
//  * @returns
//  */
// export const putStatusCompany = (id, params) => {
//   return (dispatch) => {
//     return putStatusCompanyApi(id, params).then((response) => {
//       if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
//         dispatch(success(ACTION_TYPES.PUT_STATUS_COMPANY_SUCCESS, response?.data))
//       } else {
//         dispatch(fail(ACTION_TYPES.PUT_STATUS_COMPANY_FAIL))
//       }

//       return response
//     })
//   }
// }

// /**
//  * putCompany
//  * @param {String} id
//  * @param {Object} params
//  * @returns
//  */
// export const putCompany = (id, params) => {
//   return (dispatch) => {
//     return putCompanyApi(id, params).then((response) => {
//       if (response?.statusCode === HTTP_STATUS.CODE.SUCCESS) {
//         dispatch(success(ACTION_TYPES.PUT_COMPANY_SUCCESS, response?.data))
//       } else {
//         dispatch(fail(ACTION_TYPES.PUT_COMPANY_FAIL))
//       }

//       return response
//     })
//   }
// }