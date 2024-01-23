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

    const createdUser = await User.findById(user._id).select("-password -avatar");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

/**
 * @route PATCH /api/v1/users/update:id
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
        throw new ApiError("User not found", 404)
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
    ).select("-password -avatar")

    return res.status(200).json(
        new ApiResponse(200, user, "User updated Successfully")
    )

})

/**
 * @route DELETE /api/v1/users/delete/:id
 * @desc Delete current user
 * @access private
 */

export const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    let user = await User.findById(id);

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    if (user.id !== req.user.id) {
        throw new ApiError("Authorization failed", 401);
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "User deleted successfully")
    );
});

/**
 * @route GET /api/v1/users/:id
 * @desc Get user by ID
 * @access private
 */

export const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    let user = await User.findById(id).select("-password -avatars");

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    if (user.id !== req.user.id) {
        throw new ApiError("Authorization failed", 401);
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User retrieved successfully")
    );
});

/**
 * @route GET /api/v1/users
 * @desc Get all users
 * @access private only admin
 */

export const getAllUsers = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new ApiError("Unauthorized access", 401);
    }

    const users = await User.find().select("-password");

    return res.status(200).json(
        new ApiResponse(200, users, "All users retrieved successfully")
    );
});
