const express = require("express");
const router = express.Router();
const multer = require('multer');

const {saveEducationInfo, getEducationInfo} = require("../controller/educationinfo")
const upload = multer({ dest: "uploads/" });

router.post('/submitEducationalInfo', saveEducationInfo);


module.exports = router;
