const express = require('express');
const Maid = require('../models/maidSchema'); // Import Maid schema
const UserRequirement = require('../models/userSchema'); // Import UserRequirement schema
const router = express.Router();

router.post('/find-maids', async (req, res) => {
    try {
        // Save the user's requirements
        const userRequirement = new UserRequirement({
            serviceType: req.body.serviceType,
            location: req.body.location,
            experience: req.body.experience,
            availability: req.body.availability,
            availabilityTime: req.body.availabilityTime,
            budgetMin: req.body.budgetMin,
            budgetMax: req.body.budgetMax,
            rating: req.body.rating,
        });

        await userRequirement.save();

        // Find matching maids
        const matchedMaids = await Maid.find({
            serviceType: req.body.serviceType, // Exact match
            location: req.body.location, // Exact match
            experience: { $gte: req.body.experience }, // Equal to or more experience
            budgetMin: { $lte: req.body.budgetMax }, // Maid's min budget <= user's max budget
            budgetMax: { $gte: req.body.budgetMin }, // Maid's max budget >= user's min budget
            rating: { $gte: req.body.rating }, // Equal to or higher rating
        });

        // If there are matched maids, redirect to result page and pass data
        if (matchedMaids.length > 0) {
            res.redirect(`/maid-results?maids=${JSON.stringify(matchedMaids)}`);
        } else {
            res.status(404).json({ success: false, message: 'No maids matched your criteria' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error while finding maids', error: error.message });
    }
});

module.exports = router;
