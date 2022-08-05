import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../services/axios";
import { showError } from "../../../helpers/notificationHelper";
import { defaultInitinalState } from "../../../helpers/storeHelper";


export const getCompanyResponsibles = (companyId)=>(dispatch,getState)=>{
  if (getState().companies.companyResponsibles.loading) {
    return;
  }

  dispatch(setCompanyResponsiblesLoading(true));

  axios
  .get(`/Users/Responsible/${companyId}`)
  .then((response) => {
    dispatch(setCompanyResponsibles(response.data));
    dispatch(setCompanyResponsiblesLoading(false));
  })
  .catch((err) => {
    dispatch(setCompanyResponsiblesLoading(false));
    showError(err.message);
  });

}


const companyResponsiblesAdapter = createEntityAdapter({});
export const { selectAll: selectCompanyResponsibles, selectById: selectCompanyResponsibleById } =
companyResponsiblesAdapter.getSelectors((state) => state.companies.companyResponsibles);

const companyResponsiblesSlice = createSlice({
  name: "companies/companyResponsibles",
  initialState:companyResponsiblesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setCompanyResponsibles: companyResponsiblesAdapter.setAll,
    setCompanyResponsiblesLoading:(state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: {},
});

export const { setCompanyResponsibles,setCompanyResponsiblesLoading } = companyResponsiblesSlice.actions;

export default companyResponsiblesSlice.reducer;


