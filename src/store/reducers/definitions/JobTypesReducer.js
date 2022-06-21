import types from '../../types/JobTypeTypes';

const initialState = {
  items: [],
  loading: false,
  error: '',
};

export function JobTypeReducer (state = initialState, action) {
  switch (action.type) {
    case types.GET_JOB_TYPES_PENDING:
      return {
        ...state,
        items: [],
        loading: true,
        error: '',
      };
    case types.GET_JOB_TYPES_FULLFILLED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: '',
      };
    case types.GET_JOB_TYPES_REJECTED:
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}