import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../helpers/storeHelper';

export const getCandidateSkills = () => (dispatch, getState) => {
  if (getState().definitions.candidateSkill.loading) {
    return;
  }

  dispatch(setCandidateSkillsLoading(true));

  axios.get('/CandidateSkills')
  .then((response) => {
    dispatch(setCandidateSkills(response.data));
    dispatch(setCandidateSkillsLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateSkillsLoading(false));
    showError(err.message);
  });
}

const candidateSkillAdapter = createEntityAdapter({});

export const {
  selectAll: selectCandidateSkills,
  selectById: selectCandidateSkillById
} = candidateSkillAdapter.getSelectors(
  (state) => state.definitions.candidateSkill
);

const candidateSkillSlice = createSlice({
  name: 'definitions/candidateSkill',
  initialState: candidateSkillAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCandidateSkills: candidateSkillAdapter.setAll,
    addCandidateSkill: candidateSkillAdapter.addOne,
    updateCandidateSkill: candidateSkillAdapter.upsertOne,
    removeCandidateSkill: candidateSkillAdapter.removeOne,
    setCandidateSkillsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCandidateSkills,
  addCandidateSkill,
  updateCandidateSkill,
  removeCandidateSkill,
  setCandidateSkillsLoading
} = candidateSkillSlice.actions;

export default candidateSkillSlice.reducer;
