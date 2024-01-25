import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: { type: String, required: [true, "Please enter your name!"], },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please enter your email!"],
    },
    password: { type: String, required: [true, "Please enter your password"], },
    role: {
        type: String,
        required: true,
        enum: ["user", "vendor", "admin"],
        default: "user"
    },
    avatar: {       // Only for vendors
        public_id: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// Hash Password

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// generate accesstoken

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        role: this.role,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
}

// compare password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
