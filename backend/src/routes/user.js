import express from 'express';
import UserController  from '.././controllers/UserController'
import verifyToken from '../middlewares/verifyToken';
import verifyUser from '../middlewares/verifyUser';
const router = express.Router();

//Get All Users
router.get('/',verifyToken,UserController.getAllUsers);

//Delete User
router.delete('/delete/:id',verifyUser,UserController.deleteUser);

export default router