import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../services/axios";
import { showError } from "../../../helpers/notificationHelper";
import { defaultInitinalState } from "../../../helpers/storeHelper";

export const getCompanies = () => (dispatch, getState) => {
  if (getState().companies.companyList.loading) {
    return;
  }

  dispatch(setCompaniesLoading(true));

  axios
    .get("/Customers")
    .then((response) => {
      dispatch(setCompanies(response.data));
      response.data.forEach((company) => {
        dispatch(getCompanies(company.id));
      });
      dispatch(setCompaniesLoading(false));
    })
    .catch((err) => {
      dispatch(setCompaniesLoading(false));
      showError(err.message);
    });
};

// export const addCompanyRequest = (data) => (dispatch, getState) => {
//   if (getState().definitions.attachmentType.loading) {
//     return;
//   }

//   dispatch(setIsAttachmentTypeSubmitting(true));

//   axios.post('/AttachmentTypes', data)
//   .then((response) => {
//     dispatch(addAttachmentType(response.data));
//     dispatch(setIsAttachmentTypeSubmitting(false));
//     dispatch(closeAttachmentTypeModal());
//   })
//   .catch((err) => {
//     dispatch(setIsAttachmentTypeSubmitting(false));
//     showError(err.message);
//   });
// }

// export const updateCompanyRequest = (data) => (dispatch, getState) => {
//   if (getState().definitions.attachmentType.loading) {
//     return;
//   }

//   dispatch(setIsAttachmentTypeSubmitting(true));

//   axios.put('/AttachmentTypes', data)
//   .then((response) => {
//     dispatch(updateAttachmentType(response.data));
//     dispatch(setIsAttachmentTypeSubmitting(false));
//     dispatch(closeAttachmentTypeModal());
//   })
//   .catch((err) => {
//     dispatch(setIsAttachmentTypeSubmitting(false));
//     showError(err.message);
//   });
// }

// export const removeCompanyRequest = (data) => (dispatch, getState) => {
//   if (getState().definitions.attachmentType.loading) {
//     return;
//   }

//   dispatch(setIsAttachmentTypeSubmitting(true));

//   axios.delete(`/AttachmentTypes/${data}`)
//   .then((response) => {
//     dispatch(removeAttachmentType(data));
//     dispatch(setIsAttachmentTypeSubmitting(false));
//     dispatch(closeAttachmentTypeModal());
//   })
//   .catch((err) => {
//     dispatch(setIsAttachmentTypeSubmitting(false));
//     showError(err.message);
//   });
// }

const companiesAdapter = createEntityAdapter({});

export const { selectAll: selectCompanies, selectById: selectCompanyById } =
  companiesAdapter.getSelectors((state) => state.companies.companyList);

const companyListSlice = createSlice({
  name: "companies/companyList",
  initialState: companiesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCompanies: companiesAdapter.setAll,
    addCompany: companiesAdapter.addOne,
    updateCompany: companiesAdapter.upsertOne,
    removeCompany: companiesAdapter.removeOne,
    setCompaniesLoading: (state, action) => {
      state.loading = action.payload;
    },
    openNewCompanyModal: (state, action) => {
      state.modal = {
        type: "new",
        open: true,
        data: null,
      };
    },
    openEditCompanyModal: (state, action) => {
      state.modal = {
        type: "edit",
        open: true,
        data: action.payload,
      };
    },
    closeCompanyModal: (state, action) => {
      state.modal = defaultInitinalState.modal;
    },
    setIsCompanySubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCompanies,
  addCompany,
  updateCompany,
  removeCompany,
  setCompaniesLoading,
  openNewCompanyModal,
  openEditCompanyModal,
  closeCompanyModal,
  setIsCompanySubmitting,
} = companyListSlice.actions;

export default companyListSlice.reducer;
