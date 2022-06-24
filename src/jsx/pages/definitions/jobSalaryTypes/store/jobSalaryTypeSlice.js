import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getJobSalaryTypes = () => (dispatch, getState) => {
  if (getState().jobSalaryTypeApp.jobSalaryTypes.loading) {
    return;
  }

  dispatch(setJobSalaryTypesLoading(true));

  axios.get('/SalaryTypes')
  .then((response) => {
    dispatch(setJobSalaryTypes(response.data));
    dispatch(setJobSalaryTypesLoading(false));
  })
  .catch((err) => {
    dispatch(setJobSalaryTypesLoading(false));
    showError(err.message);
  });
}

const jobSalaryTypesAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobSalaryTypes,
  selectById: selectJobSalaryTypeById,
} = jobSalaryTypesAdapter.getSelectors(
  (state) => state.jobSalaryTypeApp.jobSalaryTypes
);

const initialState = {
  loading: false,
};

const jobSalaryTypesSlice = createSlice({
  name: 'jobSalaryTypeApp/jobSalaryTypes',
  initialState: jobSalaryTypesAdapter.getInitialState(initialState),
  reducers: {
    setJobSalaryTypes: jobSalaryTypesAdapter.setAll,
    addJobSalaryType: jobSalaryTypesAdapter.addOne,
    updateJobSalaryType: jobSalaryTypesAdapter.upsertOne,
    removeJobSalaryType: jobSalaryTypesAdapter.removeOne,
    setJobSalaryTypesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setJobSalaryTypes,
  addJobSalaryType,
  updateJobSalaryType,
  removeJobSalaryType,
  setJobSalaryTypesLoading,
} = jobSalaryTypesSlice.actions;

export default jobSalaryTypesSlice.reducer;
