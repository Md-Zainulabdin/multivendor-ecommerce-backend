import { Router } from "express";

import { upload } from "../middlewares/multer.mjs";
import isAuthenticated from "../middlewares/auth.mjs";
import { isAdminOrVendor } from "../middlewares/isAdminOrVendor.mjs";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/product.controller.mjs"; // Adjust the path to your product controller
import { isAdminOrVendor } from "../middlewares/isAdminOrVendor.mjs";

const router = Router();

// Secured routes for vendors
router.use(isAuthenticated, isAdminOrVendor);

// Product routes
router.route('/create').post(upload.array("productImage", 5), createProduct);
router.route('/update/:id').patch(updateProduct);
router.route('/delete/:id').delete(deleteProduct);
router.route('/:id').get(getProductById);
router.route('/').get(getAllProducts);

export default router;
