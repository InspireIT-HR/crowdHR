import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getInternalRecruiters = () => (dispatch, getState) => {
  if (getState().userApp.internalRecruiters.loading) {
    return;
  }

  dispatch(setInternalRecruitersLoading(true));

  axios.get('/Users/getInternalRecruiters')
  .then((response) => {
    dispatch(setInternalRecruiters(response.data));
    dispatch(setInternalRecruitersLoading(false));
  })
  .catch((err) => {
    dispatch(setInternalRecruitersLoading(false));
    showError(err.message);
  });
}

const internalRecruitersAdapter = createEntityAdapter({});

export const {
  selectAll: selectInternalRecruiters,
  selectById: selectInternalRecruiterById,
} = internalRecruitersAdapter.getSelectors(
  (state) => state.userApp.internalRecruiters
);

const initialState = {
  loading: false,
};

const internalRecruitersSlice = createSlice({
  name: 'usersApp/internalRecruiters',
  initialState: internalRecruitersAdapter.getInitialState(initialState),
  reducers: {
    setInternalRecruiters: internalRecruitersAdapter.setAll,
    setInternalRecruitersLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setInternalRecruiters,
  setInternalRecruitersLoading,
} = internalRecruitersSlice.actions;

export default internalRecruitersSlice.reducer;
