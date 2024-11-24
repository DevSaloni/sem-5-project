const PersonalInfo = require('../models/personalinfo');

// Function to save personal information
exports.savePersonalInfo = async (req, res) => {
    try {
        const personalInfo = new PersonalInfo(req.body);
        await personalInfo.save();
        res.status(201).json({ message: 'Personal information saved successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error saving personal information', error });
    }
};

// Function to retrieve personal information
exports.getPersonalInfo = async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.find();
        res.status(200).json(personalInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving personal information', error });
    }
};
