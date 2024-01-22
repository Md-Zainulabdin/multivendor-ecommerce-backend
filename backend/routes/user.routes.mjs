import { Router } from "express";
import { app } from "../app.mjs"

import { registerUser, updateUser } from "../controllers/user.controllers.mjs";
import { login } from "../controllers/login.controller.mjs";

import isAuthenticated from "../middlewares/auth.mjs";


const router = Router();

router.route('/register').post(registerUser)
router.route("/login").post(login)

//secured routes
app.use(isAuthenticated);
router.route('/update/:id').patch(updateUser);



export default router;