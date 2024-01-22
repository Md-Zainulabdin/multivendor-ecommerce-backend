import User from "../models/user.model.mjs"

import { asyncHandler } from "../utils/asyncHandler.mjs"
import { ApiError } from "../utils/ApiError.mjs"
import { ApiResponse } from "../utils/ApiResponse.mjs"

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

    const existedVendor = await User.findOne({ email });

    if (existedVendor) {
        throw new ApiError("Vendor with this email already exist", 409)
    }

    const vendor = await User.create({
        name,
        email,
        password,
        avatar: "",
        role: "vendor"
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
 * @route PUT /api/v1/vendors/update:id
 * @desc Update current vendors
 * @access private
 */

export const updateVendor = asyncHandler(async (req, res) => {

    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400)
    }

    const { name, email } = req.body;

    const vendorFields = {};

    if (name) vendorFields.name = name;
    if (email) vendorFields.email = email;

    let vendor = await User.findById(id);

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