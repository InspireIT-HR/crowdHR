import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getCities = () => (dispatch, getState) => {
  dispatch(setCitiesLoading(true));

  axios.get('/Cities')
  .then((response) => {
    dispatch(setCities(response.data));
    dispatch(setCitiesLoading(false));
  })
  .catch((err) => {
    dispatch(setCitiesLoading(false));
    showError(err.message);
  });
}

const citiesAdapter = createEntityAdapter({});

export const {
  selectAll: selectCities,
  selectById: selectCityById,
} = citiesAdapter.getSelectors(
  (state) => state.jobLocationApp.cities
);

const initialState = {
  loading: false,
};

const citiesSlice = createSlice({
  name: 'jobLocationApp/cities',
  initialState: citiesAdapter.getInitialState(initialState),
  reducers: {
    setCities: citiesAdapter.setAll,
    addCity: citiesAdapter.addOne,
    updateCity: citiesAdapter.upsertOne,
    removeCity: citiesAdapter.removeOne,
    setCitiesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCities,
  addCity,
  updateCity,
  removeCity,
  setCitiesLoading,
} = citiesSlice.actions;

export default citiesSlice.reducer;
