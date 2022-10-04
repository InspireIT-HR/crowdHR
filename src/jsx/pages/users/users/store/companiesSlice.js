import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../../helpers/storeHelper';

export const getCompanies=()=>(dispatch,getState)=>{
    if(getState().userApp.companies.loading){
        return;
    }

    dispatch(setCompaniesLoading(true));

    axios.get('/Customers')
    .then(res=>{
        dispatch(setCompanies(res.data));
        dispatch(setCompaniesLoading(false));
    })
    .catch(err=>{
        dispatch(setCompaniesLoading(false));
        showError(err.message);
    })
}

const comapniesAdapter=createEntityAdapter({});

export const{
    selectAll:selectCompanies,
    selectById:selectCompanyById,
}=comapniesAdapter.getSelectors(
    (state)=>state.userApp.companies
)

const companiesSlice=createSlice({
    name:'userApp/companies',
    initialState:comapniesAdapter.getInitialState(defaultInitinalState),
    reducers:{
        setCompanies:comapniesAdapter.setAll,
        setCompaniesLoading:(state,action)=>{
            state.loading=action.payload;
        },
    },
});

export const{
    setCompanies,
    setCompaniesLoading
}=companiesSlice.actions;

export default companiesSlice.reducer;