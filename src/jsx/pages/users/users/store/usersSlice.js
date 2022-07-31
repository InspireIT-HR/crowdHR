import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';
import { defaultInitinalState } from '../../../../helpers/storeHelper';

export const getUsers = () => (dispatch, getState) => {
  if (getState().userApp.users.loading) {
    return;
  }

  dispatch(setUsersLoading(true));

  axios.get('/Users/GetAll')
  .then((response) => {
    dispatch(setUsers(response.data));
    dispatch(setUsersLoading(false));
  })
  .catch((err) => {
    dispatch(setUsersLoading(false));
    showError(err.message);
  });
}

const usersAdapter = createEntityAdapter({});

export const {
  selectAll: selectUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(
  (state) => state.userApp.users
);

const usersSlice = createSlice({
  name: 'userApp/users',
  initialState: usersAdapter.getInitialState({
    ...defaultInitinalState,
    filters: {
      name: {
        selectedValue: ''
      },
      role: {
        values: [],
        selectedValue: ''
      }
    }
  }),
  reducers: {
    setUsers: (state, action) => {
      usersAdapter.setAll(state, action.payload);
      const roles = {};
      action.payload.forEach((user) => {
        roles[user.role.id] = {
          ...user.role,
          displayValue: user.role.description // Gonna update with translation
        };
      });
      state.filters.role.values = [
        {
          id: 0,
          description: '',
          displayValue: 'All'
        },
        ...Object.values(roles)
      ];
    },
    addUser: usersAdapter.addOne,
    updateUser: usersAdapter.upsertOne,
    removeUser: usersAdapter.removeOne,
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilterField: (state, action) => {
      const fieldName = action.payload.field;
      const fieldValue = action.payload.value;
      state.filters[fieldName].selectedValue = fieldValue;
    },
  },
  extraReducers: {},
});

export const {
  setUsers,
  addUser,
  updateUser,
  removeOne,
  setUsersLoading,
  setFilterField,
} = usersSlice.actions;

export default usersSlice.reducer;
