import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../../helpers/storeHelper';

export const getRoles = () => (dispatch, getState) => {
  if (getState().userApp.roles.loading) {
    return;
  }

  dispatch(setRolesLoading(true));

  axios.get('/Users/Role')
  .then((response) => {
    dispatch(setRoles(response.data));
    dispatch(setRolesLoading(false));
  })
  .catch((err) => {
    dispatch(setRolesLoading(false));
    showError(err.message);
  });
}

const rolesAdapter = createEntityAdapter({});

export const {
  selectAll: selectRoles,
  selectById: selectRoleById
} = rolesAdapter.getSelectors(
  (state) => state.userApp.roles
);

const rolesSlice = createSlice({
  name: 'userApp/roles',
  initialState: rolesAdapter.getInitialState(defaultInitinalState),
  reducers: {
    setRoles: rolesAdapter.setAll,
    setRolesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setRoles,
  setRolesLoading
} = rolesSlice.actions;

export default rolesSlice.reducer;
