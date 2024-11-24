const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['User', 'Maid'],
        required: true,
    },
    aadharNumber: {
        type: String,
        required: [true, 'Aadhar card number is required'],
    },
    rationCardNumber: {
        type: String,
        required: [true, 'Ration card number is required'],
    },
    accountNumber: {
        type: String,
        required: [true, 'Bank account number is required'],
    },
    panNumber: {
        type: String,
        required: [true, 'PAN card number is required'],
    },
    voterId: {
        type: String,
        required: [true, 'Voter ID number is required'],
    },
    aadharUpload: {
        type: String,
        required: [true, 'Aadhar card upload is required'],
    },
    rationUpload: {
        type: String,
        required: [true, 'Ration card upload is required'],
    },
    passbookUpload: {
        type: String,
        required: [true, 'Bank passbook upload is required'],
    },
    panUpload: {
        type: String,
        required: [true, 'PAN card upload is required'],
    },
    voterIdUpload: {
        type: String,
        required: [true, 'Voter ID upload is required'],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);
