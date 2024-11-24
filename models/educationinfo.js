const mongoose = require('mongoose');

const educationalInfoSchema = new mongoose.Schema({
    role : {
        type: String,
        enum: ['User' , 'Maid'],
        required: true,
    },
    highestQualification: {
        type: String,
        required: true,
        enum: [
            'no-formal-education', 
            'primary', 
            'secondary', 
            'high-school', 
            'undergraduate', 
            'postgraduate'
        ]
    },
    fieldOfStudy: {
        type: String,
        trim: true,
        required: true
    },
    schoolDetails: {
        schoolName: {
            type: String,
            trim: true,
            required: true
        },
        schoolLocation: {
            type: String,
            trim: true,
            required: true
        }
    },
    gradeDetails: {
        tenthGradePercentage: {
            type: String,
            trim: true,
            required: true
        },
        twelfthGradePercentage: {
            type: String,
            trim: true,
            required: true
        },
        tenthMarksheet: {
            type: String,
            required: true
        },
        twelfthMarksheet: {
            type: String,
            required: true
        }
    },
    additionalQualifications: {
        type: String,
        trim: true,
        required: true
    },
    otherDocuments: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('EducationalInfo', educationalInfoSchema);
