import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getCustomerResponsibles = (customerId) => (dispatch, getState) => {
  if (Object.keys(getState().customerApp.customerResponsibles).includes('' + customerId)) {
    return;
  }

  dispatch(setCustomerResponsibles({
    customerId,
    responsibles: [],
  }));

  axios.get(`/Users/Responsible/${customerId}`)
  .then((response) => {
    dispatch(setCustomerResponsibles({
      customerId,
      responsibles: response.data
    }));
  })
  .catch((err) => {
    showError(err.message);
  });
}

const initialState = {}

const customerResponsiblesSlice = createSlice({
  name: 'customerApp/customerResponsibles',
  initialState,
  reducers: {
    setCustomerResponsibles: (state, action) => {
      const data = action.payload;
      state[data.customerId] = data.responsibles;
    }
  },
  extraReducers: {},
});

export const {
  setCustomerResponsibles,
} = customerResponsiblesSlice.actions;

export default customerResponsiblesSlice.reducer;
