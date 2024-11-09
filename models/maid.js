// models/Maid.js
const mongoose = require("mongoose");

const maidSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  experience: { type: String, required: true },
  aadharCard: { type: String, required: false },
  reference: { type: String },
  resume: { type: String, required: false },
  verified: { type: Boolean, default: false }, // verification status
});

module.exports = mongoose.model("Maid", maidSchema);
