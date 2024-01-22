import { Router } from "express";
import { registerVendor } from "../controllers/vendor.controllers.mjs";


const router = Router();

router.route('/register').post(registerVendor)
// router.route("/login").post()

//secured routes


export default router;