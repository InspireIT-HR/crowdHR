import axios from '../services/AxiosInstance';
import swal from 'sweetalert';

export function getJobOpeningsService() {
  return axios.get('/JobOpenings');
}