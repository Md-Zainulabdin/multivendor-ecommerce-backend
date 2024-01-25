import User from "../models/user.model.mjs";
import Shop from "../models/shop.model.mjs";

import { asyncHandler } from "../utils/asyncHandler.mjs"
import { ApiError } from "../utils/ApiError.mjs"
import { ApiResponse } from "../utils/ApiResponse.mjs"
import { uploadOnCloudinary } from "../utils/cloudinary.mjs"

/**
 * @route POST /api/v1/shops/create
 * @desc Create a new Shop
 * @access private only vendor can create shop
 */

export const createShop = asyncHandler(async (req, res) => {
    const { name, description, location, contact } = req.body;

    if ([name, description, location, contact].some((field) => field.trim() == "")) {
        throw new ApiError("All fields are required!", 400)
    }

    const vendorId = req.user?.id;
    const vendor = await User.findById(vendorId);

    if (!vendor) {
        throw new ApiError('Vendor not found', 401)
    }

    if (vendor.id !== req.user.id) {
        throw new ApiError("Unauthorized access.", 403);
    }

    const logoLocalPath = req.file?.path;

    if (!logoLocalPath) {
        throw new ApiError(400, "Logo file is required");
    }

    const logo = await uploadOnCloudinary(logoLocalPath, "shops-logo")

    const shop = await Shop.create({
        name,
        description,
        shopLogo: {
            public_id: logo.public_id,
            url: logo.secure_url
        },
        location,
        contact,
        Owner: vendorId
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            shop,
            "Shop Created Successfully"
        )
    )
});

/**
 * @route PATCH /api/v1/shops/update/:id
 * @desc Update current shop
 * @access private
 */


export const updateShop = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const vendorId = req.user?.id;

    const { name, description, location, contact } = req.body;

    const shopFields = {};

    if (name) shopFields.name = name;
    if (description) shopFields.description = description;
    if (location) shopFields.location = location;
    if (contact) shopFields.contact = contact;

    let shop = await Shop.findById(id);

    if (!shop) {
        throw new ApiError("Shop not found", 404);
    }

    if (vendorId.toString() !== shop.Owner.toString()) {
        throw new ApiError("Unauthorized access.", 401)
    }

    shop = await Shop.findByIdAndUpdate(
        id,
        {
            $set: shopFields,
        },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, shop, "Shop updated successfully")
    );
});

/**
 * @route DELETE /api/v1/shops/delete/:id
 * @desc delete current shop
 * @access private
 */

export const deleteShop = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const vendorId = req.user?.id;

    let shop = await Shop.findById(id);

    if (!shop) {
        throw new ApiError("Shop not found", 404);
    }

    if (vendorId.toString() !== shop.Owner.toString()) {
        throw new ApiError("Unauthorized access.", 401)
    }

    await Shop.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "Shop deleted successfully")
    );
});

/**
 * @route GET /api/v1/shops/:id
 * @desc get current shop
 * @access private
 */


export const getShopById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const vendorId = req.user?.id;

    let shop = await Shop.findById(id);

    if (!shop) {
        throw new ApiError("Shop not found", 404);
    }

    if (vendorId.toString() !== shop.Owner.toString()) {
        throw new ApiError("Unauthorized access.", 401)
    }

    return res.status(200).json(
        new ApiResponse(200, shop, "Shop retrieved successfully")
    );
});

/**
 * @route GET /api/v1/shops
 * @desc get all shops
 * @access private only admin
 */


export const getAllShops = asyncHandler(async (req, res) => {
    if (req.user?.role !== 'admin') {
        throw new ApiError("Unauthorized access", 401);
    }
    const shops = await Shop.find();

    return res.status(200).json(
        new ApiResponse(200, shops, "All shops retrieved successfully")
    );
});