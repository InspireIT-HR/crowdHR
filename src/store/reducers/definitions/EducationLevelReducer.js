import types from '../../actions/definitions/EducationLevelTypes';

const initialState = {
  items: [],
  loading: false,
  error: '',
};

export function EducationLevelReducer (state = initialState, action) {
  switch (action.type) {
    case types.GET_EDUCATION_LEVELS_PENDING:
      return {
        ...state,
        items: [],
        loading: true,
        error: '',
      };
    case types.GET_EDUCATION_LEVELS_FULLFILLED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: '',
      };
    case types.GET_EDUCATION_LEVELS_REJECTED:
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