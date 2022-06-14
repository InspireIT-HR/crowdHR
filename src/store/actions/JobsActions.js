import { getJobOpeningsService } from "../../services/JobService";

export const GET_JOBOPENINGS = 'Get Jobopenings';


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