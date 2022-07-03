import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';


export const getEducationLevels = () => (dispatch, getState) => {
  if (getState().educationLevelApp.educationLevels.loading) {
    return;
  }

  dispatch(setEducationLevelsLoading(true));

  axios.get('/EducationLevels')
  .then((response) => {
    dispatch(setEducationLevels(response.data));
    dispatch(setEducationLevelsLoading(false));
  })
  .catch((err) => {
    dispatch(setEducationLevelsLoading(false));
    showError(err.message);
  });
}

export const addEducationLevelRequest = (data) => (dispatch, getState) => {
  if (getState().educationLevelApp.educationLevels.isSubmitting) {
    return;
  }

  dispatch(setIsEducationLevelSubmitting(true));

  axios.post('/EducationLevels', data)
  .then((response) => {
    dispatch(addEducationLevel(response.data));
    dispatch(setIsEducationLevelSubmitting(false));
    dispatch(closeEducationLevelModal());
  })
  .catch((err) => {
    dispatch(setIsEducationLevelSubmitting(false));
    showError(err.message);
  });
}

export const updateEducationLevelRequest = (data) => (dispatch, getState) => {
  if (getState().educationLevelApp.educationLevels.isSubmitting) {
    return;
  }

  dispatch(setIsEducationLevelSubmitting(true));

  axios.put('/EducationLevels', data)
  .then((response) => {
    dispatch(updateEducationLevel(response.data));
    dispatch(setIsEducationLevelSubmitting(false));
    dispatch(closeEducationLevelModal());
  })
  .catch((err) => {
    dispatch(setIsEducationLevelSubmitting(false));
    showError(err.message);
  });
}

export const removeEducationLevelRequest = (data) => (dispatch, getState) => {
  if (getState().educationLevelApp.educationLevels.isSubmitting) {
    return;
  }

  dispatch(setIsEducationLevelSubmitting(true));

  axios.delete(`/EducationLevels/${data}`)
  .then((response) => {
    dispatch(removeEducationLevel(data));
    dispatch(setIsEducationLevelSubmitting(false));
    dispatch(closeEducationLevelModal());
  })
  .catch((err) => {
    dispatch(setIsEducationLevelSubmitting(false));
    showError(err.message);
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
  isSubmitting: false,
  modal: {
    type: 'new',
    open: false,
    data: null,
  },
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
    openNewEducationLevelModal: (state, action) => {
      state.modal = {
        type: 'new',
        open: true,
        data: null,
      };
    },
    openEditEducationLevelModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
      };
    },
    closeEducationLevelModal: (state, action) => {
      state.modal = initialState.modal;
    },
    setIsEducationLevelSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
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
  openNewEducationLevelModal,
  openEditEducationLevelModal,
  closeEducationLevelModal,
  setIsEducationLevelSubmitting,
} = educationLevelSlice.actions;

export default educationLevelSlice.reducer;
