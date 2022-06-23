import { combineReducers } from '@reduxjs/toolkit';
import cities from './citiesSlice';
import countries from './countriesSlice';

const reducer = combineReducers({
  countries,
  cities,
});

export default reducer;
