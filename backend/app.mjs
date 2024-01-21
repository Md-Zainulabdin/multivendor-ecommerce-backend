import express from "express";
import dotenv from "dotenv"
import cors from "cors";

// Initiliza express app
const app = express();

// middleware to parse data coming from frontend
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: "config/.env",
    });
}


export { app };