import ACTION_TYPES from "../action-types/category";

const initState = {
  listCategory: [],
  loading: false,
};

/**
 * category
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function category(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_CATEGORY_REQUEST:
    case ACTION_TYPES.SET_VISIBLE_CATEGORY_REQUEST:
    case ACTION_TYPES.EDIT_INFO_CATEGORY_REQUEST:
    case ACTION_TYPES.DELETE_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTION_TYPES.GET_ALL_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        listCategory: action.data,
      };
    }
    case ACTION_TYPES.GET_ALL_CATEGORY_FAIL:
    case ACTION_TYPES.SET_VISIBLE_CATEGORY_SUCCESS:
    case ACTION_TYPES.SET_VISIBLE_CATEGORY_FAIL:
    case ACTION_TYPES.EDIT_INFO_CATEGORY_SUCCESS:
    case ACTION_TYPES.EDIT_INFO_CATEGORY_FAIL:
    case ACTION_TYPES.DELETE_CATEGORY_SUCCESS:
    case ACTION_TYPES.DELETE_CATEGORY_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default category;
