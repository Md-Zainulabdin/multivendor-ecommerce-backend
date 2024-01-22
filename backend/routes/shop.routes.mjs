import { Router } from "express";

import isAuthenticated from "../middlewares/auth.mjs";
import { isVendor } from "../middlewares/isVendor.mjs";
import { createShop, deleteShop, getAllShops, getShopById, updateShop } from "../controllers/shop.controller.mjs";

const router = Router();

//secured routes
router.use(isAuthenticated, isVendor);
router.route('/create').post(createShop);
router.route('/update/:id').patch(updateShop);
router.route('/delete/:id').delete(deleteShop);
router.route('/:id').get(getShopById);
router.route('/').get(getAllShops);

export default router;