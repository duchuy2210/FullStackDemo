import axios from 'axios';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from './authSlice';
import {
  deleteUsersFailed,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
  //Khi bâm đăng nhập
  dispatch(loginStart());
  try {
    //gửi request để lấy dữ liệu
    const res = await axios.post('http://localhost:8000/auth/login', user);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  //Khi bâm đăng nhập
  dispatch(registerStart());
  try {
    //gửi request để lấy dữ liệu
    await axios.post('http://localhost:8000/auth/register', user);
    dispatch(registerSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    //gửi request tới data lấy dữ liệu
    const res = await axios.get('http://localhost:8000/users', {
      headers: { token: `Bearer ${accessToken}` },
    });
    // console.log(res.data);
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUsersStart());
  try {
    //gửi request tới data xoá
    const res = await axios.delete(`http://localhost:8000/users/delete/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (error) {
    //Hiện ra lỗi kh thể xoá
    dispatch(deleteUsersFailed(error.response.data));
  }
};

export const logOut = async (dispatch, id, navigate, accessToken) => {
  dispatch(logOutStart());
  try {
    await axios.post("http://localhost:8000/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};
