import { combineReducers } from '@reduxjs/toolkit';
import jobCandidate from './JobCandidates/jobCandidateSlice';
import companyList from './JobCandidates/companySlice'

const reducer = combineReducers({
    jobCandidate,
    companyList
});

export default reducer;