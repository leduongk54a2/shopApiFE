import ACTION_TYPES from "../action-types/order";

const initState = {
  loading: false,
  listOrder: [],
};

/**
 * rating
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function order(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SAVE_ORDER_REQUEST:
    case ACTION_TYPES.GET_LIST_ORDER_REQUEST:
    case ACTION_TYPES.GET_STATISTIC_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTION_TYPES.GET_LIST_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        listOrder: action.data,
      };
    }
    case ACTION_TYPES.SAVE_ORDER_SUCCESS:
    case ACTION_TYPES.SAVE_ORDER_FAIL:
    case ACTION_TYPES.GET_LIST_ORDER_FAIL:
    case ACTION_TYPES.GET_STATISTIC_SUCCESS:
    case ACTION_TYPES.GET_STATISTIC_FAIL: {
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

export default order;
