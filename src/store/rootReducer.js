import { combineReducers } from "redux"
import auth from './auth';
import definitions from '../jsx/pages/definitions/store';
import candidates from '../jsx/pages/jobCandidates/store';



const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    definitions,
    candidates,
    ...asyncReducers,
  });
  
  return combinedReducer(state, action);
};

export default createReducer;
