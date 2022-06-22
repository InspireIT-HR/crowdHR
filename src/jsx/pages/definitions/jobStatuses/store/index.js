import { combineReducers } from '@reduxjs/toolkit';
import jobStatus from './jobStatusSlice';

const reducer = combineReducers({
  jobStatus,
});

export default reducer;
