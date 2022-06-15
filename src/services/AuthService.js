import axios from 'axios';
import swal from "sweetalert";
import axiosInstance from './AxiosInstance';
import {
  loginConfirmedAction,
  logout,
} from '../store/actions/AuthActions';

export function signUp(email, password) {
  //axios call
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
    postData,
  );
}

export function login(email, password) {
  return axiosInstance.get('/Users', {
    params: {
      username: email,
      password
    }
  });
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case 'EMAIL_EXISTS':
      //return 'Email already exists';
      swal("Oops", "Email already exists", "error");
      break;
    case 'EMAIL_NOT_FOUND':
      //return 'Email not found';
      swal("Oops", "Email not found", "error",{ button: "Try Again!",});
      break;
    case 'INVALID_PASSWORD':
      //return 'Invalid Password';
      swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
      break;
    case 'USER_DISABLED':
      return 'User Disabled';

    default:
      return '';
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem('token', tokenDetails);
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem('token');
  let tokenDetails = '';
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = atob(tokenDetailsString);

  const [email, password] = tokenDetails.split(':');
  login(email, password)
  .then((response) => {
    if (response.data) {
      dispatch(loginConfirmedAction(response.data));
      history.push('/dashboard');
    } else {
      dispatch(logout(history));
    }
  })
  .catch((err) => {
    console.log(err);
    history.push('/login');
  });
}
