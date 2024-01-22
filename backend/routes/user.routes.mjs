import { Router } from "express";

import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from "../controllers/user.controllers.mjs";
import { loginUser } from "../controllers/login.controller.mjs";

import isAuthenticated from "../middlewares/auth.mjs";


const router = Router();

router.route('/register').post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.use(isAuthenticated);
router.route('/update/:id').patch(updateUser);
router.route('/delete/:id').delete(deleteUser);
router.route('/:id').get(getUserById);
router.route('/').get(getAllUsers);



export default router;