
const User = require('../models/user'); // Import the User model

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Step 1: Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("Invalid username or password!"); // User not found
        }

        // Step 2: Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send("Invalid username or password!"); // Password does not match
        }

        // Step 3: If credentials are valid, redirect to the maid search form
        return res.redirect("/maid-search-results"); // Redirect to results page
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login.");
    }
};




