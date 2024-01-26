import { Router } from "express";

import isAuthenticated from "../middlewares/auth.mjs";
import { checkoutSession } from "../controllers/stripe.controller.mjs";

const router = Router();

// order routes
router.route('/create-checkout-session').post(checkoutSession)

export default router;