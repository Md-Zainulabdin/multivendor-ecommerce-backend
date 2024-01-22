import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.mjs";


const router = Router();

router.route('/register').post(registerUser)
// router.route("/login").post()

//secured routes




export default router;