import { combineReducers } from '@reduxjs/toolkit';
import newJob from './newJobSlice';

const reducer = combineReducers({
    newJob,
});

export default reducer;
