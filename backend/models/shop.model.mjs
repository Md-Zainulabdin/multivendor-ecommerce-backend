import mongoose, { Schema } from "mongoose";

const shopSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter the shop name!"],
    },
    description: {
        type: String,
        required: [true, "Please enter a description for the shop!"],
    },
    logo: {
        type: String, // You can store the URL or file path of the logo
        default: null,
    },
    location: {
        type: String,
        required: [true, "Please enter the shop's location!"],
    },
    contact: {
        type: String,
        default: null,
    },
    // Link the shop to a vendor
    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'vendor', // Reference to the Vendor schema
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;