import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getCities = () => (dispatch, getState) => {
  if (getState().jobLocationApp.cities.loading) {
    return;
  }

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

// data ->
//  description: 'string',
//  countryId: 'string'

export const addCityRequest = (data) => (dispatch, getState) => {
  if (getState().jobLocationApp.cities.isSubmitting) {
    return;
  }

  dispatch(setIsCitySubmitting(true));

  axios.post('/Cities', data)
  .then((response) => {
    dispatch(addCity(response.data));
    dispatch(setIsCitySubmitting(false));
    dispatch(closeCityModal());
  })
  .catch((err) => {
    dispatch(setIsCitySubmitting(false));
    showError(err.message);
  });
}

export const updateCityRequest = (data) => (dispatch, getState) => {
  if (getState().jobLocationApp.cities.isSubmitting) {
    return;
  }

  dispatch(setIsCitySubmitting(true));

  axios.put('/Cities', data)
  .then((response) => {
    dispatch(updateCity(response.data));
    dispatch(setIsCitySubmitting(false));
    dispatch(closeCityModal());
  })
  .catch((err) => {
    dispatch(setIsCitySubmitting(false));
    showError(err.message);
  });
}

export const removeCityRequest = (data) => (dispatch, getState) => {
  if (getState().jobLocationApp.cities.isSubmitting) {
    return;
  }

  dispatch(setIsCitySubmitting(true));

  axios.delete(`/Cities/${data}`)
  .then((response) => {
    dispatch(removeCity(data));
    dispatch(setIsCitySubmitting(false));
    dispatch(closeCityModal());
  })
  .catch((err) => {
    dispatch(setIsCitySubmitting(false));
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
  isSubmitting: false,
  modal: {
    type: 'new',
    open: false,
    data: null,
  },
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
    openNewCityModal: (state, action) => {
      state.modal = {
        type: 'new',
        open: true,
        data: null,
      };
    },
    openEditCityModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
      };
    },
    closeCityModal: (state, action) => {
      state.modal = initialState.modal;
    },
    setIsCitySubmitting: (state, action) => {
      state.isSubmitting = action.payload;
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
  openNewCityModal,
  openEditCityModal,
  closeCityModal,
  setIsCitySubmitting,
} = citiesSlice.actions;

export default citiesSlice.reducer;
