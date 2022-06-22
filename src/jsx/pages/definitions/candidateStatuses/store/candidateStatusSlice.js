import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import swal from 'sweetalert';

export const getCandidateStatuses = () => (dispatch, getState) => {
  dispatch(setCandidateStatusesLoading(true));

  axios.get('/CandidateStatus')
  .then((response) => {
    dispatch(setCandidateStatuses(response.data));
    dispatch(setCandidateStatusesLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateStatusesLoading(false));
    console.log(err.message);
    swal({
      title: 'Fetch Error',
      text: err.message,
      icon: 'error',
    });
  });
}

const candidateStatusesAdapter = createEntityAdapter({});

export const { 
  selectAll: selectCandidateStatuses, 
  selectById: selectCandidateStatusById 
} = candidateStatusesAdapter.getSelectors(
  (state) => state.candidateStatusApp.candidateStatuses
);

const initialState = {
  loading: false,
};

const candidateStatusSlice = createSlice({
  name: 'candidateStatusApp/candidateStatuses',
  initialState: candidateStatusesAdapter.getInitialState(initialState),
  reducers: {
    setCandidateStatuses: candidateStatusesAdapter.setAll,
    addCandidateStatus: candidateStatusesAdapter.addOne,
    updateCandidateStatus: candidateStatusesAdapter.upsertOne,
    removeCandidateStatus: candidateStatusesAdapter.removeOne,
    setCandidateStatusesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCandidateStatuses,
  addCandidateStatus,
  updateCandidateStatus,
  removeCandidateStatus,
  setCandidateStatusesLoading,
} = candidateStatusSlice.actions;

export default candidateStatusSlice.reducer;