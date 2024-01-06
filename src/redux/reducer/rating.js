import ACTION_TYPES from "../action-types/rating";

const initState = {
  loading: false,
};

/**
 * rating
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function rating(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_RATING_REQUEST:
    case ACTION_TYPES.GET_PREDICT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTION_TYPES.UPDATE_RATING_SUCCESS:
    case ACTION_TYPES.UPDATE_RATING_FAIL:
    case ACTION_TYPES.GET_PREDICT_SUCCESS:
    case ACTION_TYPES.GET_PREDICT_FAIL: {
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

export default rating;
