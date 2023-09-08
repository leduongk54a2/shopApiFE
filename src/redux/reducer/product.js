import ACTION_TYPES from "../action-types/product";

const initState = {
  listProduct: [],
  loading: false,
  actionSearch: {
    keyword: null,
    categoryId: null,
    sortTypePrice: null,
  },
};

/**
 * product
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function product(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_PRODUCTS_REQUEST:
    case ACTION_TYPES.CREATE_PRODUCT_REQUEST: {
      return { ...state, loading: true };
    }
    case ACTION_TYPES.GET_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        listProduct: action.data.listProduct,
        actionSearch: action.data.actionSearch,
      };
    }
    case ACTION_TYPES.GET_ALL_PRODUCTS_FAIL:
    case ACTION_TYPES.CREATE_PRODUCT_SUCCESS:
    case ACTION_TYPES.CREATE_PRODUCT_FAIL: {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

export default product;
