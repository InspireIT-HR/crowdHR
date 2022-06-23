import { combineReducers } from '@reduxjs/toolkit';
import jobIndustries from './jobIndustriesSlice';

const reducer = combineReducers({
  jobIndustries,
});

export default reducer;
