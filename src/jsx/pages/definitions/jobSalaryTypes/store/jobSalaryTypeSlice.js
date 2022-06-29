import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getJobSalaryTypes = () => (dispatch, getState) => {
  if (getState().jobSalaryTypeApp.jobSalaryTypes.loading) {
    return;
  }

  dispatch(setJobSalaryTypesLoading(true));

  axios.get('/SalaryTypes')
  .then((response) => {
    dispatch(setJobSalaryTypes(response.data));
    dispatch(setJobSalaryTypesLoading(false));
  })
  .catch((err) => {
    dispatch(setJobSalaryTypesLoading(false));
    showError(err.message);
  });
}

export const addJobSalaryTypeRequest = (data) => (dispatch, getState) => {
  if (getState.jobSalaryTypeApp.jobSalaryTypes.isSubmitting) {
    return;
  }

  dispatch(setIsJobSalaryTypeSubmitting(true));

  axios.post('/SalaryTypes', data)
  .then((response) => {
    dispatch(addJobSalaryType(response.data));
    dispatch(setIsJobSalaryTypeSubmitting(false));
    dispatch(closeJobSalaryTypeModal());
  })
  .catch((err) => {
    dispatch(setIsJobSalaryTypeSubmitting(false));
    showError(err.message);
  });
}

export const updateJobSalaryTypeRequest = (data) => (dispatch, getState) => {
  if (getState.jobSalaryTypeApp.jobSalaryTypes.isSubmitting) {
    return;
  }

  dispatch(setIsJobSalaryTypeSubmitting(true));

  axios.put('/SalaryTypes', data)
  .then((response) => {
    dispatch(updateJobSalaryType(response.data));
    dispatch(setIsJobSalaryTypeSubmitting(false));
    dispatch(closeJobSalaryTypeModal());
  })
  .catch((err) => {
    dispatch(setIsJobSalaryTypeSubmitting(false));
    showError(err.message);
  });
}

export const removeJobSalaryTypeRequest = (data) => (dispatch, getState) => {
  if (getState.jobSalaryTypeApp.jobSalaryTypes.isSubmitting) {
    return;
  }

  dispatch(setIsJobSalaryTypeSubmitting(true));

  axios.delete(`/SalaryType/${data}`)
  .then((response) => {
    dispatch(removeJobSalaryType(data));
    dispatch(setIsJobSalaryTypeSubmitting(false));
    dispatch(closeJobSalaryTypeModal());
  })
  .catch((err) => {
    dispatch(closeJobSalaryTypeModal());
    showError(err.message);
  });
}

const jobSalaryTypesAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobSalaryTypes,
  selectById: selectJobSalaryTypeById,
} = jobSalaryTypesAdapter.getSelectors(
  (state) => state.jobSalaryTypeApp.jobSalaryTypes
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

const jobSalaryTypesSlice = createSlice({
  name: 'jobSalaryTypeApp/jobSalaryTypes',
  initialState: jobSalaryTypesAdapter.getInitialState(initialState),
  reducers: {
    setJobSalaryTypes: jobSalaryTypesAdapter.setAll,
    addJobSalaryType: jobSalaryTypesAdapter.addOne,
    updateJobSalaryType: jobSalaryTypesAdapter.upsertOne,
    removeJobSalaryType: jobSalaryTypesAdapter.removeOne,
    setJobSalaryTypesLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewJobSalaryTypeModal: (state, action) => {
      state.modal = {
        type: 'new',
        open: true,
        data: null,
      };
    },
    openEditJobSalaryTypeModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
      };
    },
    closeJobSalaryTypeModal: (state, action) => {
      state.modal = initialState.modal;
    },
    setIsJobSalaryTypeSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setJobSalaryTypes,
  addJobSalaryType,
  updateJobSalaryType,
  removeJobSalaryType,
  setJobSalaryTypesLoading,
  openNewJobSalaryTypeModal,
  openEditJobSalaryTypeModal,
  closeJobSalaryTypeModal,
  setIsJobSalaryTypeSubmitting,
} = jobSalaryTypesSlice.actions;

export default jobSalaryTypesSlice.reducer;
