import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import roles from './rolesSlice';
import genders from './gendersSlice';
import internalRecruiters from './internalRecruitersSlice';

const reducer = combineReducers({
  users,
  roles,
  genders,
  internalRecruiters,
});

export default reducer;
