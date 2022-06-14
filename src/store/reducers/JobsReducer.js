import {
} from '../actions/JobsActions';
import {
    GET_JOBOPENINGS
  } from '../actions/JobTypes';
const initialState = {
    jobOpenings: {
        shortName: '',
        jobDescription: '',
        genderId: '',
        referenceCode: '',
        createDate: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

export function JobsReducer(state = initialState, action) {
    if (action.type === GET_JOBOPENINGS) {
        return {
            ...state,
            jobOpenings: action.payload,
            errorMessage: '',
            successMessage: 'Job openings Successfully get',
            showLoading: false,
        };
    }
    return state;
}

    
