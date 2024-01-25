import User from "../models/user.model.mjs";

import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";

import bcrypt from "bcryptjs"

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError("User not found", 401);


        const accessToken = user.generateAccessToken();
        return { accessToken }
    } catch (error) {
        throw new ApiError("Something went wrong while generating token",)
    }
}

/**
 * @route POST /api/v1/users || vendors/login
 * @desc Logged in user
 * @access public
 */

export const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email && !password) {
        throw new ApiError("Email & Password are required!", 400)
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError("Not found", 404)
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid credentials")
    }

    const { accessToken } = await generateToken(user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200, {
                token: accessToken
            },
                `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in Successfully`
            )
        )
});

export const logout = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
});

/**
 * @route PATCH /api/v1/users || vendors/change-password
 * @desc Update current user password
 * @access private
 */

export const updatePassword = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user?.id).select("+password");

    const { currentPassword, newPassword } = req.body;


    if (!currentPassword && !newPassword) {
        return new ApiError("Please provide a Current Password and New Password", 400)
    }

    // Check if the provided current password matches the stored hashed password
    const isPasswordMatched = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isPasswordMatched) {
        throw new ApiError("Old password is incorrect", 400);
    }

    // Hash the new password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user = await User.findByIdAndUpdate(
        req.user?.id,
        {
            $set: {
                password: hashPassword
            }
        }
    )

    res.status(200).json(
        new ApiResponse(200, "Password updated Successfully")
    );
});