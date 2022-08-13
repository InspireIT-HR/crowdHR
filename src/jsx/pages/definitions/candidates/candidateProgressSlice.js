import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../helpers/storeHelper';

export const getCandidateProgresses = () => (dispatch, getState) => {
  if (getState().definitions.candidateProgress.loading) {
    return;
  }

  dispatch(setCandidateProgressesLoading(true));

  axios.get('/CandidateProgresses')
  .then((response) => {
    dispatch(setCandidateProgresses(response.data));
    dispatch(setCandidateProgressesLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateProgressesLoading(false));
    showError(err.message);
  });
};

const candidateProgressesAdapter = createEntityAdapter({
  selectId: (progress) => `${progress.candidateId}-${progress.progressPct}-${progress.stageId}`
});

export const {
  selectAll: selectCandidateProgresses,
  selectById: selectCandidateProgressById
} = candidateProgressesAdapter.getSelectors(
  (state) => state.definitions.candidateProgress
);

const candidateProgressSlice = createSlice({
  name: 'definitions/candidateProgress',
  initialState: candidateProgressesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCandidateProgresses: candidateProgressesAdapter.setAll,
    addCandidateProgress: candidateProgressesAdapter.addOne,
    updateCandidateProgress: candidateProgressesAdapter.upsertOne,
    removeCandidateProgress: candidateProgressesAdapter.removeOne,
    setCandidateProgressesLoading: (state, action) => {
      state.loading = action.payload;
    },
  }
});

export const {
  setCandidateProgresses,
  addCandidateProgress,
  updateCandidateProgress,
  removeCandidateProgress,
  setCandidateProgressesLoading
} = candidateProgressSlice.actions;

export default candidateProgressSlice.reducer;
