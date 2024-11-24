const User = require("../models/user");
const bcrypt = require("bcrypt"); // Use bcrypt for password hashing

async function handleUsersSignUp(req, res) {
    try {
        const { username, email, password  , role } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        
        res.redirect("/");
    } catch (error) {
        return res.status(500).send("An error occurred during signup.");
    }
}

async function handleUsersLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists and password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }

        // Login successful
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: "An error occurred during login." });
    }
}

module.exports = {
    handleUsersSignUp,
    handleUsersLogin,
};
