import { combineReducers } from '@reduxjs/toolkit';
import jobStatuses from './jobStatusSlice';

const reducer = combineReducers({
  jobStatuses,
});

export default reducer;
