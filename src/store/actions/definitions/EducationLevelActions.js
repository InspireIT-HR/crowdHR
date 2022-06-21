import axios from '../../../services/AxiosInstance';
import types from '../../types/EducationLevelTypes';
import swal from 'sweetalert';

export function getEducationLevels () {
  return (dispatch) => {
    dispatch({
      type: types.GET_EDUCATION_LEVELS_PENDING,
    });

    axios.get('/EducationLevels')
    .then((response) => {
      dispatch({
        type: types.GET_EDUCATION_LEVELS_FULLFILLED,
        payload: response.data,
      });
    })
    .catch((err) => {
      swal({
        title: 'Fetch Error',
        text: err.message,
        icon: 'error'
      });

      dispatch({
        type: types.GET_EDUCATION_LEVELS_REJECTED,
        payload: err.message,
      });
    })
  }
}