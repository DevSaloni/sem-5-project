const express = require("express");
const router = express.Router();
const Maid = require("../models/maid");
const SignIn = require("../models/sigin");
const login = require("../models/Login");
const Login = require("../models/Login");


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

router.post('/sign-in', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Password confirmation check
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        // Create a new user
        const newUser = new SignIn({ username, email, password, confirmPassword });
        await newUser.save();
        res.json({ message: "User signed up successfully." });
    } catch (error) {
        // Error handling for duplicate or validation errors
        console.error("Error saving user:", error);
        if (error.code === 11000) { // Duplicate email error code
            res.status(400).json({ message: "Email already exists." });
        } else {
            res.status(500).json({ message: "An error occurred while signing up." });
        }
    }
});

router.post('/log-in' , async(req,res)=>{
    const {email} = req.body;
    const user = await Login.findOne({email});
    if(user){
        user.lastLogin = new Date();
        await user.save();
        res.json({message:"User logged in successfully!"})
    }else{
        res.status(400).json({ message: 'User not found!' });
    }
})


module.exports = router;
