import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Please enter the product name!"]
    },
    productDescription: {
        type: String,
        required: [true, "Please enter the product description!"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price!"]
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Vendor schema
        required: [true, "Please provide the vendor information!"]
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop', // Reference to the Shop schema
        required: [true, "Please provide the shop information!"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
    },
    category: {
        type: String,
        required: [true, "Please enter the product category!"],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Sports",
            ],
            message: "Please select correct category",
        }
    },
    ratings: {
        type: Number,
        default: 0,
    },
    productImages: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
