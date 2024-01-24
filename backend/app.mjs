import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";

// Initiliza express app
const app = express();

// middleware to parse data coming from frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: "config/.env",
    });
}

// Import routes
import adminRoutes from './routes/admin.routes.mjs';
import userRoutes from './routes/user.routes.mjs';
import vendorRoutes from './routes/vendor.routes.mjs';
import shopRoutes from './routes/shop.routes.mjs';
import productRoutes from './routes/product.routes.mjs';

app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/shops", shopRoutes);
app.use("/api/v1/products", productRoutes);


export { app };