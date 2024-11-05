const express = require("express");
const router = express.Router();
const Maid = require("../models/maid");

router.post('/add-maid', async (req, res) => {
    try {
        const { name, serviceType, location, experience, availableDate, availableTime, budgetPerHour, rating } = req.body;

        const newMaid = new Maid({
            name,
            serviceType,
            location,
            experience,
            availableDate,
            availableTime,
            budgetPerHour,
            rating
        });

        await newMaid.save();
        res.status(201).send("Maid data added successfully.");
    } catch (err) {
        console.error("Error adding maid data:", err);
        res.status(500).send("Error adding maid data");
    }
});

router.get('/search-maid', async (req, res) => {
    try {
        const { serviceType, location, experience, availableDate, availableTime, budgetMin, budgetMax, rating } = req.query;

        const query = {
            ...(serviceType && { serviceType }),
            ...(location && { location }),
            ...(experience && { experience }),
            ...(availableDate && { availableDate }),
            ...(availableTime && { availableTime }),
            ...(rating && { rating: { $gte: parseInt(rating) } }),
            ...(budgetMin && budgetMax && { hourlyRate: { $gte: parseInt(budgetMin), $lte: parseInt(budgetMax) } }) // Changed to hourlyRate to match schema
        };

        const results = await Maid.find(query);
        res.render('search-result', { results });
    } catch (err) {
        console.error("Error searching for maid data:", err);
        res.status(500).send("An error occurred while searching for maid.");
    }
});

module.exports = router;
