import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../helpers/storeHelper';

export const getCandidateStages = () => (dispatch, getState) => {
  if (getState().definitions.candidateStage.loading) {
    return;
  }

  dispatch(setCandidateStagesLoading(true));

  axios.get('/CandidateStages')
  .then((response) => {
    dispatch(setCandidateStages(response.data));
    dispatch(setCandidateStagesLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateStagesLoading(false));
    showError(err.message);
  });
}

export const updateCandidateStageRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.candidateStage.loading) {
    return;
  }

  dispatch(setCandidateStagesLoading(true));

  axios.put('/CandidateStages', data)
  .then((response) => {
    dispatch(updateCandidateStage(response.data));
    dispatch(setCandidateStagesLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateStagesLoading(false));
    showError(err.message);
  });
}

export const updateCandidateStageWithStatusRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.candidateStage.loading) {
    return;
  }

  dispatch(setCandidateStagesLoading(true));

  axios.put('/CandidateStages/UpdateWithCandidateStatus', data)
  .then((response) => {
    // dispatch(updateCandidateStage(response.data));
    dispatch(setCandidateStagesLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateStagesLoading(false));
    showError(err.message);
  });
}

const candidateStagesAdapter = createEntityAdapter({});

export const {
  selectAll: selectCandidateStages,
  selectById: selectCandidateStageById
} = candidateStagesAdapter.getSelectors(
  (state) => state.definitions.candidateStage
);

const candidateStageSlice = createSlice({
  name: 'definitions/candidateStage',
  initialState: candidateStagesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCandidateStages: candidateStagesAdapter.setAll,
    addCandidateStage: candidateStagesAdapter.addOne,
    updateCandidateStage: candidateStagesAdapter.upsertOne,
    removeCandidateStage: candidateStagesAdapter.removeOne,
    setCandidateStagesLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setCandidateStages,
  addCandidateStage,
  updateCandidateStage,
  removeCandidateStage,
  setCandidateStagesLoading
} = candidateStageSlice.actions;

export default candidateStageSlice.reducer;
