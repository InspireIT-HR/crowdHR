import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState, openEditModalData, openNewModalData } from '../../../helpers/storeHelper';

export const getCountries = () => (dispatch, getState) => {
  if (getState().definitions.jobLocation.country.loading) {
    return;
  }

  dispatch(setCountriesLoading(true));

  axios.get('/Countries')
  .then((response) => {
    dispatch(setCountries(response.data));
    dispatch(setCountriesLoading(false));
  })
  .catch((err) => {
    dispatch(setCountriesLoading(false));
    showError(err.message);
  });
}

export const addCountryRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobLocation.country.isSubmitting) {
    return;
  }

  dispatch(setIsCountrySubmitting(true));

  axios.post('/Countries', data)
  .then((response) => {
    dispatch(addCountry(response.data));
    dispatch(setIsCountrySubmitting(false));
    dispatch(closeCountryModal());
  })
  .catch((err) => {
    dispatch(setIsCountrySubmitting(false));
    showError(err.message);
  });
}

export const updateCountryRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobLocation.country.isSubmitting) {
    return;
  }

  dispatch(setIsCountrySubmitting(true));

  axios.put('/Countries', data)
  .then((response) => {
    dispatch(updateCountry(response.data));
    dispatch(setIsCountrySubmitting(false));
    dispatch(closeCountryModal());
  })
  .catch((err) => {
    dispatch(setIsCountrySubmitting(false));
    showError(err.message);
  });
}

export const removeCountryRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobLocation.country.isSubmitting) {
    return;
  }

  dispatch(setIsCountrySubmitting(true));

  axios.delete(`/Countries/${data}`)
  .then((response) => {
    dispatch(removeCountry(data));
    dispatch(setIsCountrySubmitting(false));
    dispatch(closeCountryModal());
  })
  .catch((err) => {
    dispatch(setIsCountrySubmitting(false));
    showError(err.message);
  });
}

const countriesAdapter = createEntityAdapter({});

export const {
  selectAll: selectCountries,
  selectById: selectCountryById,
} = countriesAdapter.getSelectors(
  (state) => state.definitions.jobLocation.country
);

const countriesSlice = createSlice({
  name: 'definitions/jobLocation/country',
  initialState: countriesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCountries: countriesAdapter.setAll,
    addCountry: countriesAdapter.addOne,
    updateCountry: countriesAdapter.addOne,
    removeCountry: countriesAdapter.removeOne,
    setCountriesLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewCountryModal: (state, action) => {
      state.modal = openNewModalData;
    },
    openEditCountryModal: (state, action) => {
      state.modal = openEditModalData(action.payload);
    },
    closeCountryModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
    },
    setIsCountrySubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCountries,
  addCountry,
  updateCountry,
  removeCountry,
  setCountriesLoading,
  openNewCountryModal,
  openEditCountryModal,
  closeCountryModal,
  setIsCountrySubmitting,
} = countriesSlice.actions;

export default countriesSlice.reducer;
