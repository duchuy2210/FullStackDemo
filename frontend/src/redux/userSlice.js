import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'getUser',
  initialState: {
    getUsers: {
      //Lưu trữ dữ liệu của tất cả user
      allUsers: null,
      //Loading
      isFetching: false,
      error: false,
    },
    message: '',
  },
  reducers: {
    getUsersStart: state => {
      state.getUsers.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.getUsers.isFetching = false;
      state.getUsers.allUsers = action.payload;
    },
    getUsersFailed: state => {
      state.getUsers.isFetching = false;
      state.getUsers.error = true;
    },
    deleteUsersStart: state => {
      state.getUsers.isFetching = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.getUsers.isFetching = false;
      state.message = action.payload;
    },
    deleteUsersFailed: (state, action) => {
      state.getUsers.isFetching = false;
      state.getUsers.error = true;
      state.message = action.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailed,
} = userSlice.actions;
export default userSlice.reducer;
