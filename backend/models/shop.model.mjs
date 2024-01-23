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
    shopLogo: {
        public_id: {
            type: String,
            required: [true, "Please provide the public ID for the shop logo!"],
        },
        url: {
            type: String,
            required: [true, "Please provide the URL for the shop logo!"],
        },
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
        ref: 'User', // Reference to the Vendor schema
        required: [true, "Please provide the vendor information!"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
