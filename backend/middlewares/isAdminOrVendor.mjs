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
});

// middleware that check current user is admin or vendor

export const isAdminOrVendor = asyncHandler(async (req, res, next) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError("Unauthorized", 401);
    }

    const user = await User.findById(userId).select('role');

    if (!user || (user.role !== "vendor" && user.role !== "admin")) {
        throw new ApiError("Unauthorized", 401);
    }

    next();
});