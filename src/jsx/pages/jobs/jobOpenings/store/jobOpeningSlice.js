import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getJobOpenings = () => (dispatch, getState) => {
  if (getState().jobOpeningApp.jobOpenings.loading) {
    return;
  }
  
  dispatch(setJobOpeningsLoading(true));

  axios.get('/JobOpenings')
  .then((response) => {
    dispatch(setJobOpenings(response.data));
    dispatch(setJobOpeningsLoading(false));
  })
  .catch((err) => {
    dispatch(setJobOpeningsLoading(false));
    showError(err.message);
  });
}

export const addNewJob=(data)=>(dispatch,getState)=>{
  axios.post('/JobOpenings', data)
  .then((response) => {
    dispatch(addJobOpening(response.data));

  })
  .catch((err) => {
    showError(err.message);
  });
}

export const getApplicationHistory = (jobId) => (dispatch, getState) => {
  const applicationHistory = getState().jobOpeningApp.jobOpenings.applicationHistory;
  const applicationHistoryLoading = getState().jobOpeningApp.jobOpenings.applicationHistoryLoading;
  if (applicationHistoryLoading[jobId] || applicationHistory[jobId]) {
    return;
  }

  dispatch(setApplicationHistoryLoading({ jobId, loading: true }));

  axios.post('/JobCandidates/ApplicationHistory', {
    cityId: -1,
    customerId: -1,
    jobAssignedtome: false,
    jobStatusId: 1,
    referrerUserId: -1,
    userId: 186,
    jobId,
  })
  .then((response) => {
    const history = response.data.map((data) => {
      // const newData = {
      //   ...data,
      //   stageId: data.candidateStatus ? data.candidateStatus.stageId : null
      // };
      if (data.candidateStatus) {
        data[data.candidateStatus.stageId] = data.candidateStatus.description;
      }
      return data;
    });
    dispatch(setApplicationHistory({ jobId, history }));
    dispatch(setApplicationHistoryLoading({ jobId, loading: false }));
  })
  .catch((err) => {
    dispatch(setApplicationHistoryLoading({ jobId, loading: false }));
    showError(err.message);
  });
}

export const referUser = (data) => (dispatch, getState) => {
  
}

export const applyJobOpening = (data) => (dispatch, getState) => {
  
}

const jobOpeningsAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobOpenings,
  selectById: selectJobOpeningById,
} = jobOpeningsAdapter.getSelectors(
  (state) => state.jobOpeningApp.jobOpenings
);

const initialState = {
  loading: false,
  data: null,
  applicationHistory: {},
  applicationHistoryLoading: {},
  filters: {
    jobTypeDesc: {
      values: [],
      selectedValue: 0,
    },
    jobStatusDesc: {
      values: [],
      selectedValue: 0,
    },
    jobInternalRecruiterDesc: {
      values: [],
      selectedValue: 0,
    }
  }
};

const jobOpeningsSlice = createSlice({
  name: 'jobOpeningApp/jobOpenings',
  initialState: jobOpeningsAdapter.getInitialState(initialState),
  reducers: {
    setJobOpenings: (state, action) => {
      const jobTypes = {};
      const jobStatuses = {};
      const jobInternalRecruiters = {};
      action.payload.forEach((jobOpening) => {
        jobTypes[jobOpening.jobType.id] = {
          id: jobOpening.jobType.id,
          displayValue: jobOpening.jobType.description
        };
        jobStatuses[jobOpening.status.id] = {
          id: jobOpening.status.id,
          displayValue: jobOpening.status.description
        };
        jobOpening.jobOpeningInternalRecruiters.forEach((recruiter) => {
          jobInternalRecruiters[recruiter.internalRecruiterId] = {
            id: recruiter.internalRecruiterId,
            displayValue: recruiter.internalRecruiter.fullname
          };
        });
      });
      state.filters.jobTypeDesc.values = [
        {
          id: 0,
          description: '',
          displayValue: 'All'
        },
        ...Object.values(jobTypes),
      ];
      state.filters.jobStatusDesc.values = [
        {
          id: 0,
          description: '',
          displayValue: 'All'
        },
        ...Object.values(jobStatuses),
      ];
      state.filters.jobInternalRecruiterDesc.values = [
        {
          id: 0,
          description: '',
          displayValue: 'All'
        },
        ...Object.values(jobInternalRecruiters),
      ];
      jobOpeningsAdapter.setAll(state, action.payload);
    },
    addJobOpening: jobOpeningsAdapter.addOne,
    updateJobOpening: jobOpeningsAdapter.upsertOne,
    removeJobOpening: jobOpeningsAdapter.removeOne,
    setJobOpeningsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setApplicationHistory: (state, action) => {
      const { jobId, history } = action.payload;
      state.applicationHistory[jobId] = history;
    },
    setApplicationHistoryLoading: (state, action) => {
      const { jobId, loading } = action.payload;
      state.applicationHistoryLoading[jobId] = loading;
    },
    setFilterField: (state, action) => {
      const fieldName = action.payload.field;
      const fieldValue = action.payload.value;
      state.filters[fieldName].selectedValue = fieldValue;
    },
    resetFilters: (state, action) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: {},
});

export const {
  setJobOpenings,
  addJobOpening,
  updateJobOpening,
  removeJobOpening,
  setJobOpeningsLoading,
  setApplicationHistory,
  setApplicationHistoryLoading,
  setFilterField,
  resetFilters,
} = jobOpeningsSlice.actions;

export default jobOpeningsSlice.reducer;