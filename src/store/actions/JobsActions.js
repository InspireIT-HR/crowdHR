import { getJobOpeningsService } from "../../services/JobService";

export function getJobOpenings() {
  return (dispatch) => {
    getJobOpeningsService()
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
}