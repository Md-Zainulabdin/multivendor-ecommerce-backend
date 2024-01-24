import { Router } from "express";

import { upload } from "../middlewares/multer.mjs"
import isAuthenticated from "../middlewares/auth.mjs";
import { isAdminOrVendor } from "../middlewares/isAdminOrVendor.mjs";
import { createShop, deleteShop, getAllShops, getShopById, updateShop } from "../controllers/shop.controller.mjs";


const router = Router();

//secured routes
router.use(isAuthenticated, isAdminOrVendor);
router.route('/create').post(upload.single("shopLogo") ,createShop);
router.route('/update/:id').patch(updateShop);
router.route('/delete/:id').delete(deleteShop);
router.route('/:id').get(getShopById);
router.route('/').get(getAllShops);

export default router;