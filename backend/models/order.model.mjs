import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
    shippingInfo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Address",
    },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    quantity: { type: Number, default: 1 },
    orderStatus: {
        type: String,
        default: "Processing",
    },
    orderItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
        },
    ],
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        taxPaid: {
            type: Number,
            required: true,
        },
        amountPaid: {
            type: Number,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});



const Order = mongoose.model('Order', orderSchema);

export default Order;