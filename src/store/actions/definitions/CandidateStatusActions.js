import axios from '../../../services/AxiosInstance';
import types from './CandidateStatusTypes';

export function getCandidateStatuses () {
  return (dispatch) => {
    dispatch({
      type: types.GET_CANDIDATE_STATUSES_PENDING,
    });

    axios.get('/CandidateStatus')
    .then((response) => {
      dispatch({
        type: types.GET_CANDIDATE_STATUSES_FULLFILLED,
        payload: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_CANDIDATE_STATUSES_REJECTED,
        payload: err.message,
      })
    });
  }
}