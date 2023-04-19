import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlide';
import userReducer from './userSlide';
export default configureStore({
  reducer: {
    auth:authReducer,
    users:userReducer
  },
});
