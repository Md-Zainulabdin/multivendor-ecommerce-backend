import { ApiError } from "../utils/ApiError.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";

import User from "../models/user.model.mjs";

export const isVendor = asyncHandler(async (req, res, next) => {
    const vendorId = req.user?.id;

    if (!vendorId) {
        throw new ApiError("Unauthorized", 401)
    }

    const vendor = await User.findById(vendorId).select('role');

    if (vendor && (vendor.role !== "vendor")) {
        throw new ApiError("Unauthorized", 401)
    }

    next();
})