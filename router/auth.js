const express = require("express");
const router = express.Router();
const { userLoginForMaidSearch } = require("../controller/authController");

router.post("/user-login", userLoginForMaidSearch);

module.exports = router;
