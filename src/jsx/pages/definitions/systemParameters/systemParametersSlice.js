/* eslint-disable no-unreachable */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState, openEditModalData, openNewModalData } from '../../../helpers/storeHelper';

export const getSystemParameters = () => (dispatch, getState) => {
  if (getState().definitions.systemParameter.loading) {
    return;
  }

  dispatch(setSystemParametersLoading(true));

  axios.get('/SystemParameters')
  .then((response) => {
    dispatch(setSystemParameters(response.data));
    dispatch(setSystemParametersLoading(false));
  })
  .catch((err) => {
    dispatch(setSystemParametersLoading(false));
    showError(err.message);
  });
}

export const addSystemParameterRequest = (data) => (dispatch, getState) => {
  return;
  if (getState().definitions.systemParameter.loading) {
    return;
  }

  dispatch(setSystemParametersLoading(true));

  axios.post('/SystemParameters', data)
  .then((response) => {
    dispatch(addSystemParameter(response.data));
    dispatch(setSystemParametersLoading(false));
  })
  .catch((err) => {
    dispatch(setSystemParametersLoading(false));
    showError(err.message);
  });
}

export const updateSystemParameterRequest = (data) => (dispatch, getState) => {
  return;
  if (getState().definitions.systemParameter.loading) {
    return;
  }

  dispatch(setSystemParametersLoading(true));

  axios.put('/SystemParameters', data)
  .then((response) => {
    dispatch(updateSystemParameter(response.data));
    dispatch(setSystemParametersLoading(false));
  })
  .catch((err) => {
    dispatch(setSystemParametersLoading(false));
    showError(err.message);
  });
}

export const removeSystemParameterRequest = (data) => (dispatch, getState) => {
  return;
  if (getState().definitions.systemParameter.loading) {
    return;
  }

  dispatch(setSystemParametersLoading(true));
  
  axios.delete(`/SystemParameters/${data}`)
  .then((response) => {
    dispatch(removeSystemParameter(data));
    dispatch(setSystemParametersLoading(false));
  })
  .catch((err) => {
    dispatch(setSystemParametersLoading(false));
    showError(err.message);
  });
}

const systemParameterAdapter = createEntityAdapter({});

export const {
  selectAll: selectSystemParameters,
  selectById: selectSystemParameterById
} = systemParameterAdapter.getSelectors(
  (state) => state.definitions.systemParameter
);

const systemParameterSlice = createSlice({
  name: 'definitions/systemParameter',
  initialState: systemParameterAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setSystemParameters: systemParameterAdapter.setAll,
    addSystemParameter: systemParameterAdapter.addOne,
    updateSystemParameter: systemParameterAdapter.upsertOne,
    removeSystemParameter: systemParameterAdapter.removeOne,
    openNewSystemParameterModal: (state, action) => {
      state.modal = openNewModalData;
    },
    openEditSystemParameterModal: (state, action) => {
      state.modal = openEditModalData(action.payload);
    },
    closeSystemParameterModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
    },
    setSystemParametersLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSystemParameters,
  addSystemParameter,
  updateSystemParameter,
  removeSystemParameter,
  openNewSystemParameterModal,
  openEditSystemParameterModal,
  closeSystemParameterModal,
  setSystemParametersLoading,
} = systemParameterSlice.actions;

export default systemParameterSlice.reducer;
