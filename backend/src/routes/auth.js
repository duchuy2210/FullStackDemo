import express from 'express';
import AuthController from '../controllers/AuthController';
const router = express.Router();

//Register
router.post("/register",AuthController.registerUser)

//Login
router.post("/login",AuthController.loginUser)

export default router