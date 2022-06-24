import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getJobStatuses = () => (dispatch, getState) => {
  if (getState().jobStatusApp.jobStatuses.loading) {
    return;
  }
  
  dispatch(setJobOpeningsLoading(true));
  
  axios.get('/JobStatus')
  .then((response) => {
    dispatch(setJobStatuses(response.data));
    dispatch(setJobOpeningsLoading(false));
  })
  .catch((err) => {
    dispatch(setJobOpeningsLoading(false));
    showError(err.message);
  });
}

const jobStatusesAdapter = createEntityAdapter({});

export const { 
  selectAll: selectJobStatuses, 
  selectById: selectJobStatusesById 
} = jobStatusesAdapter.getSelectors(
  (state) => state.jobStatusApp.jobStatuses
);

const initialState = {
  loading: false,
};

const JobStatusSlice = createSlice({
  name: 'jobStatusApp/jobStatuses',
  initialState: jobStatusesAdapter.getInitialState(initialState),
  reducers: {
    setJobStatuses: jobStatusesAdapter.setAll,
    addJobStatus: jobStatusesAdapter.addOne,
    updateJobStatus: jobStatusesAdapter.upsertOne,
    removeJobStatus: jobStatusesAdapter.removeOne,
    setJobOpeningsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {}
});

export const { 
  setJobStatuses, 
  addJobStatus, 
  updateJobStatus, 
  removeJobStatus,
  setJobOpeningsLoading, 
} = JobStatusSlice.actions;

export default JobStatusSlice.reducer;
