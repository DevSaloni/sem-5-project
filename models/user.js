const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String,
        enum: ["user", "maid", "admin"], // Valid roles
        default: "user" // Default role if none is specified
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;
