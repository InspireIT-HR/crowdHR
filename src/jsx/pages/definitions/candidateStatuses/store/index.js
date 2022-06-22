import { combineReducers } from '@reduxjs/toolkit';
import candidateStatuses from './candidateStatusSlice';

const reducer = combineReducers({
  candidateStatuses,
});

export default reducer;
