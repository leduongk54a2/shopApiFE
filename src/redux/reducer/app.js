import ACTION_TYPES from "../action-types/app";

const initState = {
  userInfo: {},
  loading: false,
};

/**
 * app
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function app(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.APP_REQUEST: {
      return { ...state, loading: true };
    }
    case ACTION_TYPES.APP_SUCCESS:
    case ACTION_TYPES.APP_FAIL: {
      return { ...state, loading: false };
    }
    case ACTION_TYPES.LOGIN_SUCCESS:
      return { ...state, userInfo: action.data.user, loading: false };
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return { ...state, userInfo: {}, loading: false };
    default: {
      return state;
    }
  }
}

export default app;
