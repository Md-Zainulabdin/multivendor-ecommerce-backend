import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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
    category: {
        type: String,
        required: [true, "Please enter the product category!"]
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
