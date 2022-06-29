import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const addNew = () => (dispatch, getState) => {
  if (getState().jobOpeningApp.jobOpenings.loading) {
    return;
  }
  
  dispatch(setJobOpeningsLoading(true));

  axios.get('/JobOpenings')
  .then((response) => {
    dispatch(setJobOpenings(response.data));
    dispatch(setJobOpeningsLoading(false));
  })
  .catch((err) => {
    dispatch(setJobOpeningsLoading(false));
    showError(err.message);
  });
}

const jobOpeningsAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobOpenings,
  selectById: selectJobOpeningById,
} = jobOpeningsAdapter.getSelectors(
  (state) => state.jobOpeningApp.jobOpenings
);

const initialState = {
  loading: false,
};

const jobOpeningsSlice = createSlice({
  name: 'jobOpeningApp/jobOpenings',
  initialState: jobOpeningsAdapter.getInitialState(initialState),
  reducers: {
    setJobOpenings: jobOpeningsAdapter.setAll,
    addJobOpening: jobOpeningsAdapter.addOne,
    updateJobOpening: jobOpeningsAdapter.upsertOne,
    removeJobOpening: jobOpeningsAdapter.removeOne,
    setJobOpeningsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setJobOpenings,
  addJobOpening,
  updateJobOpening,
  removeJobOpening,
  setJobOpeningsLoading,
} = jobOpeningsSlice.actions;

export default jobOpeningsSlice.reducer;
