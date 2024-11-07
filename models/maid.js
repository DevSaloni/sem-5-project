// models/Maid.js
const mongoose = require('mongoose');

const maidSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    experience: { type: String, required: true },
    aadharCard: { type: String, required: true },
    reference: { type: String },
    resume: { type: String, required: true },
    verified: { type: Boolean, default: false } // verification status
});

module.exports = mongoose.model('Maid', maidSchema);
