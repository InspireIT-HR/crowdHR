import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../helpers/storeHelper';

export const getCities = () => (dispatch, getState) => {
  if (getState().definitions.jobLocation.city.loading) {
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
  if (getState().definitions.jobLocation.city.isSubmitting) {
    return;
  }

  // Not efficient but works :/
  const countryId = getState().definitions.jobLocation.city.modal.countryId;

  dispatch(setIsCitySubmitting(true));

  axios.post('/Cities', {
    ...data,
    countryId,
  })
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
  if (getState().definitions.jobLocation.city.isSubmitting) {
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
  if (getState().definitions.jobLocation.city.isSubmitting) {
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
  (state) => state.definitions.jobLocation.city
);

const citiesSlice = createSlice({
  name: 'definitions/jobLocation/city',
  initialState: citiesAdapter.getInitialState(defaultInitinalState),
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
        countryId: action.payload || 5,
      };
    },
    openEditCityModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
        countryId: action.payload.countryId
      };
    },
    closeCityModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
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
