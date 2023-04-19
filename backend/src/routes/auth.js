import express from 'express';
import AuthController from '../controllers/AuthController';
const router = express.Router();

//Register
router.post("/register",AuthController.registerUser)

//Login
router.post("/login",AuthController.loginUser)

//Refresh Token
router.post("/refresh",AuthController.requestRefreshToken)

//Logout
router.post("/logout",AuthController.logoutUser)

export default router