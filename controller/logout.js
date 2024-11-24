// Controller function to handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }

        // Redirect or send a logout confirmation
        res.send('You are Successfully logout..');
    });
};
