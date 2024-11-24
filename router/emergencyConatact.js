const express = require("express");
const router = express.Router();

const {saveEmergencyContact ,getEmergencyContacts  } = require("../controller/emergencyContact")

router.post('/submitEmergencyContacts', saveEmergencyContact);


module.exports = router;
