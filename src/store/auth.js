import { createSlice } from '@reduxjs/toolkit';
import axios from '../services/axios';
import swal from 'sweetalert';

export function generateBasicAuth(email, password) {
  return btoa(`${email}:${password}`);
}

export const checkAutoLogin = (history) => (dispatch, getState) => {
  const tokenBase64 = localStorage.getItem('token');

  if (!tokenBase64) {
    dispatch(logoutUser(history));
    history.push('/login');
    return;
  }

  const tokenDetails = atob(tokenBase64);

  const [email, password] = tokenDetails.split(':');

  dispatch(setIsAuthenticating(true));

  axios.get('/Users', {
    params: {
      username: email,
      password
    }
  })
  .then((response) => {
    if (response.data) {
      dispatch(setUser(response.data));
      dispatch(setIsAuthenticating(false));
      history.push('/dashboard');
    } else {
      dispatch(logoutUser());
      history.push('/login');
    }
  })
  .catch((err) => {
    console.log(err.message);
    dispatch(logoutUser());
    history.push('/login');
  })
}

export const login = (data, history) => (dispatch, getState) => {
  const { email, password } = data;

  dispatch(setIsAuthenticating(true));

  axios.get('/Users', {
    params: {
      username: email,
      password
    }
  })
  .then((response) => {
    if (response.data) {
      localStorage.setItem('token', generateBasicAuth(email, password));
      dispatch(setUser(response.data));
      dispatch(setIsAuthenticating(false));
      history.push('/dashboard');
    } else {
      dispatch(logoutUser());
      swal({
        title: 'Login Error',
        text: 'Email or password is wwrong',
        icon: 'error',
      });
    }
  })
  .catch((err) => {
    console.log(err.message);
    dispatch(logoutUser());
    swal({
      title: 'Login Error',
      text: 'Email or password is wwrong',
      icon: 'error',
    });
  });
}

export const logout = () => (dispatch, getState) => {
  dispatch(logoutUser());
  localStorage.removeItem('token');
  window.location.reload();
} 

const initialState = {
  isAuthenticated: false,
  user: {},
  isAuthenticating: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state, action) => initialState,
    setIsAuthenticating: (state, action) => {
      state.isAuthenticating = action.payload;
    },
  },
  extraReducers: {},
});

export const { setUser, logoutUser, setIsAuthenticating } = 
  authSlice.actions;

export default authSlice.reducer;
