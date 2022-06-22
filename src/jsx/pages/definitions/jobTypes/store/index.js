import { combineReducers } from '@reduxjs/toolkit';
import jobTypes from './jobTypeSlice';

const reducer = combineReducers({
  jobTypes,
});

export default reducer;
