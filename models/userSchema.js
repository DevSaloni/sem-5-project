const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    serviceType: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    availability: { type: String, required: true },
    availabilityTime: { type: String, required: true },
    budgetMin: { type: Number, required: true },
    budgetMax: { type: Number, required: true },
    rating: { type: Number, required: true },
});

module.exports = mongoose.model('UserRequirement', userSchema);
