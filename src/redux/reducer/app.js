import ACTION_TYPES from "../action-types/app"

/**
 * app
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function app(state = {}, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.APP_SUCCESS:
    case ACTION_TYPES.APP_FAIL: {
      return { ...state, companies: action.data }
    }
    default: {
      return state
    }
  }
}

export default app