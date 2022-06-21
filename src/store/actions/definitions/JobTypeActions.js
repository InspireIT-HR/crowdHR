import axios from "../../../services/AxiosInstance";
import types from '../../types/JobTypeTypes';
import swal from 'sweetalert';

export function getJobTypes () {
  return (dispatch) => {
    dispatch({
      type: types.GET_JOB_TYPES_PENDING,
    });

    axios.get('/JobTypes')
    .then((response) => {
      dispatch({
        type: types.GET_JOB_TYPES_FULLFILLED,
        payload: response.data,
      });
    })
    .catch((err) => {
      swal({
        title: 'Fetch Error',
        text: err.message,
        icon: 'error',
      });

      dispatch({
        type: types.GET_JOB_TYPES_REJECTED,
        payload: err.message,
      });
    })
  }
}