const express = require("express");
const {handleUsersSignUp , handleUsersLogin} = require("../controller/user")
const router = express.Router();


router.post("/signup" , handleUsersSignUp);

router.post("/login" ,handleUsersLogin );

module.exports = router;

