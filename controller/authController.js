const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.userLoginForMaidSearch = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists and their role is "user"
        const user = await User.findOne({ email, role: "user" });
        if (!user) {
            return res.status(400).send("User not found or not authorized for this action.");
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid email or password.");
        }

        // If everything is correct, redirect to the maid search form
        res.redirect("/maid-search-form");
    } catch (error) {
        console.error("Error during user login for maid search:", error);
        res.status(500).send("An error occurred during login. Please try again later.");
    }
};
