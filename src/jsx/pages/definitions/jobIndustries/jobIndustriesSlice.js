import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState, openEditModalData, openNewModalData } from '../../../helpers/storeHelper';

export const getJobIndustries = () => (dispatch, getState) => {
  if (getState().definitions.jobIndustry.loading) {
    return;
  }

  dispatch(setJobIndustriesLoading(true));

  axios.get('/Industries')
  .then((response) => {
    dispatch(setJobIndustries(response.data));
    dispatch(setJobIndustriesLoading(false));
  })
  .catch((err) => {
    dispatch(setJobIndustriesLoading(false));
    showError(err.mesage);
  });
}

export const addJobIndustryRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobIndustry.isSubmitting) {
    return;
  }

  dispatch(setIsJobIndustrySubmitting(true));

  axios.post('/Industries', data)
  .then((response) => {
    dispatch(addJobIndustry(response.data));
    dispatch(setIsJobIndustrySubmitting(false));
    dispatch(closeJobIndustryModal());
  })
  .catch((err) => {
    dispatch(setIsJobIndustrySubmitting(false));
    showError(err.message);
  });
}

export const updateJobIndustryRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobIndustry.isSubmitting) {
    return;
  }

  dispatch(setIsJobIndustrySubmitting(true));

  axios.put('/Industries', data)
  .then((response) => {
    dispatch(updateJobIndustry(response.data));
    dispatch(setIsJobIndustrySubmitting(false));
    dispatch(closeJobIndustryModal());
  })
  .catch((err) => {
    dispatch(setIsJobIndustrySubmitting(false));
    showError(err.message);
  });
}

export const removeJobIndustryRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobIndustry.isSubmitting) {
    return;
  }

  dispatch(setIsJobIndustrySubmitting(true));

  axios.delete(`/Industries/${data}`)
  .then((response) => {
    dispatch(removeJobIndustry(data));
    dispatch(setIsJobIndustrySubmitting(false));
    dispatch(closeJobIndustryModal());
  })
  .catch((err) => {
    dispatch(setIsJobIndustrySubmitting(false));
    showError(err.message);
  });
}

const jobIndustriesAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobIndustries,
  selectById: selectJobIndustryById,
} = jobIndustriesAdapter.getSelectors(
  (state) => state.definitions.jobIndustry
);

const jobIndustriesSlice = createSlice({
  name: 'definitions/jobIndustry',
  initialState: jobIndustriesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setJobIndustries: jobIndustriesAdapter.setAll,
    addJobIndustry: jobIndustriesAdapter.addOne,
    updateJobIndustry: jobIndustriesAdapter.upsertOne,
    removeJobIndustry: jobIndustriesAdapter.removeOne,
    setJobIndustriesLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewJobIndustryModal: (state, action) => {
      state.modal = openNewModalData;
    },
    openEditJobIndustryModal: (state, action) => {
      state.modal = openEditModalData(action.payload);
    },
    closeJobIndustryModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
    },
    setIsJobIndustrySubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setJobIndustries,
  addJobIndustry,
  updateJobIndustry,
  removeJobIndustry,
  setJobIndustriesLoading,
  openNewJobIndustryModal,
  openEditJobIndustryModal,
  closeJobIndustryModal,
  setIsJobIndustrySubmitting,
} = jobIndustriesSlice.actions;

export default jobIndustriesSlice.reducer;
