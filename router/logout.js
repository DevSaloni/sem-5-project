const express = require('express');
const { logout } = require('../controller/logout'); // Import controller functions

const router = express.Router();

// Define logout route
router.get('/logouts', logout);

module.exports = router;
