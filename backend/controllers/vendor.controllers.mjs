import User from "../models/user.model.mjs"

import { asyncHandler } from "../utils/asyncHandler.mjs"
import { ApiError } from "../utils/ApiError.mjs"
import { ApiResponse } from "../utils/ApiResponse.mjs"
import { uploadOnCloudinary } from "../utils/cloudinary.mjs"

/**
 * @route POST /api/v1/vendors/register
 * @desc Create a new vendor
 * @access public
 */


export const registerVendor = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field.trim() == "")) {
        throw new ApiError("All fields are required!", 400)
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const existedVendor = await User.findOne({ email });

    if (existedVendor) {
        throw new ApiError("Vendor with this email already exist", 409)
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const vendor = await User.create({
        name,
        email,
        password,
        role: "vendor",
        avatar: {
            public_id: avatar.public_id,
            url: avatar.secure_url
        }
    });

    const createdVendor = await User.findById(vendor._id).select("-password");

    if (!createdVendor) {
        throw new ApiError(500, "Something went wrong while registering the vendor")
    }

    return res.status(201).json(
        new ApiResponse(200, createdVendor, "Vendor registered Successfully")
    )
})

/**
 * @route PATCH /api/v1/vendors/update:id
 * @desc Update current vendors
 * @access private
 */

export const updateVendor = asyncHandler(async (req, res) => {

    const { name, email } = req.body;

    const vendorFields = {};

    if (name) vendorFields.name = name;
    if (email) vendorFields.email = email;

    let vendor = await User.findById(req.user?.id);

    if (vendor.role !== "vendor") {
        throw new ApiError("Invalid request", 400)
    }

    if (!vendor) {
        throw new ApiError("Vendor not found", 404)
    }

    if (vendor.id !== req.user?.id) {
        throw new ApiError("Authorization failed", 401)
    }

    vendor = await User.findByIdAndUpdate(
        id,
        {
            $set: vendorFields
        },
        { new: true },
    ).select("-password")

    return res.status(200).json(
        new ApiResponse(200, vendor, "Vendor updated Successfully")
    )

})

/**
 * @route DELETE /api/v1/vendors/delete/:id
 * @desc Delete a vendor
 * @access private
 */

export const deleteVendor = asyncHandler(async (req, res) => {

    let vendor = await User.findById(req.user?.id);

    if (!vendor) {
        throw new ApiError("Vendor not found", 404);
    }

    if (vendor.role !== "vendor") {
        throw new ApiError("Invalid request", 400);
    }

    if (vendor.id !== req.user?.id) {
        throw new ApiError("Authorization failed", 401);
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "Vendor deleted successfully")
    );
});

/**
 * @route GET /api/v1/vendors/:id
 * @desc Get a vendor by ID
 * @access private
 */

export const getVendorById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    let vendor = await User.findById(id).select("-password");

    if (!vendor) {
        throw new ApiError("Vendor not found", 404);
    }

    if (vendor.role !== "vendor") {
        throw new ApiError("Invalid request", 400);
    }

    if (vendor.id !== req.user?.id) {
        throw new ApiError("Authorization failed", 401);
    }

    return res.status(200).json(
        new ApiResponse(200, vendor, "Vendor retrieved successfully")
    );
});

/**
 * @route GET /api/v1/vendors
 * @desc Get all vendors only admin
 * @access private
 */

export const getAllVendors = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new ApiError("Unauthorized access", 401);
    }

    const vendors = await User.find({ role: 'vendor' }).select("-password");

    return res.status(200).json(
        new ApiResponse(200, vendors, "All vendors retrieved successfully")
    );
});
