import { Router } from "express";

import isAuthenticated from "../middlewares/auth.mjs";

const router = Router();

// Secured routes for vendors
router.use(isAuthenticated);

// order routes
router.route('/create-order').post()

export default router;
