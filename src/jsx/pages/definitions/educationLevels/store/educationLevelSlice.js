import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import swal from 'sweetalert';

export const getEducationLevels = () => (dispatch, getState) => {
  dispatch(setEducationLevelsLoading(true));

  axios.get('/EducationLevels')
  .then((response) => {
    dispatch(setEducationLevels(response.data));
    dispatch(setEducationLevelsLoading(false));
  })
  .catch((err) => {
    dispatch(setEducationLevelsLoading(false));
    console.log(err.message);
    swal({
      title: 'Fetch Error',
      text: err.message,
      icon: 'error',
    });
  });
}

const educationLevelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectEducationLevels,
  selectById: selectEducationLevelById,
} = educationLevelsAdapter.getSelectors(
  (state) => state.educationLevelApp.educationLevels
);

const initialState = {
  loading: false,
};

const educationLevelSlice = createSlice({
  name: 'educationLevelApp/educationLevels',
  initialState: educationLevelsAdapter.getInitialState(initialState),
  reducers: {
    setEducationLevels: educationLevelsAdapter.setAll,
    addEducationLevel: educationLevelsAdapter.addOne,
    updateEducationLevel: educationLevelsAdapter.upsertOne,
    removeEducationLevel: educationLevelsAdapter.removeOne,
    setEducationLevelsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setEducationLevels,
  addEducationLevel,
  updateEducationLevel,
  removeEducationLevel,
  setEducationLevelsLoading,
} = educationLevelSlice.actions;

export default educationLevelSlice.reducer;