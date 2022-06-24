import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from '../../../../../services/axios';
import { showError } from '../../../../helpers/notificationHelper';

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

const initialState = {
  loading: false,
};

const usersSlice = createSlice({
  name: 'userApp/users',
  initialState: usersAdapter.getInitialState(initialState),
  reducers: {
    setUsers: usersAdapter.setAll,
    addUser: usersAdapter.addOne,
    updateUser: usersAdapter.upsertOne,
    removeUser: usersAdapter.removeOne,
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
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
} = usersSlice.actions;

export default usersSlice.reducer;
