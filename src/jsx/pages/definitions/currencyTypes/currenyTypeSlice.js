import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState, openEditModalData, openNewModalData } from '../../../helpers/storeHelper';

export const getCurrencyTypes = () => (dispatch, getState) => {
  if (getState().definitions.currencyType.loading) {
    return;
  }

  dispatch(setCurrencyTypesLoading(true));

  axios.get('/CurrencyTypes')
  .then((response) => {
    dispatch(setCurrencyTypes(response.data));
    dispatch(setCurrencyTypesLoading(false));
  })
  .catch((err) => {
    dispatch(setCurrencyTypesLoading(false));
    showError(err.message);
  });
}

export const addCurrencyTypeRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.currencyType.loading) {
    return;
  }

  dispatch(setIsCurrencyTypeSubmitting(true));

  axios.post('/CurrencyTypes', data)
  .then((response) => {
    dispatch(addCurrencyType(response.data));
    dispatch(setIsCurrencyTypeSubmitting(false));
    dispatch(closeCurrencyTypeModal());
  })
  .catch((err) => {
    dispatch(setIsCurrencyTypeSubmitting(false));
    showError(err.message);
  });
}

export const updateCurrencyTypeRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.currencyType.loading) {
    return;
  }

  dispatch(setIsCurrencyTypeSubmitting(true));

  axios.put('/CurrencyTypes', data)
  .then((response) => {
    dispatch(updateCurrencyType(data));
    dispatch(setIsCurrencyTypeSubmitting(false));
    dispatch(closeCurrencyTypeModal());
  })
  .catch((err) => {
    dispatch(setIsCurrencyTypeSubmitting(false));
    showError(err.message);
  });
}

export const removeCurrencyTypeRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.currencyType.loading) {
    return;
  }

  dispatch(setIsCurrencyTypeSubmitting(true));

  axios.delete(`/CurrencyTypes/${data}`)
  .then((response) => {
    dispatch(removeCurrencyType(data));
    dispatch(setIsCurrencyTypeSubmitting(false));
    dispatch(closeCurrencyTypeModal());
  })
  .catch((err) => {
    dispatch(setIsCurrencyTypeSubmitting(false));
    showError(err.message);
  });
}

const currencyTypesAdapter = createEntityAdapter({});

export const {
  selectAll: selectCurrencyTypes,
  selectById: selectCurrencyTypeById
} = currencyTypesAdapter.getSelectors(
  (state) => state.definitions.currencyType
);

const currencyTypeSlice = createSlice({
  name: 'definitions/currencyType',
  initialState: currencyTypesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCurrencyTypes: currencyTypesAdapter.setAll,
    addCurrencyType: currencyTypesAdapter.addOne,
    updateCurrencyType: currencyTypesAdapter.upsertOne,
    removeCurrencyType: currencyTypesAdapter.removeOne,
    setCurrencyTypesLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewCurrencyTypeModal: (state, action) => {
      state.modal = openNewModalData;
    },
    openEditCurrencyTypeModal: (state, action) => {
      state.modal = openEditModalData(action.payload);
    },
    closeCurrencyTypeModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
    },
    setIsCurrencyTypeSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCurrencyTypes,
  addCurrencyType,
  updateCurrencyType,
  removeCurrencyType,
  setCurrencyTypesLoading,
  openNewCurrencyTypeModal,
  openEditCurrencyTypeModal,
  closeCurrencyTypeModal,
  setIsCurrencyTypeSubmitting
} = currencyTypeSlice.actions;

export default currencyTypeSlice.reducer;
