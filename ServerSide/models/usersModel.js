const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, default: "Registered" },
    gender: { type: String, default: "" },
    age: { type: Number, default: 0 }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);