import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import PostsReducer from './reducers/PostsReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import {JobsReducer} from './reducers/JobsReducer';
import { CandidateStatusReducer } from './reducers/definitions/CandidateStatusReducer';
import { EducationLevelReducer } from './reducers/definitions/EducationLevelReducer';

//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    posts: PostsReducer,
    auth: AuthReducer,
	//form: reduxFormReducer,
    jobs:JobsReducer,
    candidateStatus: CandidateStatusReducer,
    educationLevel: EducationLevelReducer,
});

//const store = createStore(rootReducers);

export const store = createStore(reducers,  composeEnhancers(middleware));
