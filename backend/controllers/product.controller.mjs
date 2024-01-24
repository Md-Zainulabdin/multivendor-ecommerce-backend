import Product from "../models/product.model.mjs";

import { asyncHandler } from "../utils/asyncHandler.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { uploadOnCloudinary } from "../utils/cloudinary.mjs"


/**
 * @route POST /api/v1/products/create
 * @desc Create a new Product
 * @access private only vendor can create product
 */
export const createProduct = asyncHandler(async (req, res) => {
    const { productName, productDescription, price, category, stock } = req.body;

    if ([productName, productDescription, price, category, stock].some((field) => field.trim() === "")) {
        throw new ApiError("All fields are required!", 400);
    }

    const vendorId = req.user?.id;
    const shopId = req.body.shopId; // Make sure you pass the shopId in the request body

    const files = req.files;

    if (!files) {
        throw new ApiError('No file uploaded', 400)
    }

    // Handle each file
    const imageUrls = await Promise.all(files.map(async (file) => {
        const uploadedFile = await uploadOnCloudinary(file.path, "Product-Images");
        return {
            public_id: uploadedFile?.public_id,
            url: uploadedFile?.secure_url
        };
    }));

    const product = await Product.create({
        productName,
        productDescription,
        price,
        vendor: vendorId,
        shop: shopId,
        productImages: imageUrls, // Assuming you're uploading a single image
        category,
        ratings: 4,
        stock,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            product,
            "Product Created Successfully"
        )
    );
});

/**
 * @route PATCH /api/v1/products/update/:id
 * @desc Update current product
 * @access private
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const vendorId = req.user?.id;

    const { productName, productDescription, price, category, stock, ratings, } = req.body;

    const productFields = {};

    if (productName) productFields.productName = productName;
    if (productDescription) productFields.productDescription = productDescription;
    if (price) productFields.price = price;
    if (category) productFields.category = category;
    if (stock) productFields.stock = stock;
    if (ratings) productFields.ratings = ratings;

    let product = await Product.findById(id);

    if (!product) {
        throw new ApiError("Product not found", 404);
    }

    if (vendorId.toString() !== product.vendor.toString()) {
        throw new ApiError("Unauthorized access.", 401);
    }

    product = await Product.findByIdAndUpdate(
        id,
        {
            $set: productFields,
        },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, product, "Product updated successfully")
    );
});

/**
 * @route DELETE /api/v1/products/delete/:id
 * @desc delete current product
 * @access private
 */
export const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const vendorId = req.user?.id;

    let product = await Product.findById(id);

    if (!product) {
        throw new ApiError("Product not found", 404);
    }

    if (vendorId.toString() !== product.vendor.toString()) {
        throw new ApiError("Unauthorized access.", 401);
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "Product deleted successfully")
    );
});

/**
 * @route GET /api/v1/products/:id
 * @desc get current product
 * @access private
 */
export const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError("Id is required!", 400);
    }

    const vendorId = req.user?.id;

    let product = await Product.findById(id);

    if (!product) {
        throw new ApiError("Product not found", 404);
    }

    if (vendorId.toString() !== product.vendor.toString()) {
        throw new ApiError("Unauthorized access.", 401);
    }

    return res.status(200).json(
        new ApiResponse(200, product, "Product retrieved successfully")
    );
});

/**
 * @route GET /api/v1/products
 * @desc get all products
 * @access private
 */
export const getAllProducts = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new ApiError("Unauthorized access", 401);
    }

    const products = await Product.find();

    return res.status(200).json(
        new ApiResponse(200, products, "All products retrieved successfully")
    );
});
