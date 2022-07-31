import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../services/axios';
import { showError } from '../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../helpers/storeHelper';

export const getAttachmentTypes = () => (dispatch, getState) => {
  if (getState().definitions.attachmentType.loading) {
    return;
  }

  dispatch(setAttachmentTypesLoading(true));

  axios.get('/AttachmentTypes')
  .then((response) => {
    dispatch(setAttachmentTypes(response.data));
    dispatch(setAttachmentTypesLoading(false));
  })
  .catch((err) => {
    dispatch(setAttachmentTypesLoading(false));
    showError(err.message);
  });
}

export const addAttachmentTypeRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.attachmentType.loading) {
    return;
  }

  dispatch(setIsAttachmentTypeSubmitting(true));

  axios.post('/AttachmentTypes', data)
  .then((response) => {
    dispatch(addAttachmentType(response.data));
    dispatch(setIsAttachmentTypeSubmitting(false));
    dispatch(closeAttachmentTypeModal());
  })
  .catch((err) => {
    dispatch(setIsAttachmentTypeSubmitting(false));
    showError(err.message);
  });
}

export const updateAttachmentTypeRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.attachmentType.loading) {
    return;
  }

  dispatch(setIsAttachmentTypeSubmitting(true));

  axios.put('/AttachmentTypes', data)
  .then((response) => {
    dispatch(updateAttachmentType(response.data));
    dispatch(setIsAttachmentTypeSubmitting(false));
    dispatch(closeAttachmentTypeModal());
  })
  .catch((err) => {
    dispatch(setIsAttachmentTypeSubmitting(false));
    showError(err.message);
  });
}

export const removeAttachmentTypeRequest = (data) => (dispatch, getState) => {
  if (getState().definitions.attachmentType.loading) {
    return;
  }

  dispatch(setIsAttachmentTypeSubmitting(true));

  axios.delete(`/AttachmentTypes/${data}`)
  .then((response) => {
    dispatch(removeAttachmentType(data));
    dispatch(setIsAttachmentTypeSubmitting(false));
    dispatch(closeAttachmentTypeModal());
  })
  .catch((err) => {
    dispatch(setIsAttachmentTypeSubmitting(false));
    showError(err.message);
  });
}

const attachmentTypesAdapter = createEntityAdapter({});

export const {
  selectAll: selectAttachmentTypes,
  selectById: selectAttachmentTypeById,
} = attachmentTypesAdapter.getSelectors(
  (state) => state.definitions.attachmentType
);

const attachmentTypeSlice = createSlice({
  name: 'definitions/attachmentType',
  initialState: attachmentTypesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setAttachmentTypes: attachmentTypesAdapter.setAll,
    addAttachmentType: attachmentTypesAdapter.addOne,
    updateAttachmentType: attachmentTypesAdapter.upsertOne,
    removeAttachmentType: attachmentTypesAdapter.removeOne,
    setAttachmentTypesLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewAttachmentTypeModal: (state, action) => {
      state.modal = {
        type: 'new',
        open: true,
        data: null,
      };
    },
    openEditAttachmentTypeModal: (state, action) => {
      state.modal = {
        type: 'edit',
        open: true,
        data: action.payload,
      };
    },
    closeAttachmentTypeModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
    },
    setIsAttachmentTypeSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setAttachmentTypes,
  addAttachmentType,
  updateAttachmentType,
  removeAttachmentType,
  setAttachmentTypesLoading,
  openNewAttachmentTypeModal,
  openEditAttachmentTypeModal,
  closeAttachmentTypeModal,
  setIsAttachmentTypeSubmitting
} = attachmentTypeSlice.actions;

export default attachmentTypeSlice.reducer;
