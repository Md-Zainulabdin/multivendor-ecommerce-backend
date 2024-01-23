import { Router } from "express";

import { deleteVendor, getAllVendors, getVendorById, registerVendor } from "../controllers/vendor.controllers.mjs";
import { updateUser } from "../controllers/user.controllers.mjs";
import { loginVendor } from "../controllers/login.controller.mjs";

import isAuthenticated from "../middlewares/auth.mjs";
import { isVendor } from "../middlewares/isVendor.mjs"
import { upload } from "../middlewares/multer.mjs"

const router = Router();

router.route('/register').post(upload.single("avatar"), registerVendor)
router.route("/login").post(loginVendor)

//secured routes
router.use(isAuthenticated);
router.route('/update/:id').patch(updateUser);
router.route('/delete/:id').delete(deleteVendor);
router.route('/:id').get(getVendorById);
router.route('/').get(getAllVendors);


export default router;