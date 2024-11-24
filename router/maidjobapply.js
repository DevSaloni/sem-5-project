const express = require('express');
const Maid = require('../models/maidSchema'); // Adjust path as per your structure
const router = express.Router();

router.post('/apply-job', async (req, res) => {
    try {
        // Convert required fields to numbers
        const experience = parseInt(req.body.experience, 10);
        const budgetMin = parseFloat(req.body.budgetMin);
        const budgetMax = parseFloat(req.body.budgetMax);
        const rating = parseInt(req.body.rating, 10);

        // Create a new maid record
        const newMaid = new Maid({
            name: req.body.fullName, 
            serviceType: req.body.serviceType,
            location: req.body.location,
            experience,
            availability: req.body.availability,
            availabilityTime: req.body.availabilityTime,
            budgetMin,
            budgetMax,
            rating,
        });

        // Save to database
        await newMaid.save();
        res.status(201).send('Application submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(400).send('Error while submitting application: ' + error.message);
    }
});

module.exports = router;
