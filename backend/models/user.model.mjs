import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

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
        enum: ["user", "vendor"],
        default: "user"
    },
    avatar: {
        type: String, // only for vendor's
        default: null,
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

// compare password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
