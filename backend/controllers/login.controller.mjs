import User from "../models/user.model.mjs";

import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";

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
        throw new ApiError(401, "Invalid credentials")
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
})

export const logout = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})