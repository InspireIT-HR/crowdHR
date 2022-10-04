import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import roles from './rolesSlice';
import genders from './gendersSlice';
import internalRecruiters from './internalRecruitersSlice';
import companies from './companiesSlice';

const reducer = combineReducers({
  users,
  roles,
  genders,
  internalRecruiters,
  companies
});

export default reducer;
