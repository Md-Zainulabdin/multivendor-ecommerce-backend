import { Router } from "express";
import isAuthenticated from "../middlewares/auth.mjs";
import {
    newAddress,
    updateAddress,
    deleteAddress,
    getAddressById
} from "../controllers/address.controller.mjs"; // Adjust the path to your address controller

const router = Router();

// Secured route for users (no need for vendor or admin middleware as per your requirement)
router.use(isAuthenticated);

// Address routes
router.route('/new-address').post(newAddress);
router.route('/update/:id').patch(updateAddress);
router.route('/delete/:id').delete(deleteAddress);
router.route('/:id').get(getAddressById);

export default router;
