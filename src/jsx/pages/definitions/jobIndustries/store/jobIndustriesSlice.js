import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getJobIndustries = () => (dispatch, getState) => {
  if (getState().jobIndustryApp.jobIndustries.loading) {
    return;
  }

  dispatch(setJobIndustriesLoading(true));

  axios.get('/Industries')
  .then((response) => {
    dispatch(setJobIndustries(response.data));
    dispatch(setJobIndustriesLoading(false));
  })
  .catch((err) => {
    dispatch(setJobIndustriesLoading(false));
    showError(err.mesage);
  });
}

const jobIndustriesAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobIndustries,
  selectById: selectJobIndustryById,
} = jobIndustriesAdapter.getSelectors(
  (state) => state.jobIndustryApp.jobIndustries
);

const initialState = {
  loading: false,
};

const jobIndustriesSlice = createSlice({
  name: 'jobIndustryApp/jobIndustries',
  initialState: jobIndustriesAdapter.getInitialState(initialState),
  reducers: {
    setJobIndustries: jobIndustriesAdapter.setAll,
    addJobIndustry: jobIndustriesAdapter.addOne,
    updateJobIndustry: jobIndustriesAdapter.upsertOne,
    removeJobIndustry: jobIndustriesAdapter.removeOne,
    setJobIndustriesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setJobIndustries,
  addJobIndustry,
  updateJobIndustry,
  removeJobIndustry,
  setJobIndustriesLoading,
} = jobIndustriesSlice.actions;

export default jobIndustriesSlice.reducer;
