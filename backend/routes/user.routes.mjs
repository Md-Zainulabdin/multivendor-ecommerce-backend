import { Router } from "express";

import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from "../controllers/user.controllers.mjs";
import { Login, updatePassword } from "../controllers/login.controller.mjs";

import isAuthenticated from "../middlewares/auth.mjs";


const router = Router();

router.route('/register').post(registerUser)
router.route("/login").post(Login)

//secured routes
router.use(isAuthenticated);
router.route('/update-account').patch(updateUser);
router.route('/change-password').patch(updatePassword);
router.route('/delete-account').delete(deleteUser);
router.route('/:id').get(getUserById);
router.route('/').get(getAllUsers);



export default router;