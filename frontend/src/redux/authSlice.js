import { createSlice } from '@reduxjs/toolkit';

/*
createSlice return name, reducer, actions, getInitialState()
*/
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      //Lưu trữ dữ liệu của user đăng nhập
      currentUser: null,
      //Loading
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    //Bắt đầu login, bật loading
    loginStart: state => {
      state.login.isFetching = true;
    },
    //Khi thành công
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
    },
    loginFailed: state => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: state => {
      state.register.isFetching = true;
    },
    //Khi thành công
    registerSuccess: state => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: state => {
      state.login.isFetching = false;
      state.login.error = true;
      state.register.success = false;
    },
    logOutStart: state => {
      state.login.isFetching = true;
    },
    logOutSuccess: state => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logOutFailed: state => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});
export const {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutSuccess,
  logOutFailed,
  logOutStart,
} = authSlice.actions;
export default authSlice.reducer;
