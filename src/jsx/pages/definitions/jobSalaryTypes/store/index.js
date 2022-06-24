import { combineReducers } from '@reduxjs/toolkit';
import jobSalaryTypes from './jobSalaryTypeSlice';

const reducer = combineReducers({
  jobSalaryTypes,
});

export default reducer;
