import { combineReducers } from '@reduxjs/toolkit';
import jobOpenings from './jobOpeningSlice';

const reducer = combineReducers({
  jobOpenings,
});

export default reducer;
