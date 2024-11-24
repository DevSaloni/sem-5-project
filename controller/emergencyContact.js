const EmergencyContact = require('../models/emergencyContact'); // Adjust the path as needed

// Function to save emergency contact data
const saveEmergencyContact = async (req, res) => {
    try {
        // Create a new document using request data
        const emergencyContact = new EmergencyContact({
            role:req.body.role,
            primaryContactName: req.body.primaryContactName,
            primaryContactRelation: req.body.primaryContactRelation,
            primaryContactPhone: req.body.primaryContactPhone,
            secondaryContactName: req.body.secondaryContactName,
            secondaryContactRelation: req.body.secondaryContactRelation,
            secondaryContactPhone: req.body.secondaryContactPhone,
            additionalContactName: req.body.additionalContactName || null,
            additionalContactRelation: req.body.additionalContactRelation || null,
            additionalContactPhone: req.body.additionalContactPhone || null,
        });

        // Save document to database
        await emergencyContact.save();
        res.status(201).send('Emergency contact information saved successfully');
    } catch (error) {
        console.error("Error saving emergency contact information:", error);

        // Check if it's a validation error
        if (error.name === 'ValidationError') {
            res.status(400).send("Validation error: " + error.message);
        } else {
            res.status(500).send("An error occurred while saving data.");
        }
    }
};

// Function to get all emergency contact data
const getEmergencyContacts = async (req, res) => {
    try {
        // Retrieve all documents from EmergencyContact collection
        const emergencyContacts = await EmergencyContact.find();
        res.status(200).json(emergencyContacts);
    } catch (error) {
        console.error("Error retrieving emergency contact information:", error);
        res.status(500).send("An error occurred while retrieving data.");
    }
};

module.exports = {
    saveEmergencyContact,
    getEmergencyContacts,
};
