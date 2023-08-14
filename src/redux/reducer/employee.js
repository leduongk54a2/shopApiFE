import ACTION_TYPES from "../action-types/employee";

const initState = {
  listEmployee: [],
  loading: false,
};

/**
 * employee
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function employee(state = initState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_EMPLOYEE_REQUEST:
    case ACTION_TYPES.ADD_EMPLOYEE_REQUEST: {
      return { ...state, loading: true };
    }
    case ACTION_TYPES.GET_ALL_EMPLOYEE_SUCCESS: {
      return { ...state, loading: false, listEmployee: action.data };
    }
    case ACTION_TYPES.GET_ALL_EMPLOYEE_FAIL:
    case ACTION_TYPES.ADD_EMPLOYEE_SUCCESS:
    case ACTION_TYPES.ADD_EMPLOYEE_FAIL: {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

export default employee;
