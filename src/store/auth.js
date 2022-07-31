import { createSlice } from '@reduxjs/toolkit';
import axios from '../services/axios';
import swal from 'sweetalert';

const roles = {
  1: 'ADMIN',
  2: 'EXTERNAL_USER',
  3: 'INTERNAL_RECRUITER',
  5: 'CUSTOMER_USER'
}

const permissions = {
  ADMIN: {
    definitions: {},
  },
  EXTERNAL_USER: {

  },
  INTERNAL_RECRUITER: {
    
  },
  CUSTOMER: {

  }
}

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
  permissions: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        ...action.payload,
        role: roles[action.payload.roleId]
      };
      state.isAuthenticated = true;
      state.permissions = permissions[state.user.role];
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
