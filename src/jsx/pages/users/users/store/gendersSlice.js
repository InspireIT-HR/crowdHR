import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../../helpers/storeHelper';

export const getGenders = () => (dispatch, getState) => {
  if (getState().userApp.genders.loading) {
    return;
  }

  dispatch(setGendersLoading(true));

  axios.get('/Genders')
  .then((response) => {
    dispatch(setGenders(response.data));
    dispatch(setGendersLoading(false));
  })
  .catch((err) => {
    dispatch(setGendersLoading(false));
    showError(err.message);
  });
}

export const addGenderRequest = (data) => (dispatch, getState) => {
  if (getState().userApp.genders.loading) {
    return;
  }

  dispatch(setGendersLoading(true));

  axios.post('/Genders', data)
  .then((response) => {
    dispatch(addGender(response.data));
    dispatch(setGendersLoading(false));
  })
  .catch((err) => {
    dispatch(setGendersLoading(false));
    showError(err.message);
  });
}

export const updateGenderRequest = (data) => (dispatch, getState) => {
  if (getState().userApp.genders.loading) {
    return;
  }

  dispatch(setGendersLoading(true));

  axios.put('/Genders', data)
  .then((response) => {
    dispatch(updateGender(response.data));
    dispatch(setGendersLoading(false));
  })
  .catch((err) => {
    dispatch(setGendersLoading(false));
    showError(err.message);
  });
}

export const removeGenderRequest = (data) => (dispatch, getState) => {
  if (getState().userApp.genders.loading) {
    return;
  }

  dispatch(setGendersLoading(true));

  axios.delete(`/Genders/${data}`)
  .then((response) => {
    dispatch(removeGender(data));
    dispatch(setGendersLoading(false));
  })
  .catch((err) => {
    dispatch(setGendersLoading(false));
    showError(err.message);
  });
}

const gendersAdapter = createEntityAdapter({});

export const {
  selectAll: selectGenders,
  selectById: selectGenderById,
} = gendersAdapter.getSelectors(
  (state) => state.userApp.genders
);

const gendersSlice = createSlice({
  name: 'userApp/genders',
  initialState: gendersAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setGenders: gendersAdapter.setAll,
    addGender: gendersAdapter.addOne,
    updateGender: gendersAdapter.upsertOne,
    removeGender: gendersAdapter.removeOne,
    setGendersLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setGenders,
  addGender,
  updateGender,
  removeGender,
  setGendersLoading
} = gendersSlice.actions;

export default gendersSlice.reducer;
