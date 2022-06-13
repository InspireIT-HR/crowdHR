import { getJobOpeningsService } from "../../services/JobService";

export const GET_JOBOPENINGS = 'Get Jobsopenings';

export function getJobOpeningsAction(data) {
  return {
      type: GET_JOBOPENINGS,
      payload: data,
  };
}
export function getJobOpenings() {
  return (dispatch) => {
    getJobOpeningsService()
    .then((response) => {
      dispatch(getJobOpeningsAction(response.data));
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
}