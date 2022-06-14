import { getJobOpeningsService } from "../../services/JobService";
import {
  GET_JOBOPENINGS
} from './JobTypes';



export function getJobOpenings(history) {
  return (dispatch) => {
    getJobOpeningsService()
    .then((response) => {
      dispatch(getJobOpeningsAction(response.data));
      history.push('/job-list')
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
}

export function getJobOpeningsAction(data) {
  return {
      type: GET_JOBOPENINGS,
      payload: data,
  };
}