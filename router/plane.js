const express = require('express');
const router = express.Router();

// Route to render the plans page
router.get('/plans', (req, res) => {
  res.render('plans'); // Render the plans.ejs file
});

module.exports = router;
