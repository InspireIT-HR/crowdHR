import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

export const getDropdowns =()=>(dispatch,getState)=>{
    const dropdowns ={}
    axios.get("/JobStatus")
        .then((response) => {
          dropdowns.jobStatus=response.data;
        })
        .catch((err) => {});
    axios.get("/JobTypes")
      .then((response) => {
        dropdowns.jobTypes=response.data;
      })
      .catch((err) => {});
    dispatch(setDropdowns(dropdowns))
  }

  const dropdownsAdapter = createEntityAdapter({});

  export const {
    selectAll: selectDropdowns,
  } = dropdownsAdapter.getSelectors(
    (state) => state.jobOpeningApp.dropdowns
  );

  const initialState = {
    loading: false,
    data:null
  };

  const dropdownsSlice = createSlice({
    name: 'jobOpeningApp/dropdowns',
    initialState: dropdownsAdapter.getInitialState(initialState),
    reducers: {
      setDropdowns: dropdownsAdapter.setAll,
      setDropdownsLoading: (state, action) => {
        state.loading = action.payload;
      }
    },
    extraReducers: {},
  });

  export const {
    setDropdowns
  } = dropdownsSlice.actions;

  export default dropdownsSlice.reducer;