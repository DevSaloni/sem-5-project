const express = require('express');
const router = express.Router();
const {savePersonalInfo,getPersonalInfo} = require("../controller/personalinfo");

// Route to save personal information
router.post('/submitPersonalInfo', savePersonalInfo);



module.exports = router;
