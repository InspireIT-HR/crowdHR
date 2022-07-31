import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../helpers/storeHelper';

export const getJobStatuses = () => (dispatch, getState) => {
  if (getState().definitions.jobStatus.loading) {
    return;
  }
  
  dispatch(setJobOpeningsLoading(true));
  
  axios.get('/JobStatus')
  .then((response) => {
    dispatch(setJobStatuses(response.data));
    dispatch(setJobOpeningsLoading(false));
  })
  .catch((err) => {
    dispatch(setJobOpeningsLoading(false));
    showError(err.message);
  });
}

export const addJobStatusRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobStatus.isSubmitting) {
    return;
  }

  dispatch(setIsJobStatusSubmitting(true));

  axios.post('/JobStatus', data)
  .then((response) => {
    dispatch(addJobStatus(response.data));
    dispatch(setIsJobStatusSubmitting(false));
    dispatch(closeJobStatusModal());
  })
  .catch((err) => {
    dispatch(setIsJobStatusSubmitting(false));
    showError(err.message);
  });
}

export const updateJobStatusRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobStatus.isSubmitting) {
    return;
  }

  dispatch(setIsJobStatusSubmitting(true));

  axios.put('/JobStatus', data)
  .then((response) => {
    dispatch(updateJobStatus(response.data));
    dispatch(setIsJobStatusSubmitting(false));
    dispatch(closeJobStatusModal());
  })
  .catch((err) => {
    dispatch(setIsJobStatusSubmitting(false));
    showError(err.message);
  });
}

export const removeJobStatusRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.jobStatus.isSubmitting) {
    return;
  }

  dispatch(setIsJobStatusSubmitting(true));

  axios.delete(`/JobStatus/${data}`)
  .then((response) => {
    dispatch(removeJobStatus(data));
    dispatch(setIsJobStatusSubmitting(false));
    dispatch(closeJobStatusModal());
  })
  .catch((err) => {
    dispatch(setIsJobStatusSubmitting(false));
    showError(err.message);
  });
}

const jobStatusesAdapter = createEntityAdapter({});

export const { 
  selectAll: selectJobStatuses, 
  selectById: selectJobStatusesById 
} = jobStatusesAdapter.getSelectors(
  (state) => state.definitions.jobStatus
);

const JobStatusSlice = createSlice({
  name: 'definitions/jobStatus',
  initialState: jobStatusesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setJobStatuses: jobStatusesAdapter.setAll,
    addJobStatus: jobStatusesAdapter.addOne,
    updateJobStatus: jobStatusesAdapter.upsertOne,
    removeJobStatus: jobStatusesAdapter.removeOne,
    setJobOpeningsLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewJobStatusModal: (state, action) => {
      state.modal = {
        type: 'new',
        open: true,
        data: null,
      };
    },
    openEditJobStatusModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
      };
    },
    closeJobStatusModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
    },
    setIsJobStatusSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {}
});

export const { 
  setJobStatuses, 
  addJobStatus, 
  updateJobStatus, 
  removeJobStatus,
  setJobOpeningsLoading, 
  openNewJobStatusModal,
  openEditJobStatusModal,
  closeJobStatusModal,
  setIsJobStatusSubmitting,
} = JobStatusSlice.actions;

export default JobStatusSlice.reducer;
