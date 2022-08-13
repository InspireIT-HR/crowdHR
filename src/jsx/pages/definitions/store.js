import { combineReducers } from '@reduxjs/toolkit';
import attachmentType from "./attachmentTypes/attachmentTypeSlice";
import candidateStatus from "./candidates/candidateStatusSlice";
import candidateStage from './candidates/candidateStageSlice';
import candidateSkill from './candidates/candidateSkillSlice';
import candidateProgress from './candidates/candidateProgressSlice';
import currencyType from './currencyTypes/currenyTypeSlice';
import educationLevel from './educationLevels/educationLevelSlice';
import jobIndustry from './jobIndustries/jobIndustriesSlice';
import jobLocationCountry from './jobLocations/countriesSlice';
import jobLocationcity from './jobLocations/citiesSlice';
import jobSalaryType from './jobSalaryTypes/jobSalaryTypeSlice';
import jobStatus from './jobStatuses/jobStatusSlice';
import jobType from './jobTypes/jobTypeSlice';

const jobLocation = combineReducers({
  country: jobLocationCountry,
  city: jobLocationcity
});

const reducer = combineReducers({
  attachmentType,
  candidateStatus,
  candidateStage,
  candidateSkill,
  candidateProgress,
  currencyType,
  educationLevel,
  jobIndustry,
  jobLocation,
  jobSalaryType,
  jobStatus,
  jobType
});

export default reducer;
