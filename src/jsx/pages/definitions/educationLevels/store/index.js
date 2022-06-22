import { combineReducers } from '@reduxjs/toolkit';
import educationLevels from './educationLevelSlice';

const reducer = combineReducers({
  educationLevels,
});

export default reducer;
