const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "Registered"
    },
    gender: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel