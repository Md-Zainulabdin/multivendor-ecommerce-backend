import { Router } from "express";

import { registerVendor } from "../controllers/vendor.controllers.mjs";
import { updateUser } from "../controllers/user.controllers.mjs";
import { login } from "../controllers/login.controller.mjs";

import isAuthenticated from "../middlewares/auth.mjs";
import { isVendor } from "../middlewares/isVendor.mjs"

const router = Router();

router.route('/register').post(registerVendor)
router.route("/login").post(login)

//secured routes
app.use(isAuthenticated);
router.route('/update/:id').patch(updateUser);


export default router;