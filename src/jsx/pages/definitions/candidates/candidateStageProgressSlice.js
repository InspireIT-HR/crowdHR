import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../helpers/storeHelper';

export const getCandidateStageProgresses = () => (dispatch, getState) => {
  if (getState().definitions.candidateStageProgress.loading) {
    return;
  }

  dispatch(setCandidateStageProgressesLoading(true));

  axios.get('/CandidateStageProgresses')
  .then((response) => {
    dispatch(setCandidateStageProgresses(response.data));
    dispatch(setCandidateStageProgressesLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateStageProgressesLoading(false));
    showError(err.message);
  });
}

const candidateStageProgressAdapter = createEntityAdapter({});

export const {
  selectAll: selectCandidateStageProgresses,
  selectById: selectCandidateStageProgressById
} = candidateStageProgressAdapter.getSelectors(
  (state) => state.definitions.candidateStageProgress
);

const candidateStageProgressSlice = createSlice({
  name: 'definitions/candidateStageProgress',
  initialState: candidateStageProgressAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCandidateStageProgresses: candidateStageProgressAdapter.setAll,
    addCandidateStageProgress: candidateStageProgressAdapter.addOne,
    updateCandidateStageProgress: candidateStageProgressAdapter.upsertOne,
    removeCandidateStageProgress: candidateStageProgressAdapter.removeOne,
    setCandidateStageProgressesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCandidateStageProgresses,
  addCandidateStageProgress,
  updateCandidateStageProgress,
  removeCandidateStageProgress,
  setCandidateStageProgressesLoading,
} = candidateStageProgressSlice.actions;

export default candidateStageProgressSlice.reducer;
