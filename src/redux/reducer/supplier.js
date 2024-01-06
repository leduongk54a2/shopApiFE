import ACTION_TYPES from "../action-types/supplier";

const initState = {
  listSupplier: [],
  loading: false,
};

/**
 * supplier
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function supplier(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_SUPPLIER_REQUEST:
    case ACTION_TYPES.SET_VISIBLE_SUPPLIER_REQUEST:
    case ACTION_TYPES.EDIT_INFO_SUPPLIER_REQUEST:
    case ACTION_TYPES.DELETE_SUPPLIER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTION_TYPES.GET_ALL_SUPPLIER_SUCCESS: {
      return {
        ...state,
        loading: false,
        listSupplier: action.data,
      };
    }
    case ACTION_TYPES.GET_ALL_SUPPLIER_FAIL:
    case ACTION_TYPES.SET_VISIBLE_SUPPLIER_SUCCESS:
    case ACTION_TYPES.SET_VISIBLE_SUPPLIER_FAIL:
    case ACTION_TYPES.EDIT_INFO_SUPPLIER_SUCCESS:
    case ACTION_TYPES.EDIT_INFO_SUPPLIER_FAIL:
    case ACTION_TYPES.DELETE_SUPPLIER_SUCCESS:
    case ACTION_TYPES.DELETE_SUPPLIER_FAIL: {
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

export default supplier;
