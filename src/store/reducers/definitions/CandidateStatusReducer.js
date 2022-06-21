import types from '../../types/CandidateStatusTypes';

const initialState = {
  items: [],
  loading: false,
  error: '',
};

export function CandidateStatusReducer (state = initialState, action) {
  switch (action.type) {
    case types.GET_CANDIDATE_STATUSES_PENDING:
      return {
        ...state,
        items: [],
        loading: true,
        error: '',
      };
    case types.GET_CANDIDATE_STATUSES_FULLFILLED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: '',
      };
    case types.GET_CANDIDATE_STATUSES_REJECTED:
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}