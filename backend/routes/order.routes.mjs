import { Router } from "express";

import isAuthenticated from "../middlewares/auth.mjs";
import { isAdminOrVendor } from "../middlewares/isAdminOrVendor.mjs";

const router = Router();

// Secured routes for vendors
router.use(isAuthenticated, isAdminOrVendor);

// order routes


export default router;
