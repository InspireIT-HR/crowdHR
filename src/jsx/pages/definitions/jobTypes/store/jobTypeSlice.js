import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getJobTypes = () => (dispatch, getState) => {
  if (getState().jobTypeApp.jobTypes.loading) {
    return;
  }
  
  dispatch(setJobTypesLoading(true));

  axios.get('/JobTypes')
  .then((response) => {
    dispatch(setJobTypes(response.data));
    dispatch(setJobTypesLoading(false));
  })
  .catch((err) => {
    setJobTypesLoading(false);
    showError(err.message);
  });
}

export const addJobTypeRequest = (data) => (dispatch, getState) => {
  if (getState().jobTypeApp.jobTypes.isSubmitting) {
    return;
  }

  dispatch(setIsJobTypeSubmitting(true));

  axios.post('/JobTypes', data)
  .then((response) => {
    dispatch(addJobType(response.data));
    dispatch(setIsJobTypeSubmitting(false));
    dispatch(closeJobTypeModal());
  })
  .catch((err) => {
    dispatch(setIsJobTypeSubmitting(false));
    showError(err.message);
  });
}

export const updateJobTypeRequest = (data) => (dispatch, getState) => {
  if (getState().jobTypeApp.jobTypes.isSubmitting) {
    return;
  }

  dispatch(setIsJobTypeSubmitting(true));

  axios.put('/JobTypes', data)
  .then((response) => {
    dispatch(updateJobType(response.data));
    dispatch(setIsJobTypeSubmitting(false));
    dispatch(closeJobTypeModal());
  })
  .catch((err) => {
    dispatch(setIsJobTypeSubmitting(false));
    showError(err.message);
  });
}

export const removeJobTypeRequest = (data) => (dispatch, getState) => {
  if (getState().jobTypeApp.jobTypes.isSubmitting) {
    return;
  }

  dispatch(setIsJobTypeSubmitting(true));

  axios.delete(`/JobTypes/${data}`)
  .then((response) => {
    dispatch(removeJobType(data));
    dispatch(setIsJobTypeSubmitting(false));
    dispatch(closeJobTypeModal());
  })
  .catch((err) => {
    dispatch(setIsJobTypeSubmitting(false));
    showError(err.message);
  });
}

const jobTypesAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobTypes,
  selectById: selectJobTypeById,
} = jobTypesAdapter.getSelectors(
  (state) => state.jobTypeApp.jobTypes
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

const jobTypeSlice = createSlice({
  name: 'jobTypeApp/jobTypes',
  initialState: jobTypesAdapter.getInitialState(initialState),
  reducers: {
    setJobTypes: jobTypesAdapter.setAll,
    addJobType: jobTypesAdapter.addOne,
    updateJobType: jobTypesAdapter.upsertOne,
    removeJobType: jobTypesAdapter.removeOne,
    setJobTypesLoading: (state, action) => { 
      state.loading = action.payload;
    },
    openNewJobTypeModal: (state, action) => {
      state.modal = {
        type: 'new',
        open: true,
        data: null,
      };
    },
    openEditJobTypeModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
      };
    },
    closeJobTypeModal: (state, action) => {
      state.modal = initialState.modal;
    },
    setIsJobTypeSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setJobTypes,
  addJobType,
  updateJobType,
  removeJobType,
  setJobTypesLoading,
  openNewJobTypeModal,
  openEditJobTypeModal,
  closeJobTypeModal,
  setIsJobTypeSubmitting,
} = jobTypeSlice.actions;

export default jobTypeSlice.reducer;
