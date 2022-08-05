import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../services/axios";
import { showError } from "../../../helpers/notificationHelper";
import { defaultInitinalState } from "../../../helpers/storeHelper";
import { useSelector } from "react-redux";

export const getJobCandidates = (jobId) => (dispatch, getState) => {
  // const user = useSelector(({ auth }) => auth.user);
  if (getState().candidates.jobCandidate.loading) {
    return;
  }

  dispatch(setJobCandidatesLoading(true));

  axios
    .post(
      "/JobCandidates/ApplicationHistory",
      {
        cityId: -1,
        customerId: -1,
        jobAssignedtome: false,
        jobId: jobId,
        jobStatusId: 1,
        referrerUserId: -1,
        userId: 186,
      },
      {
        params: {
          username: "UXTeam@outlook.com",
          password: "12345",
        },
      }
      
    )
    .then((response) => {
      dispatch(setJobCandidates(response.data));
      dispatch(setJobCandidatesLoading(false));
    })
    .catch((err) => {
      dispatch(setJobCandidatesLoading(false));
      showError(err.message);
    });
};

const jobCandidatesAdapter = createEntityAdapter({});

export const {
  selectAll: selectJobCandidates,
  selectById: selectJobCandidateById,
} = jobCandidatesAdapter.getSelectors(
  (state) => state.candidates.jobCandidate
);

const jobCandidateSlice = createSlice({
  name: "candidates/jobCandidates",
  initialState: jobCandidatesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setJobCandidates: jobCandidatesAdapter.setAll,
    addJobCandidates: jobCandidatesAdapter.addOne,
    updateJobCandidates: jobCandidatesAdapter.upsertOne,
    removeJobCandidates: jobCandidatesAdapter.removeOne,
    setJobCandidatesLoading: (state, action) => {
      state.loading = action.payload;
    },
    //   openNewAttachmentTypeModal: (state, action) => {
    //     state.modal = {
    //       type: 'new',
    //       open: true,
    //       data: null,
    //     };
    //   },
    //   openEditAttachmentTypeModal: (state, action) => {
    //     state.modal = {
    //       type: 'edit',
    //       open: true,
    //       data: action.payload,
    //     };
    //   },
    //   closeAttachmentTypeModal: (state, action) => {
    //     state.modal = defaultInitinalState.modal;
    //   },
      setIsAttachmentTypeSubmitting: (state, action) => {
        state.isSubmitting = action.payload;
      },
  },
  extraReducers: {},
});

export const {
  setJobCandidates,
  addJobCandidates,
  updateJobCandidates,
  removeJobCandidates,
  setJobCandidatesLoading,
  // openNewAttachmentTypeModal,
  // openEditAttachmentTypeModal,
  // closeAttachmentTypeModal,
  setIsAttachmentTypeSubmitting
} = jobCandidateSlice.actions;

export default jobCandidateSlice.reducer;
