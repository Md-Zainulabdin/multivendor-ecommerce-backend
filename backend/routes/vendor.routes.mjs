import { Router } from "express";

import { deleteVendor, getAllVendors, getVendorById, registerVendor } from "../controllers/vendor.controllers.mjs";
import { updateUser } from "../controllers/user.controllers.mjs";
import { Login, updatePassword } from "../controllers/login.controller.mjs";

import isAuthenticated from "../middlewares/auth.mjs";
import { upload } from "../middlewares/multer.mjs"
import { isAdminOrVendor } from "../middlewares/isAdminOrVendor.mjs";

const router = Router();

router.route('/register').post(upload.single("avatar"), registerVendor)
router.route("/login").post(Login)

//secured routes
router.use(isAuthenticated, isAdminOrVendor);
router.route('/update-account').patch(updateUser);
router.route('/change-password').patch(updatePassword);
router.route('/delete-account').delete(deleteVendor);
router.route('/:id').get(getVendorById);
router.route('/').get(getAllVendors);


export default router;