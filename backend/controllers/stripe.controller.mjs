import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.mjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutSession = asyncHandler(async (req, res) => {

    const { products } = ree.body;

    const line_items = products.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
                images: [item.image],
                description: item.description,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        // Remove the payment_method_types parameter
        // to manage payment methods in the Dashboard
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
    });
    res.send({ url: session.url })
})
