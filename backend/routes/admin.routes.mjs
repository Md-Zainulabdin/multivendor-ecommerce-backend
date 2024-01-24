import { Router } from "express";

import { Login, updatePassword } from "../controllers/login.controller.mjs";
import isAuthenticated from "../middlewares/auth.mjs";
import { registerAdmin } from "../controllers/admin.controller.mjs";


const router = Router();

router.route('/register').post(registerAdmin);
router.route("/login").post(Login);

//secured routes
router.use(isAuthenticated);
router.route('/change-password').patch(updatePassword);

export default router;
