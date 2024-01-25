import Address from "../models/address.model.mjs"

import { asyncHandler } from "../utils/asyncHandler.mjs"
import { ApiError } from "../utils/ApiError.mjs"
import { ApiResponse } from "../utils/ApiResponse.mjs"
import User from "../models/user.model.mjs";

/**
 * @route POST /api/v1/address/new-address
 * @desc Create a new Address
 * @access private 
 */

export const newAddress = asyncHandler(async (req, res) => {

    const { city, state, phoneNo, country, zipCode, } = req.body;

    if ([city, zipCode, state, phoneNo, country].some((field) => field.trim() == "")) {
        throw new ApiError("All fields are required!", 400);
    }

    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError('User not found', 401)
    }

    if (user.id !== req.user.id) {
        throw new ApiError("Unauthorized access.", 403);
    }

    const address = await Address.create({
        city,
        state,
        phoneNo,
        country,
        zipCode,
        user: userId,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            address,
            "Address Created Successfully"
        )
    )
});

/**
 * @route PATCH /api/v1/address/update/:id
 * @desc Update current address
 * @access private
 */

export const updateAddress = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const userId = req.user?.id;

    const { city, state, phoneNo, country, zipCode } = req.body;

    const addressFields = {};

    if (city) addressFields.city = city;
    if (state) addressFields.state = state;
    if (phoneNo) addressFields.phoneNo = phoneNo;
    if (country) addressFields.country = country;
    if (zipCode) addressFields.zipCode = zipCode;

    let address = await Address.findById(id);

    if (!address) {
        throw new ApiError("Address not found", 404);
    }

    if (userId.toString() !== address.user.toString()) {
        throw new ApiError("Unauthorized access.", 401)
    }

    address = await Address.findByIdAndUpdate(
        id,
        {
            $set: addressFields,
        },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, address, "Address updated successfully")
    );
});

/**
 * @route DELETE /api/v1/address/delete/:id
 * @desc delete current address
 * @access private
 */

export const deleteAddress = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const userId = req.user?.id;

    let address = await Address.findById(id);

    if (!address) {
        throw new ApiError("Address not found", 404);
    }

    if (userId.toString() !== address.user.toString()) {
        throw new ApiError("Unauthorized access.", 401)
    }

    await Address.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "Address deleted successfully")
    );
});


/**
 * @route GET /api/v1/address/:id
 * @desc get current address
 * @access private
 */

export const getAddressById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const userId = req.user?.id;

    let address = await Address.findById(id);

    if (!address) {
        throw new ApiError("Address not found", 404);
    }

    if (userId.toString() !== address.user.toString()) {
        throw new ApiError("Unauthorized access.", 401)
    }

    return res.status(200).json(
        new ApiResponse(200, address, "Address retrieved successfully")
    );
});
