const express = require("express");


const router = express.Router();

router.get("/signup" , (req,res) =>{
     return res.render("signup");
});

router.get("/login" , (req,res) =>{
   return res.render("login");
});

router.get('/personalInfo' , (req,res) =>{
   return res.render("personalinfo");
});

router.get('/educationalInfo' , (req,res) =>{
   return res.render("educationinfo");
});

router.get('/documentsInfo' , (req,res) =>{
   return res.render("documentinfo");
});

router.get('/emergencyContactInfo' , (req,res) =>{
   return res.render("contact");
});

router.get('/maid-search-form', (req,res) =>{
   res.render('maidSearch')
});

router.get("/user-login", (req, res) => {
   res.render("userLogin");
});

router.get("/apply", (req, res) => {
   res.render("application");
});

router.get('/maid-results', (req, res) => {
   const maids = JSON.parse(req.query.maids || '[]'); // Get the matched maids from the query parameter
   res.render('maidResult', { maids }); // Render your result page with the maids data
});


 
module.exports = router;
