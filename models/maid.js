const mongoose = require("mongoose");

const maidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    availabilityDate: { type: Date, required: true },
    availabilityTime: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: String, default: "" }  // Optional field, defaults to an empty string
});

// Create a Mongoose model
const Maid = mongoose.model('Maid', maidSchema);

// Export the Maid model
module.exports = Maid;
