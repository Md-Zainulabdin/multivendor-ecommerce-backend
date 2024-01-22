import { ApiError } from "../utils/ApiError.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs"
import jwt from "jsonwebtoken";


const isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization");

        if (!token) {
            throw new ApiError("Authorization Denied", 401)
        };

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
});

export default isAuthenticated;