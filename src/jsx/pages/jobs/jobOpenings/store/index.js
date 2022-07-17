import { combineReducers } from '@reduxjs/toolkit';
import {jobOpenings} from './jobOpeningSlice';
import {dropdowns} from './dropdownsSlice';


const reducer = combineReducers({
  jobOpenings,
  dropdowns
});

export default reducer;
