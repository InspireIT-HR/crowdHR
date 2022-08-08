import { combineReducers } from '@reduxjs/toolkit';
import customers from './customersSlice';
import customerResponsibles from './customerResponsiblesSlice';

const reducer = combineReducers({
  customers,
  customerResponsibles,
});

export default reducer;
