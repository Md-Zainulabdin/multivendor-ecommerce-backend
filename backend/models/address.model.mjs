import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
