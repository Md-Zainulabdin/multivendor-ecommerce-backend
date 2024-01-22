import User from "../models/user.model.mjs"

import { asyncHandler } from "../utils/asyncHandler.mjs"
import { ApiError } from "../utils/ApiError.mjs"
import { ApiResponse } from "../utils/ApiResponse.mjs"

/**
 * @route POST /api/v1/users/register
 * @desc Create a new user
 * @access public
 */


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field.trim() == "")) {
        throw new ApiError("All fields are required!", 400)
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError("User with this email already exist", 409)
    }

    const user = await User.create({
        name,
        email,
        password,
        role: "user"
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

/**
 * @route PUT /api/v1/user/update:id
 * @desc Update current user
 * @access private
 */

export const updateUser = asyncHandler(async (req, res) => {

    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400)
    }

    const { name, email } = req.body;

    const userFields = {};

    if (name) userFields.name = name;
    if (email) userFields.email = email;

    let user = await User.findById(id);

    if (!user) {
        throw new ApiError("User not found", 400)
    }

    if (user.id !== req.user.id) {
        throw new ApiError("Authorization failed", 401)
    }

    user = await User.findByIdAndUpdate(
        id,
        {
            $set: userFields
        },
        { new: true },
    ).select("-password")

    return res.status(200).json(
        new ApiResponse(200, user, "User updated Successfully")
    )

})