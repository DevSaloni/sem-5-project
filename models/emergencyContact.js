const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    role : {
        type: String,
        enum: ['User' , 'Maid'],
        required: true,
    },
    primaryContactName: {
        type: String,
        required: true,
        trim: true
    },
    primaryContactRelation: {
        type: String,
        required: true,
        trim: true
    },
    primaryContactPhone: {
        type: String, // Changed to String
        required: true,
        match: [/^\d{10}$/, 'Primary contact phone number must be a 10-digit number']
    },
    secondaryContactName: {
        type: String,
        required:true,
        trim: true
    },
    secondaryContactRelation: {
        type: String,
        required: true,
        trim: true
    },
    secondaryContactPhone: {
        type: String, // Changed to String
        required: true,
        match: [/^\d{10}$/, 'Secondary contact phone number must be a 10-digit number']
    },
    additionalContactName: {
        type: String,
        trim: true
    },
    additionalContactRelation: {
        type: String,
        trim: true
    },
    additionalContactPhone: {
        type: String, // Changed to String
        match: [/^\d{10}$/, 'Additional contact phone number must be a 10-digit number'],
        required: false
    }
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
