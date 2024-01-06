import ACTION_TYPES from "../action-types/cart";

const initState = {
  loading: false,
  listCartItem: [],
  total: 0,
};

/**
 * cart
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function cart(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_OR_UPDATE_CART_REQUEST:
    case ACTION_TYPES.GET_CART_INFO_REQUEST:
    case ACTION_TYPES.UPDATE_QUANTITY_CART_ITEM_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTION_TYPES.GET_CART_INFO_SUCCESS: {
      return {
        ...state,
        listCartItem: [...action.data.listCartItem],
        total: action.data.total,
        loading: false,
      };
    }
    case ACTION_TYPES.CREATE_OR_UPDATE_CART_SUCCESS: {
      return {
        ...state,
        listCartItem: [...action.data.listCartItem],
        total: action.data.total,
        loading: false,
      };
    }
    case ACTION_TYPES.CREATE_OR_UPDATE_CART_FAIL:
    case ACTION_TYPES.GET_CART_INFO_FAIL:
    case ACTION_TYPES.UPDATE_QUANTITY_CART_ITEM_SUCCESS:
    case ACTION_TYPES.UPDATE_QUANTITY_CART_ITEM_FAIL: {
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

export default cart;
