import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getCandidateStatuses = () => (dispatch, getState) => {
  if (getState().candidateStatusApp.candidateStatuses.loading) {
    return;
  }

  dispatch(setCandidateStatusesLoading(true));

  axios.get('/CandidateStatus')
  .then((response) => {
    dispatch(setCandidateStatuses(response.data));
    dispatch(setCandidateStatusesLoading(false));
  })
  .catch((err) => {
    dispatch(setCandidateStatusesLoading(false));
    showError(err.message);
  });
}

export const addCandidateStatusRequest = (data) => (dispatch, getState) => {
  if (getState().candidateStatusApp.candidateStatuses.isSubmitting) {
    return;
  }

  dispatch(setIsCandidateStatusSubmitting(true));

  axios.post('/CandidateStatus', data)
  .then((response) => {
    dispatch(addCandidateStatus(response.data));
    dispatch(setIsCandidateStatusSubmitting(false));
    dispatch(closeCandidateStatusModal());
  })
  .catch((err) => {
    dispatch(setIsCandidateStatusSubmitting(false));
    showError(err.message);
  });
}

export const updateCandidateStatusRequest = (data) => (dispatch, getState) => {
  if (getState().candidateStatusApp.candidateStatuses.isSubmitting) {
    return;
  }

  dispatch(setIsCandidateStatusSubmitting(true));

  axios.put('/CandidateStatus', data)
  .then((response) => {
    dispatch(updateCandidateStatus(response.data));
    dispatch(setIsCandidateStatusSubmitting(false));
    dispatch(closeCandidateStatusModal());
  })
  .catch((err) => {
    dispatch(setIsCandidateStatusSubmitting(false));
    showError(err.message);
  });
}

export const removeCandidateStatusRequest = (data) => (dispatch, getState) => {
  if (getState().candidateStatusApp.candidateStatuses.isSubmitting) {
    return;
  }

  dispatch(setIsCandidateStatusSubmitting(true));

  axios.delete(`/CandidateStatus/${data}`)
  .then((response) => {
    dispatch(removeCandidateStatus(data));
    dispatch(setIsCandidateStatusSubmitting(false));
    dispatch(closeCandidateStatusModal());
  })
  .catch((err) => {
    dispatch(setIsCandidateStatusSubmitting(false));
    showError(err.message);
  });
}

const candidateStatusesAdapter = createEntityAdapter({});

export const { 
  selectAll: selectCandidateStatuses, 
  selectById: selectCandidateStatusById 
} = candidateStatusesAdapter.getSelectors(
  (state) => state.candidateStatusApp.candidateStatuses
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

const candidateStatusSlice = createSlice({
  name: 'candidateStatusApp/candidateStatuses',
  initialState: candidateStatusesAdapter.getInitialState(initialState),
  reducers: {
    setCandidateStatuses: candidateStatusesAdapter.setAll,
    addCandidateStatus: candidateStatusesAdapter.addOne,
    updateCandidateStatus: candidateStatusesAdapter.upsertOne,
    removeCandidateStatus: candidateStatusesAdapter.removeOne,
    setCandidateStatusesLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewCandidateStatusModal: (state, action) => {
      state.modal = {
        type: 'new',
        data: null,
        open: true,
      };
    },
    openEditCandidateStatusModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
      };
    },
    closeCandidateStatusModal: (state, action) => {
      state.modal = {
        type: 'new',
        data: null,
        open: false,
      };
    },
    setIsCandidateStatusSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    }
  },
  extraReducers: {},
});

export const {
  setCandidateStatuses,
  addCandidateStatus,
  updateCandidateStatus,
  removeCandidateStatus,
  setCandidateStatusesLoading,
  openNewCandidateStatusModal,
  openEditCandidateStatusModal,
  closeCandidateStatusModal,
  setIsCandidateStatusSubmitting,
} = candidateStatusSlice.actions;

export default candidateStatusSlice.reducer;
