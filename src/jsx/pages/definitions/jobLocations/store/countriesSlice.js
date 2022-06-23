import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getCountries = () => (dispatch, getState) => {
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

const countriesAdapter = createEntityAdapter({});

export const {
  selectAll: selectCountries,
  selectById: selectCountryById,
} = countriesAdapter.getSelectors(
  (state) => state.jobLocationApp.countries
);

const initialState = {
  loading: false,
};

const countriesSlice = createSlice({
  name: 'jobLocationApp/countries',
  initialState: countriesAdapter.getInitialState(initialState),
  reducers: {
    setCountries: countriesAdapter.setAll,
    addCountry: countriesAdapter.addOne,
    updateCountry: countriesAdapter.addOne,
    removeCountry: countriesAdapter.removeOne,
    setCountriesLoading: (state, action) => {
      state.loading = action.payload;
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
} = countriesSlice.actions;

export default countriesSlice.reducer;
