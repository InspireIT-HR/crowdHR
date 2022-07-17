import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import internalRecruiters from './internalRecruitersSlice';

const reducer = combineReducers({
  users,
  internalRecruiters,
});

export default reducer;
