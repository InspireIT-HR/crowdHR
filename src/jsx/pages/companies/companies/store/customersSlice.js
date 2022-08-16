import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../../helpers/storeHelper';
import { getCustomerResponsibles } from './customerResponsiblesSlice';

export const getCustomers = () => (dispatch, getState) => {
  if (getState().customerApp.customers.loading) {
    return;
  }

  dispatch(setCustomersLoading(true));

  axios.get('/Customers')
  .then((response) => {
    dispatch(setCustomers(response.data));
    response.data.forEach((customer) => {
      dispatch(getCustomerResponsibles(customer.id));
    })
    dispatch(setCustomersLoading(false));
  })
  .catch((err) => {
    dispatch(setCustomersLoading(false));
    showError(err.message);
  });
}

const customersAdapter = createEntityAdapter({});

export const {
  selectAll: selectCustomers,
  selectById: selectCustomerById,
} = customersAdapter.getSelectors(
  (state) => state.customerApp.customers
);

const customersSlice = createSlice({
  name: 'customerApp/customers',
  initialState: customersAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCustomers: customersAdapter.setAll,
    addCustomer: customersAdapter.addOne,
    updateCustomer: customersAdapter.upsertOne,
    removeCustomer: customersAdapter.removeOne,
    setCustomersLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer,
  setCustomersLoading,
} = customersSlice.actions;

export default customersSlice.reducer;
