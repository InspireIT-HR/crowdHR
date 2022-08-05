import { combineReducers } from '@reduxjs/toolkit';
import companyList from "./companyList/companyListSlice";
import companyResponsibles from "./companyResponsibles/companyResponsiblesSlice";




const reducer = combineReducers({
    companyList,
    companyResponsibles
});

export default reducer;
