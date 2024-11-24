const mongoose = require('mongoose');

const maidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    availability: { type: String, required: true },
    availabilityTime: { type: String, required: true },
    budgetMin: { type: Number, required: true },
    budgetMax: { type: Number, required: true },
    rating: { type: Number, required: true },
});

module.exports = mongoose.model('Maid', maidSchema);
