import { combineReducers } from "redux"
import auth from './auth';
import definitions from '../jsx/pages/definitions/store';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    definitions,
    ...asyncReducers,
  });
  
  return combinedReducer(state, action);
};

export default createReducer;
