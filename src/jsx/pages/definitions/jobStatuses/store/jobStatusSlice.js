import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const jobStatusesAdapter = createEntityAdapter({});

export const { selectAll: selectJobStatuses, selectById: selectJobStatusesById } = jobStatusesAdapter.getSelectors(
  (state) => state.jobStatusApp.items
);

const initialState = {
  searchText: '',
  jobStatusDialog: {
    type: 'new',
    open: false,
    data: null,
  },
};

const JobStatusSlice = createSlice({
  name: 'jobStatusApp/items',
  initialState: jobStatusesAdapter.getInitialState(initialState),
  reducers: {
    setJobStatusSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || ''}),
    },
    setJobStatuses: (state, action) => jobStatusesAdapter.setAll(state, action.payload),
    addJobStatus: (state, action) => jobStatusesAdapter.addOne(state, action.payload),
    updateJobStatus: (state, action) => jobStatusesAdapter.upsertOne(state, action.payload),
    setInitialJobStatuses: (state, action) => jobStatusesAdapter.getInitialState(initialState),
  },
  extraReducers: {}
});

export const { setJobStatusSearchText, setJobStatuses, addJobStatus, updateJobStatus, setInitialJobStatuses } = JobStatusSlice.actions;

export default JobStatusSlice.reducer;
