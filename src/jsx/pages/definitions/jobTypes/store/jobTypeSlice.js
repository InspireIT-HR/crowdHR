import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getJobTypes = () => (dispatch, getState) => {
  if (getState().jobTypeApp.jobTypes.loading) {
    return;
  }
  
  dispatch(setJobTypesLoading(true));

  axios.get('/JobTypes')
  .then((response) => {
    dispatch(setJobTypes(response.data));
    dispatch(setJobTypesLoading(false));
  })
  .catch((err) => {
    setJobTypesLoading(false);
    showError(err.message);
  });
}

const jobTypesAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobTypes,
  selectById: selectJobTypeById,
} = jobTypesAdapter.getSelectors(
  (state) => state.jobTypeApp.jobTypes
);

const initialState = {
  loading: false,
};

const jobTypeSlice = createSlice({
  name: 'jobTypeApp/jobTypes',
  initialState: jobTypesAdapter.getInitialState(initialState),
  reducers: {
    setJobTypes: jobTypesAdapter.setAll,
    addJobType: jobTypesAdapter.addOne,
    updateJobType: jobTypesAdapter.upsertOne,
    removeJobType: jobTypesAdapter.removeOne,
    setJobTypesLoading: (state, action) => { 
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setJobTypes,
  addJobType,
  updateJobType,
  removeJobType,
  setJobTypesLoading,
} = jobTypeSlice.actions;

export default jobTypeSlice.reducer;
