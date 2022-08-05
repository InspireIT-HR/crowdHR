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



const companiesAdapter = createEntityAdapter({});

export const { selectAll: selectCompanies, selectById: selectCompanyById } =
  companiesAdapter.getSelectors((state) => state.companies.companyList);

const companyListSlice = createSlice({
  name: "companies/companyList",
  initialState: companiesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCompanies: companiesAdapter.setAll,
    setCompaniesLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: {},
});

export const {
  setCompanies,
  setCompaniesLoading,
} = companyListSlice.actions;

export default companyListSlice.reducer;
