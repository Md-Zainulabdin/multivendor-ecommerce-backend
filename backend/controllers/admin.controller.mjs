import User from "../models/user.model.mjs"

import { asyncHandler } from "../utils/asyncHandler.mjs"
import { ApiError } from "../utils/ApiError.mjs"
import { ApiResponse } from "../utils/ApiResponse.mjs"

/**
 * @route POST /api/v1/admins/register
 * @desc Create a new admin
 * @access public
 */


export const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field.trim() == "")) {
        throw new ApiError("All fields are required!", 400)
    }

    const existedAdmin = await User.findOne({ email });

    if (existedAdmin) {
        throw new ApiError("User with this email already exist", 409)
    }

    const admin = await User.create({
        name,
        email,
        password,
        role: "admin"
    });

    const createdAdmin = await User.findById(admin._id).select("-password -avatar");

    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while registering the admin")
    }

    return res.status(201).json(
        new ApiResponse(200, createdAdmin, "Admin registered Successfully")
    )
})