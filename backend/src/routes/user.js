import express from 'express';
import UserController  from '.././controllers/UserController'
const router = express.Router();

//Get All Users
router.get('/',UserController.getAllUsers);

//Delete User
router.delete('/delete/:id',UserController.deleteUser);

export default router